import { Alert, Box, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { useBlockMaterials } from '@/entities/materials'
import { useMaterialsListControls } from '@/features/materials'
import { LoadErrorState } from '@/shared/ui/LoadErrorState'
import { ru } from '@/shared/i18n/ru'
import { MaterialCard } from '@/widgets/materials-list/ui/MaterialCard'
import { MaterialsEmptyState } from '@/widgets/materials-list/ui/MaterialsEmptyState'
import { MaterialsFiltersBar } from '@/widgets/materials-list/ui/MaterialsFiltersBar'
import { MaterialsListSkeleton } from '@/widgets/materials-list/ui/MaterialsListSkeleton'

type MaterialsListViewProps = {
  blockId: string
}

const listContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

export function MaterialsListView({ blockId }: MaterialsListViewProps) {
  const { data, isLoading, isError, refetch } = useBlockMaterials(blockId)
  const controls = useMaterialsListControls(data?.items ?? [])

  if (isLoading) {
    return <MaterialsListSkeleton />
  }

  if (isError || !data) {
    return <LoadErrorState onRetry={() => void refetch()} />
  }

  if (data.items.length === 0) {
    return <MaterialsEmptyState />
  }

  const hasActiveFilters =
    controls.controls.query.trim() !== '' ||
    controls.controls.status !== 'all' ||
    controls.controls.type !== 'all'

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
        {ru.materials.listTitle}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        {data.blockTitle}
      </Typography>

      {data.progressPartialError ? (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {ru.materials.progressPartialWarning}
        </Alert>
      ) : null}

      <MaterialsFiltersBar
        query={controls.controls.query}
        status={controls.controls.status}
        type={controls.controls.type}
        sort={controls.controls.sort}
        onQueryChange={controls.setQuery}
        onStatusChange={controls.setStatus}
        onTypeChange={controls.setType}
        onSortChange={controls.setSort}
      />

      {controls.filtered.length === 0 ? (
        <MaterialsEmptyState filtered onReset={controls.resetFilters} />
      ) : (
        <Stack component={motion.div} variants={listContainer} initial="hidden" animate="show" spacing={2}>
          {controls.filtered.map((material, index) => (
            <MaterialCard key={material.id} material={material} index={index} />
          ))}
        </Stack>
      )}

      {hasActiveFilters && controls.filtered.length > 0 ? (
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
          {controls.filtered.length} / {data.items.length}
        </Typography>
      ) : null}
    </Box>
  )
}
