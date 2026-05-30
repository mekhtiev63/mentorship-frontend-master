import type { OneOnOneFilterGroup } from '@/entities/student-one-on-one/model/types'

export const oneOnOneKeys = {
  all: ['student-one-on-one'] as const,
  list: (group: OneOnOneFilterGroup, search: string) =>
    [...oneOnOneKeys.all, 'list', group, search] as const,
  detail: (requestId: string) => [...oneOnOneKeys.all, 'detail', requestId] as const,
}
