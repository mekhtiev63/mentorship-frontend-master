import type { MaterialContentDto, QuizQuestionDto } from '@/entities/material-detail/model/types'
import type { UiMaterialType } from '@/entities/materials'

const QUIZ_QUESTIONS: QuizQuestionDto[] = [
  {
    id: 'q1',
    prompt: 'Что такое goroutine в Go?',
    options: [
      { id: 'a', label: 'Лёгкий поток выполнения' },
      { id: 'b', label: 'Тип данных для JSON' },
      { id: 'c', label: 'Пакет стандартной библиотеки для HTTP' },
    ],
    correctOptionIds: ['a'],
  },
  {
    id: 'q2',
    prompt: 'Какие примитивы используют для синхронизации? (несколько ответов)',
    options: [
      { id: 'a', label: 'sync.Mutex' },
      { id: 'b', label: 'channel' },
      { id: 'c', label: 'fmt.Println' },
    ],
    multiSelect: true,
    correctOptionIds: ['a', 'b'],
  },
]

export function buildMockMaterialContent(
  uiType: UiMaterialType,
  title: string,
  url: string,
): MaterialContentDto {
  switch (uiType) {
    case 'video':
      return {
        kind: 'video',
        summary: `Видеоурок «${title}»: разбор на примерах и типовые ошибки.`,
        estimatedMinutes: 25,
        playbackUrl: url || 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        durationSec: 120,
        chapters: [
          { id: 'c1', title: 'Введение', startSec: 0 },
          { id: 'c2', title: 'Демо', startSec: 40 },
          { id: 'c3', title: 'Итоги', startSec: 90 },
        ],
      }
    case 'practice':
      return {
        kind: 'practice',
        taskMarkdown: `## Задача\n\nРеализуйте HTTP-handler с graceful shutdown и health-check.\n\n## Подсказка\n\nИспользуйте \`context.Context\` и \`http.Server\`.`,
        acceptanceCriteria: [
          'Эндпоинт GET /health возвращает 200',
          'Сервер корректно завершается по SIGINT',
          'Есть README с инструкцией запуска',
        ],
        submitHint: 'Укажите ссылку на репозиторий или gist с решением.',
      }
    case 'quiz':
      return {
        kind: 'quiz',
        passingScorePercent: 70,
        questions: QUIZ_QUESTIONS,
      }
    case 'article':
    default:
      return {
        kind: 'article',
        summary: `Статья «${title}» — ключевые идеи и чек-лист для самопроверки.`,
        estimatedMinutes: 15,
        sections: [
          {
            id: 's1',
            title: 'Контекст',
            sortOrder: 1,
            bodyMarkdown:
              'Материал программы менторства. Прочитайте внимательно и отметьте раздел просмотренным.',
          },
          {
            id: 's2',
            title: 'Основные понятия',
            sortOrder: 2,
            bodyMarkdown:
              'Go использует goroutines и channels для конкурентности. Планируйте границы ответственности пакетов заранее.',
          },
          {
            id: 's3',
            title: 'Практические советы',
            sortOrder: 3,
            bodyMarkdown:
              'Пишите тесты параллельно с кодом. Используйте table-driven tests для табличных сценариев.',
          },
        ],
      }
  }
}
