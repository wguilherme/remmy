export interface Card {
  id: string
  front: string
  back: string
  lastReviewed?: Date
  interval?: number // in days
  easeFactor?: number
  dueDate?: Date
  reviewCount?: number
  lapses?: number
}

export interface Deck {
  id: string
  name: string
  description: string
  cards: Card[]
  createdAt: Date
  updatedAt: Date
}

export type ReviewQuality = 0 | 1 | 2 | 3 | 4 | 5 // 0 = again, 5 = perfect

export interface StudySession {
  deckId: string
  startTime: Date
  cardsStudied: number
  correctAnswers: number
  streak: number
}
