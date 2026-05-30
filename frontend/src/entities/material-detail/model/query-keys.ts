export const materialDetailKeys = {
  all: ['material-detail'] as const,
  page: (blockId: string, materialId: string) =>
    [...materialDetailKeys.all, blockId, materialId] as const,
}
