import { useCallback, useEffect, useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import type { MaterialContentDto, MaterialDetailPageVM, QuizResultDto } from '@/entities/material-detail'
import {
  computeArticleProgress,
  computeQuizProgress,
  computeVideoProgress,
  deriveStatus,
} from '@/entities/material-detail'
import { materialDetailKeys } from '@/entities/material-detail/model/query-keys'
import { useRecordMaterialView } from '@/entities/materials'
import { materialsKeys } from '@/entities/materials/model/query-keys'

type QuizAnswers = Record<string, string[]>

function scoreQuiz(content: Extract<MaterialContentDto, { kind: 'quiz' }>, answers: QuizAnswers): QuizResultDto {
  let correct = 0
  for (const q of content.questions) {
    const expected = new Set(q.correctOptionIds ?? [])
    const picked = new Set(answers[q.id] ?? [])
    if (expected.size === picked.size && [...expected].every((id) => picked.has(id))) {
      correct += 1
    }
  }
  const total = content.questions.length
  const scorePercent = total === 0 ? 0 : Math.round((correct / total) * 100)
  return {
    scorePercent,
    passed: scorePercent >= content.passingScorePercent,
    correctCount: correct,
    totalCount: total,
  }
}

export function useMaterialProgressController(vm: MaterialDetailPageVM) {
  const queryClient = useQueryClient()
  const recordView = useRecordMaterialView()

  const [viewedSections, setViewedSections] = useState<Set<string>>(() => new Set())
  const [watchedSec, setWatchedSec] = useState(0)
  const [practiceSubmitted, setPracticeSubmitted] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({})
  const [quizResult, setQuizResult] = useState<QuizResultDto | null>(null)
  const [forcedComplete, setForcedComplete] = useState(false)

  useEffect(() => {
    setViewedSections(new Set())
    setWatchedSec(0)
    setPracticeSubmitted(false)
    setQuizAnswers({})
    setQuizResult(null)
    setForcedComplete(false)
  }, [vm.meta.id])

  const progressPercent = useMemo(() => {
    if (forcedComplete) return 100
    const base = vm.progress.progressPercent
    const content = vm.content

    let session = base
    if (content.kind === 'article') {
      session = Math.max(base, computeArticleProgress(viewedSections, content.sections.length))
    } else if (content.kind === 'video') {
      session = Math.max(base, computeVideoProgress(watchedSec, content.durationSec))
    } else if (content.kind === 'practice') {
      session = practiceSubmitted ? 100 : base
    } else if (content.kind === 'quiz') {
      const answered = Object.keys(quizAnswers).length
      session = Math.max(
        base,
        quizResult?.scorePercent ?? computeQuizProgress(answered, content.questions.length),
      )
      if (quizResult?.passed) session = 100
    }
    return Math.min(100, session)
  }, [
    forcedComplete,
    vm.progress.progressPercent,
    vm.content,
    viewedSections,
    watchedSec,
    practiceSubmitted,
    quizAnswers,
    quizResult,
  ])

  const status = deriveStatus(progressPercent)

  const patchCaches = useCallback(
    (percent: number) => {
      const nextStatus = deriveStatus(percent)
      queryClient.setQueryData<MaterialDetailPageVM>(
        materialDetailKeys.page(vm.meta.blockId, vm.meta.id),
        (old) =>
          old
            ? {
                ...old,
                progress: {
                  ...old.progress,
                  progressPercent: percent,
                  status: nextStatus,
                  lastOpenedAt: new Date().toISOString(),
                },
              }
            : old,
      )
      queryClient.setQueryData(materialsKeys.blockList(vm.meta.blockId), (old) => {
        if (!old || typeof old !== 'object' || !('items' in old)) return old
        const page = old as { items: { id: string; progressPercent: number; uiStatus: string }[] }
        return {
          ...page,
          items: page.items.map((item) =>
            item.id === vm.meta.id
              ? { ...item, progressPercent: percent, uiStatus: nextStatus }
              : item,
          ),
        }
      })
    },
    [queryClient, vm.meta.blockId, vm.meta.id],
  )

  useEffect(() => {
    if (progressPercent !== vm.progress.progressPercent) {
      patchCaches(progressPercent)
    }
  }, [progressPercent, patchCaches, vm.progress.progressPercent])

  const toggleSection = useCallback((sectionId: string) => {
    setViewedSections((prev) => {
      const next = new Set(prev)
      if (next.has(sectionId)) next.delete(sectionId)
      else next.add(sectionId)
      return next
    })
  }, [])

  const setVideoProgress = useCallback((sec: number) => {
    setWatchedSec(sec)
  }, [])

  const submitPractice = useCallback((_link: string) => {
    setPracticeSubmitted(true)
  }, [])

  const setQuizAnswer = useCallback((questionId: string, optionIds: string[]) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIds }))
  }, [])

  const submitQuiz = useCallback(() => {
    if (vm.content.kind !== 'quiz') return null
    const result = scoreQuiz(vm.content, quizAnswers)
    setQuizResult(result)
    return result
  }, [vm.content, quizAnswers])

  const markComplete = useCallback(() => {
    setForcedComplete(true)
    patchCaches(100)
    if (vm.progress.progressPercent < 100) {
      recordView.mutate(vm.meta.id)
    }
  }, [patchCaches, recordView, vm.meta.id, vm.progress.progressPercent])

  return {
    progressPercent,
    status,
    viewedSections,
    toggleSection,
    watchedSec,
    setVideoProgress,
    practiceSubmitted,
    submitPractice,
    quizAnswers,
    setQuizAnswer,
    quizResult,
    submitQuiz,
    markComplete,
    isCompleting: recordView.isPending,
  }
}
