import { Schema, model } from 'mongoose'
import { CardSchema, ICard } from './card.model'

export interface IDeck {
  id: string
  name: string
  description: string
  category?: string
  tags?: string[]
  language?: {
    from: string
    to: string
  }
  cards: ICard[]
  stats: {
    totalCards: number
    newCards: number
    cardsToReview: number
    masteredCards: number
  }
  createdAt: Date
  updatedAt: Date
  lastStudied?: Date
}

const DeckSchema = new Schema<IDeck>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: String,
    tags: [String],
    language: {
      from: String,
      to: String,
    },
    cards: [CardSchema],
    stats: {
      totalCards: { type: Number, default: 0 },
      newCards: { type: Number, default: 0 },
      cardsToReview: { type: Number, default: 0 },
      masteredCards: { type: Number, default: 0 },
    },
    lastStudied: Date,
  },
  {
    timestamps: true,
  }
)

// Índices
DeckSchema.index({ name: 'text', description: 'text' })
DeckSchema.index({ category: 1 })
DeckSchema.index({ tags: 1 })
DeckSchema.index({ 'cards.dueDate': 1 })

// Hooks
DeckSchema.pre('save', function(next) {
  // Atualiza estatísticas antes de salvar
  const now = new Date()
  this.stats.totalCards = this.cards.length
  this.stats.newCards = this.cards.filter(card => !card.lastReview).length
  this.stats.cardsToReview = this.cards.filter(card => 
    card.dueDate <= now && card.lastReview
  ).length
  this.stats.masteredCards = this.cards.filter(card => 
    card.interval >= 30 // Consideramos "dominado" cards com intervalo de 30+ dias
  ).length
  next()
})

export const DeckModel = model<IDeck>('Deck', DeckSchema)
