import { Card, ReviewQuality } from '@/types/card'
import { addDays } from 'date-fns'

const INITIAL_EASE_FACTOR = 2.5
const MINIMUM_EASE_FACTOR = 1.3
const EASE_BONUS = 0.15
const EASE_PENALTY = 0.2

export function calculateNextReview(
  card: Card,
  quality: ReviewQuality
): Pick<Card, 'interval' | 'easeFactor' | 'dueDate'> {
  let { interval = 0, easeFactor = INITIAL_EASE_FACTOR } = card

  // Adjust ease factor based on answer quality
  if (quality < 3) {
    easeFactor = Math.max(MINIMUM_EASE_FACTOR, easeFactor - EASE_PENALTY)
    interval = 1 // Reset interval for failed cards
  } else {
    easeFactor = easeFactor + (EASE_BONUS * (quality - 3))
    
    // Calculate new interval
    if (interval === 0) {
      interval = 1
    } else if (interval === 1) {
      interval = 6
    } else {
      interval = Math.round(interval * easeFactor)
    }
  }

  // Calculate due date
  const dueDate = addDays(new Date(), interval)

  return {
    interval,
    easeFactor,
    dueDate
  }
}

export function isCardDue(card: Card): boolean {
  if (!card.dueDate) return true
  return new Date() >= card.dueDate
}

export function getDueCards(cards: Card[]): Card[] {
  return cards.filter(isCardDue)
}

export function calculateStudyProgress(
  totalCards: number,
  studiedCards: number
): number {
  return Math.round((studiedCards / totalCards) * 100)
}

// Função para ordenar cards por prioridade
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

// Função para atualizar estatísticas do card após uma revisão
export function updateCardStats(
  card: Card,
  quality: ReviewQuality
): Partial<Card> {
  const nextReview = calculateNextReview(card, quality)
  
  return {
    ...nextReview,
    lastReviewed: new Date(),
    reviewCount: (card.reviewCount || 0) + 1,
    lapses: quality < 3 ? (card.lapses || 0) + 1 : card.lapses
  }
}
