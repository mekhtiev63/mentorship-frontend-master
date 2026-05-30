/** Fallback when API returns no expectedSkills — remove when all blocks are seeded. */
const BY_ORDER: string[][] = [
  ['Go', 'Синтаксис', 'Тесты'],
  ['Типы', 'Структуры', 'Интерфейсы'],
  ['Горутины', 'Каналы', 'sync'],
  ['HTTP', 'REST', 'net/http'],
  ['Docker', 'Compose', 'CI'],
  ['Паттерны', 'DDD', 'Микросервисы'],
  ['Масштабирование', 'Наблюдаемость'],
  ['Архитектура', 'Trade-offs'],
]

export function fallbackSkillsForBlock(sortOrder: number, blockId: string): string[] {
  const idx = Math.max(0, sortOrder - 1)
  if (idx < BY_ORDER.length) {
    return BY_ORDER[idx]
  }
  return [`Навык ${blockId.slice(0, 6)}`]
}
