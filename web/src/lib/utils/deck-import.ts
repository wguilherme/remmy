/* eslint-disable @typescript-eslint/no-unused-vars */
import { Deck } from '@remmy/domain'
import { z } from 'zod'

const cardSchema = z.object({
  front: z.string(),
  back: z.string(),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

const deckSchema = z.object({
  name: z.string(),
  description: z.string(),
  tags: z.array(z.string()).optional(),
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
    tags: data.tags || [],
    cards: data.cards.map((card) => ({
      id: crypto.randomUUID(),
      front: card.front,
      back: card.back,
      notes: card.notes,
      tags: card.tags || [],
      createdAt: now,
      updatedAt: now,
      dueDate: tomorrow,
      lastReview: undefined,
      nextReview: undefined,
      easeFactor: 2.5,
      interval: 0,
      lapses: 0,
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
      front: card.front,
      back: card.back,
      notes: card.notes,
      tags: card.tags,
    })),
  }
}
