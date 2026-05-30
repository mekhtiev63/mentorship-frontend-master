import { Breadcrumbs, Box, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import type { MaterialDetailPageVM } from '@/entities/material-detail'
import { useMaterialProgressController } from '@/features/material-progress'
import { ru } from '@/shared/i18n/ru'
import { MaterialContentRenderer } from '@/widgets/material-content/ui/MaterialContentRenderer'
import { MaterialDetailHero } from '@/widgets/material-content/ui/MaterialDetailHero'
import { MaterialDetailPager } from '@/widgets/material-content/ui/MaterialDetailPager'

type MaterialDetailScreenProps = {
  vm: MaterialDetailPageVM
}

export function MaterialDetailScreen({ vm }: MaterialDetailScreenProps) {
  const progress = useMaterialProgressController(vm)
  const listPath = `/student/roadmap/blocks/${vm.meta.blockId}/materials`

  return (
    <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Breadcrumbs sx={{ mb: 2, color: 'text.secondary' }}>
        <Typography component={RouterLink} to="/student/roadmap" variant="body2" sx={{ color: 'inherit' }}>
          {ru.materials.breadcrumbRoadmap}
        </Typography>
        <Typography
          component={RouterLink}
          to={`/student/roadmap/blocks/${vm.meta.blockId}`}
          variant="body2"
          sx={{ color: 'inherit' }}
        >
          {vm.blockTitle}
        </Typography>
        <Typography component={RouterLink} to={listPath} variant="body2" sx={{ color: 'inherit' }}>
          {ru.materials.breadcrumbMaterials}
        </Typography>
        <Typography variant="body2">{vm.meta.title}</Typography>
      </Breadcrumbs>

      <Stack spacing={3}>
        <MaterialDetailHero vm={vm} progressPercent={progress.progressPercent} status={progress.status} />

        <MaterialContentRenderer
          vm={vm}
          viewedSections={progress.viewedSections}
          onToggleSection={progress.toggleSection}
          watchedSec={progress.watchedSec}
          onVideoProgress={progress.setVideoProgress}
          practiceSubmitted={progress.practiceSubmitted}
          onPracticeSubmit={progress.submitPractice}
          quizAnswers={progress.quizAnswers}
          onQuizAnswer={progress.setQuizAnswer}
          quizResult={progress.quizResult}
          onQuizSubmit={() => progress.submitQuiz()}
        />

        <MaterialDetailPager
          blockId={vm.meta.blockId}
          prevId={vm.neighbors.prevId}
          nextId={vm.neighbors.nextId}
          onMarkComplete={progress.markComplete}
          completeDisabled={progress.isCompleting}
          isComplete={progress.status === 'completed'}
        />
      </Stack>
    </Box>
  )
}
