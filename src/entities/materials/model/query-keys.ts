export const materialsKeys = {
  all: ['materials'] as const,
  blockList: (blockId: string) => [...materialsKeys.all, 'block', blockId, 'list'] as const,
  blockDetail: (blockId: string, materialId: string) =>
    [...materialsKeys.all, 'block', blockId, 'detail', materialId] as const,
}
