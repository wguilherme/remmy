import { Card } from './card.interface'

export interface Deck {
  id: string
  name: string
  description: string
  category?: string
  tags?: string[]      // Adicionando tags ao deck
  language?: {         // Adicionando suporte a idiomas
    from: string
    to: string
  }
  cards: Card[]
  createdAt: Date
  updatedAt: Date
  lastStudied?: Date
  // Estatísticas do deck
  stats?: {
    totalCards: number
    newCards: number
    cardsToReview: number
    masteredCards: number
  }
}

export interface DeckFilters {
  search?: string
  category?: string
  tags?: string[]
}

// Interface para criação/edição de deck
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

// Interfaces para importação/exportação
export interface DeckImport {
  version: string     // Versão do formato de importação
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

export type DeckExport = DeckImport
