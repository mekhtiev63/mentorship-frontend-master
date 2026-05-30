export { useMaterialDetailPage } from '@/entities/material-detail/model/useMaterialDetailPage'
export type {
  MaterialDetailPageVM,
  MaterialContentDto,
  MaterialProgressDto,
  QuizResultDto,
} from '@/entities/material-detail/model/types'
export {
  computeArticleProgress,
  computeVideoProgress,
  computeQuizProgress,
  deriveStatus,
} from '@/entities/material-detail/model/compute-progress'
