export enum ReviewQuality {
  AGAIN = 0,
  HARD = 3,
  GOOD = 4,
  EASY = 5,
}

export interface Card {
  id: string
  front: string
  back: string
  notes?: string
  tags?: string[]
  createdAt: Date
  updatedAt: Date
  easeFactor: number
  interval: number
  dueDate: Date
  lapses: number
  lastReview?: Date
  nextReview?: Date
}

export interface Deck {
  id: string
  name: string
  description: string
  category?: string
  cards: Card[]
  createdAt: Date
  updatedAt: Date
  lastStudied?: Date
}

export interface CardReview {
  cardId: string
  quality: ReviewQuality
  timestamp: Date
}

export interface DeckFilters {
  search?: string
  category?: string
}

export interface DeckImport {
  deck: Omit<Deck, 'createdAt' | 'updatedAt'> & {
    createdAt: string
    updatedAt: string
    lastStudied?: string
    cards: Array<
      Omit<Card, 'createdAt' | 'updatedAt' | 'lastReview' | 'nextReview'> & {
        createdAt: string
        updatedAt: string
        lastReview?: string
        nextReview?: string
      }
    >
  }
}

export interface DeckFormData {
  name: string
  description: string
  category?: string
  tags: string[]
  language: {
    from: string
    to: string
  }
  cards: Array<Pick<Card, 'front' | 'back' | 'notes' | 'tags'>>
}

export interface DeckExport extends DeckImport {}
