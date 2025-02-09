import { Card, ReviewQuality } from "@/types/card"
import { addDays } from "date-fns"

// Constantes do algoritmo Anki
const MINIMUM_EASE_FACTOR = 1.3
const EASE_BONUS = 0.15
const MINIMUM_INTERVAL = 1
const INITIAL_EASE_FACTOR = 2.5
const INITIAL_INTERVAL = 1

// Calcula o próximo intervalo baseado na qualidade da revisão
export function calculateNextInterval(card: Card, quality: ReviewQuality): number {
  let interval = card.interval
  
  switch (quality) {
    case ReviewQuality.AGAIN:
      interval = MINIMUM_INTERVAL
      break
    case ReviewQuality.HARD:
      interval = Math.max(MINIMUM_INTERVAL, interval * 1.2)
      break
    case ReviewQuality.GOOD:
      interval = interval === 0 ? INITIAL_INTERVAL : interval * card.easeFactor
      break
    case ReviewQuality.EASY:
      interval = interval === 0 
        ? INITIAL_INTERVAL * 2 
        : interval * card.easeFactor * (1 + EASE_BONUS)
      break
  }

  return Math.round(interval)
}

// Calcula o novo fator de facilidade baseado na qualidade da revisão
export function calculateNewEaseFactor(card: Card, quality: ReviewQuality): number {
  let easeFactor = card.easeFactor

  switch (quality) {
    case ReviewQuality.AGAIN:
      easeFactor = Math.max(MINIMUM_EASE_FACTOR, easeFactor - 0.2)
      break
    case ReviewQuality.HARD:
      easeFactor = Math.max(MINIMUM_EASE_FACTOR, easeFactor - 0.15)
      break
    case ReviewQuality.GOOD:
      // Mantém o mesmo fator de facilidade
      break
    case ReviewQuality.EASY:
      easeFactor = easeFactor + 0.15
      break
  }

  return easeFactor
}

// Calcula a próxima data de revisão
export function calculateNextReviewDate(interval: number): Date {
  const now = new Date()
  return addDays(now, interval)
}

// Processa uma revisão de cartão
export function processReview(card: Card, quality: ReviewQuality): Partial<Card> {
  const newInterval = calculateNextInterval(card, quality)
  const newEaseFactor = calculateNewEaseFactor(card, quality)
  const nextReview = calculateNextReviewDate(newInterval)

  return {
    interval: newInterval,
    easeFactor: newEaseFactor,
    lastReview: new Date(),
    nextReview,
    lapses: quality === ReviewQuality.AGAIN ? card.lapses + 1 : card.lapses,
    dueDate: nextReview,
  }
}

// Inicializa um novo cartão com valores padrão
export function initializeCard(card: Partial<Card>): Card {
  return {
    ...card,
    id: card.id || crypto.randomUUID(),
    easeFactor: INITIAL_EASE_FACTOR,
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
    lapses: quality === ReviewQuality.AGAIN ? (card.lapses || 0) + 1 : card.lapses
  }
}
