import { useQuery } from '@tanstack/react-query'
import { fetchMaterialDetailPage } from '@/entities/material-detail/model/fetch-material-detail-page'
import { materialDetailKeys } from '@/entities/material-detail/model/query-keys'
import { useSessionStore } from '@/entities/session'

export function useMaterialDetailPage(blockId: string, materialId: string) {
  const userId = useSessionStore((s) => s.user?.id)

  return useQuery({
    queryKey: materialDetailKeys.page(blockId, materialId),
    queryFn: () => fetchMaterialDetailPage(blockId, materialId),
    enabled: Boolean(userId) && Boolean(blockId) && Boolean(materialId),
    staleTime: 30_000,
  })
}
