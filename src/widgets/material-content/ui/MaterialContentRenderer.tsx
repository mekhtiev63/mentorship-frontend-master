import type { MaterialContentDto, MaterialDetailPageVM, QuizResultDto } from '@/entities/material-detail'
import { ArticleContentPanel } from '@/widgets/material-content/ui/ArticleContentPanel'
import { PracticeContentPanel } from '@/widgets/material-content/ui/PracticeContentPanel'
import { QuizContentPanel } from '@/widgets/material-content/ui/QuizContentPanel'
import { VideoContentPanel } from '@/widgets/material-content/ui/VideoContentPanel'

type MaterialContentRendererProps = {
  vm: MaterialDetailPageVM
  viewedSections: Set<string>
  onToggleSection: (id: string) => void
  watchedSec: number
  onVideoProgress: (sec: number) => void
  practiceSubmitted: boolean
  onPracticeSubmit: (link: string) => void
  quizAnswers: Record<string, string[]>
  onQuizAnswer: (questionId: string, optionIds: string[]) => void
  quizResult: QuizResultDto | null
  onQuizSubmit: () => void
}

export function MaterialContentRenderer({
  vm,
  viewedSections,
  onToggleSection,
  watchedSec,
  onVideoProgress,
  practiceSubmitted,
  onPracticeSubmit,
  quizAnswers,
  onQuizAnswer,
  quizResult,
  onQuizSubmit,
}: MaterialContentRendererProps) {
  const content: MaterialContentDto = vm.content

  switch (content.kind) {
    case 'article':
      return (
        <ArticleContentPanel
          content={content}
          viewedSections={viewedSections}
          onToggleSection={onToggleSection}
        />
      )
    case 'video':
      return (
        <VideoContentPanel content={content} watchedSec={watchedSec} onProgress={onVideoProgress} />
      )
    case 'practice':
      return (
        <PracticeContentPanel
          content={content}
          submitted={practiceSubmitted}
          onSubmit={onPracticeSubmit}
        />
      )
    case 'quiz':
      return (
        <QuizContentPanel
          content={content}
          answers={quizAnswers}
          onAnswer={onQuizAnswer}
          result={quizResult}
          onSubmit={onQuizSubmit}
        />
      )
    default:
      return null
  }
}
