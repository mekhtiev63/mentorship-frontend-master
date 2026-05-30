import type { InterviewFormat } from '@/entities/student-interviews/model/types'
import { ru } from '@/shared/i18n/ru'

export function formatLabel(format: InterviewFormat): string {
  return ru.interviewsPage.format[format]
}

export function formatAccentColor(format: InterviewFormat): string {
  switch (format) {
    case 'go':
      return '#22C55E'
    case 'system_design':
      return '#8B5CF6'
    case 'behavioral':
      return '#F59E0B'
    case 'hr':
      return '#EC4899'
    default:
      return '#3B82F6'
  }
}

export function guessFormatFromText(text: string): InterviewFormat {
  const t = text.toLowerCase()
  if (t.includes('system design') || t.includes('архитект')) return 'system_design'
  if (t.includes('go ') || t.includes('golang')) return 'go'
  if (t.includes('hr') || t.includes('рекрут')) return 'hr'
  if (t.includes('поведен') || t.includes('behavioral')) return 'behavioral'
  return 'technical'
}
