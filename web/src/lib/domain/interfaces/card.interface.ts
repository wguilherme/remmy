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
  // Anki algorithm related fields
  easeFactor: number // Multiplicador de dificuldade do card
  interval: number   // Intervalo em dias até a próxima revisão
  dueDate: Date     // Data em que o card deve ser revisado
  lapses: number    // Número de vezes que o usuário esqueceu o card
  lastReview?: Date // Última vez que o card foi revisado
  nextReview?: Date // Próxima data de revisão programada
}

export interface CardReview {
  cardId: string
  quality: ReviewQuality
  timestamp: Date
}
