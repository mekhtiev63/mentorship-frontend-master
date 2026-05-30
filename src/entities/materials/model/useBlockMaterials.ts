import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { recordMaterialViewApi } from '@/entities/materials/api/material-progress.api'
import { fetchBlockMaterials, fetchMaterialDetail } from '@/entities/materials/model/fetch-block-materials'
import { materialsKeys } from '@/entities/materials/model/query-keys'
import { progressKeys, roadmapKeys } from '@/entities/roadmap/model/query-keys'
import { studentProgressKeys } from '@/entities/student-progress'
import { useSessionStore } from '@/entities/session'

export function useBlockMaterials(blockId: string) {
  const userId = useSessionStore((s) => s.user?.id)

  return useQuery({
    queryKey: materialsKeys.blockList(blockId),
    queryFn: () => fetchBlockMaterials(blockId),
    enabled: Boolean(userId) && Boolean(blockId),
    staleTime: 60_000,
  })
}

export function useMaterialDetail(blockId: string, materialId: string) {
  const userId = useSessionStore((s) => s.user?.id)

  return useQuery({
    queryKey: materialsKeys.blockDetail(blockId, materialId),
    queryFn: () => fetchMaterialDetail(blockId, materialId),
    enabled: Boolean(userId) && Boolean(blockId) && Boolean(materialId),
    staleTime: 60_000,
  })
}

export function useRecordMaterialView() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (materialId: string) => recordMaterialViewApi(materialId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: materialsKeys.all })
      void queryClient.invalidateQueries({ queryKey: progressKeys.all })
      void queryClient.invalidateQueries({ queryKey: roadmapKeys.all })
      void queryClient.invalidateQueries({ queryKey: studentProgressKeys.all })
    },
  })
}
