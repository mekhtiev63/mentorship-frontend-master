import { Box, useMediaQuery, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import type { RoadmapBlockVM } from '@/entities/roadmap'
import { findActiveBlockId } from '@/entities/roadmap'
import { useReducedMotion } from '@/shared/hooks/useReducedMotion'
import { RoadmapBlockNode } from '@/widgets/student-roadmap/ui/RoadmapBlockNode'
import { RoadmapSpineConnector } from '@/widgets/student-roadmap/ui/RoadmapSpineConnector'

type RoadmapSkillTreeProps = {
  blocks: RoadmapBlockVM[]
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

export function RoadmapSkillTree({ blocks }: RoadmapSkillTreeProps) {
  const theme = useTheme()
  const zigzag = useMediaQuery(theme.breakpoints.up('lg'))
  const reduced = useReducedMotion()
  const activeRef = useRef<HTMLDivElement | null>(null)
  const activeId = findActiveBlockId(blocks)

  useEffect(() => {
    if (!activeId || reduced) return
    activeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [activeId, reduced])

  return (
    <Box component={motion.div} variants={container} initial="hidden" animate="show">
      {blocks.map((block, index) => {
        const isLast = index === blocks.length - 1
        const segmentFilled = block.uiStatus === 'completed'
        const side = index % 2 === 0 ? 'left' : 'right'

        return (
          <Box
            key={block.id}
            ref={block.id === activeId ? activeRef : undefined}
            sx={{ mb: isLast ? 0 : { xs: 0, lg: 1 } }}
          >
            {zigzag ? (
              <RoadmapBlockNode block={block} index={index} side={side as 'left' | 'right'} />
            ) : (
              <RoadmapBlockNode block={block} index={index} side="full" />
            )}
            {!isLast ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: { xs: 0.5, lg: 0 }, pl: { xs: 5.5, lg: 0 } }}>
                <Box sx={{ width: 4, minHeight: 28 }}>
                  <RoadmapSpineConnector filled={segmentFilled} delay={index * 0.05} />
                </Box>
              </Box>
            ) : null}
          </Box>
        )
      })}
    </Box>
  )
}
