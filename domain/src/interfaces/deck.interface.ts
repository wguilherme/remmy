import { Card } from './card.interface'

export interface Deck {
  id: string
  name: string
  description: string
  category?: string
  tags?: string[]
  language?: {
    from: string
    to: string
  }
  cards: Card[]
  stats: DeckStats
  createdAt: string
  updatedAt: string
  lastStudied?: string
}

export interface DeckStats {
  totalCards: number
  newCards: number
  cardsToReview: number
  masteredCards: number
}

export enum ReviewQuality {
  AGAIN = 0,
  HARD = 3,
  GOOD = 4,
  EASY = 5,
}

export type DeckExport = Omit<Deck, 'id' | 'createdAt' | 'updatedAt' | 'stats'>
