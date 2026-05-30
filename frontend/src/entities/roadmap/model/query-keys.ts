export const roadmapKeys = {
  all: ['roadmap'] as const,
  studentPage: () => [...roadmapKeys.all, 'student', 'page'] as const,
  studentBlock: (blockId: string) => [...roadmapKeys.all, 'student', 'block', blockId] as const,
}

export const progressKeys = {
  all: ['progress'] as const,
  blocks: () => [...progressKeys.all, 'blocks'] as const,
  block: (blockId: string) => [...progressKeys.all, 'blocks', blockId] as const,
}
