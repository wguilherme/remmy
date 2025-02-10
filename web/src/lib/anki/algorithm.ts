import { Card, ReviewQuality } from '@remmy/domain'

// Constantes do algoritmo Anki
const MIN_EASE_FACTOR = 1.3
const EASE_BONUS = 1.3
const INTERVAL_MODIFIER = 1.0

// Calcula o próximo intervalo baseado na qualidade da revisão
function calculateNextReview(card: Card, quality: ReviewQuality) {
  let { interval, easeFactor, lapses } = card

  // If the card was failed
  if (quality === ReviewQuality.AGAIN) {
    interval = 1
    easeFactor = Math.max(MIN_EASE_FACTOR, easeFactor - 0.2)
    lapses += 1
  }
  // If the card was remembered
  else {
    if (interval === 0) {
      interval = 1
    } else if (interval === 1) {
      interval = 6
    } else {
      interval = Math.round(interval * easeFactor * INTERVAL_MODIFIER)
    }

    // Adjust ease factor
    if (quality === ReviewQuality.HARD) {
      easeFactor = Math.max(MIN_EASE_FACTOR, easeFactor - 0.15)
    } else if (quality === ReviewQuality.GOOD) {
      // Keep the same ease factor
    } else if (quality === ReviewQuality.EASY) {
      easeFactor = easeFactor + 0.15
    }
  }

  // Calculate next review date
  const date = new Date()
  date.setDate(date.getDate() + interval)

  return {
    interval,
    easeFactor,
    lapses,
    date,
  }
}

// Processa uma revisão de cartão
export function processReview(card: Card, quality: ReviewQuality) {
  const now = new Date()
  const nextReview = calculateNextReview(card, quality)

  return {
    interval: nextReview.interval,
    easeFactor: nextReview.easeFactor,
    lapses: nextReview.lapses,
    nextReview: nextReview.date.toISOString(),
    lastReview: now,
    dueDate: nextReview.date,
  }
}

// Inicializa um novo cartão com valores padrão
export function initializeCard(card: Partial<Card>): Card {
  return {
    ...card,
    id: card.id || crypto.randomUUID(),
    easeFactor: 2.5,
    interval: 0,
    lapses: 0,
    dueDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Card
}

// Verifica se um cartão está em atraso
export function isCardDue(card: Card): boolean {
  const now = new Date()
  return card.dueDate <= now
}

// Retorna os cartões em atraso
export function getDueCards(cards: Card[]): Card[] {
  return cards.filter(isCardDue)
}

// Calcula o progresso de estudo
export function calculateStudyProgress(
  totalCards: number,
  studiedCards: number
): number {
  return Math.round((studiedCards / totalCards) * 100)
}

// Ordena os cartões por prioridade
export function sortCardsByPriority(cards: Card[]): Card[] {
  return [...cards].sort((a, b) => {
    // Cards sem dueDate vêm primeiro
    if (!a.dueDate && !b.dueDate) return 0
    if (!a.dueDate) return -1
    if (!b.dueDate) return 1

    // Depois ordena por data de vencimento
    return a.dueDate.getTime() - b.dueDate.getTime()
  })
}

// Atualiza as estatísticas do cartão após uma revisão
export function updateCardStats(
  card: Card,
  quality: ReviewQuality
): Partial<Card> {
  const nextReview = processReview(card, quality)
  
  return {
    ...nextReview,
    lastReviewed: new Date(),
    reviewCount: (card.reviewCount || 0) + 1,
  }
}
