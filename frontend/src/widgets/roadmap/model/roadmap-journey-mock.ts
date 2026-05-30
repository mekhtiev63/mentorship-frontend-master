import { ru } from '@/shared/i18n/ru'

export type RoadmapJourneyStep = {
  id: string
  title: string
  status: 'completed' | 'active' | 'locked'
}

const s = ru.roadmap.steps

export const roadmapJourneySteps: RoadmapJourneyStep[] = [
  { id: '1', title: s.goBasics, status: 'completed' },
  { id: '2', title: s.typesStructs, status: 'completed' },
  { id: '3', title: s.concurrency, status: 'active' },
  { id: '4', title: s.networking, status: 'locked' },
  { id: '5', title: s.microservices, status: 'locked' },
  { id: '6', title: s.systemDesign, status: 'locked' },
  { id: '7', title: s.architecture, status: 'locked' },
]
