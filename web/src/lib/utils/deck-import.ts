/* eslint-disable @typescript-eslint/no-unused-vars */
import { Deck } from '@remmy/domain'
import { z } from 'zod'

const cardSchema = z.object({
  id: z.string().optional(),
  front: z.string(),
  back: z.string(),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  dueDate: z.string().optional(),
  lastReview: z.string().optional(),
  nextReview: z.string().optional(),
  easeFactor: z.number().optional(),
  interval: z.number().optional(),
  lapses: z.number().optional(),
})

const deckSchema = z.object({
  name: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  cards: z.array(cardSchema),
})

export type DeckImport = z.infer<typeof deckSchema>

export function validateDeckImport(data: unknown): data is DeckImport {
  try {
    deckSchema.parse(data)
    return true
  } catch (error) {
    return false
  }
}

export function parseDeckImport(data: DeckImport): Omit<Deck, 'id'> {
  const now = new Date()
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)

  return {
    name: data.name,
    description: data.description,
    tags: data.tags,
    cards: data.cards.map((card) => ({
      id: card.id || crypto.randomUUID(),
      front: card.front,
      back: card.back,
      notes: card.notes,
      tags: card.tags || [],
      createdAt: card.createdAt || now.toISOString(),
      updatedAt: card.updatedAt || now.toISOString(),
      dueDate: card.dueDate || tomorrow.toISOString(),
      lastReview: card.lastReview,
      nextReview: card.nextReview,
      easeFactor: card.easeFactor || 2.5,
      interval: card.interval || 0,
      lapses: card.lapses || 0,
    })),
    stats: {
      totalCards: data.cards.length,
      newCards: data.cards.length,
      cardsToReview: 0,
      masteredCards: 0,
    },
    createdAt: now,
    updatedAt: now,
  }
}

export function prepareDeckExport(deck: Deck): DeckImport {
  return {
    name: deck.name,
    description: deck.description,
    tags: deck.tags,
    cards: deck.cards.map((card) => ({
      id: card.id,
      front: card.front,
      back: card.back,
      notes: card.notes,
      tags: card.tags,
      createdAt: card.createdAt.toISOString(),
      updatedAt: card.updatedAt.toISOString(),
      dueDate: card.dueDate.toISOString(),
      lastReview: card.lastReview,
      nextReview: card.nextReview,
      easeFactor: card.easeFactor,
      interval: card.interval,
      lapses: card.lapses,
    })),
  }
}
