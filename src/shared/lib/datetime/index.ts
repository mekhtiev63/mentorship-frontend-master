import {
  addDays,
  endOfDay,
  endOfMonth,
  endOfWeek,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns'
import type { CalendarViewMode } from '@/entities/student-calendar/model/types'

export function computeRangeForView(
  anchorDate: string,
  view: CalendarViewMode,
): { from: string; to: string } {
  const anchor = new Date(anchorDate)
  if (view === 'day') {
    return {
      from: startOfDay(anchor).toISOString(),
      to: endOfDay(anchor).toISOString(),
    }
  }
  if (view === 'week') {
    const start = startOfWeek(anchor, { weekStartsOn: 1 })
    const end = endOfWeek(anchor, { weekStartsOn: 1 })
    return { from: start.toISOString(), to: end.toISOString() }
  }
  const start = startOfMonth(anchor)
  const end = endOfMonth(anchor)
  return { from: start.toISOString(), to: end.toISOString() }
}

export function formatRuDateTime(iso: string): string {
  return new Date(iso).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatRuTimeRange(startIso: string, endIso: string): string {
  const start = new Date(startIso)
  const end = new Date(endIso)
  const date = start.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
  const t1 = start.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
  const t2 = end.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
  return `${date}, ${t1} – ${t2}`
}

export { addDays, startOfDay, endOfDay }
