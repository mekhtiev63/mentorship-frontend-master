import ArticleIcon from '@mui/icons-material/Article'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo'
import QuizIcon from '@mui/icons-material/Quiz'
import SchoolIcon from '@mui/icons-material/School'
import type { SvgIconProps } from '@mui/material'
import type { UiMaterialType } from '@/entities/materials'

const ICONS = {
  article: ArticleIcon,
  video: OndemandVideoIcon,
  practice: SchoolIcon,
  quiz: QuizIcon,
} as const

export function MaterialTypeIcon({ uiType, ...props }: SvgIconProps & { uiType: UiMaterialType }) {
  const Icon = ICONS[uiType] ?? ArticleIcon
  return <Icon {...props} />
}
