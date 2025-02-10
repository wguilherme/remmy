import { Schema, model } from 'mongoose'
import { CardSchema } from './card.model'
import { Deck } from '@remmy/domain'

const DeckSchema = new Schema<Deck>(
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
  const cards = this.cards as Deck['cards']
  
  this.stats = {
    totalCards: cards.length,
    newCards: cards.filter(card => !card.lastReview).length,
    cardsToReview: cards.filter(card => 
      card.dueDate <= now && card.lastReview
    ).length,
    masteredCards: cards.filter(card => 
      card.interval >= 30 // Consideramos "dominado" cards com intervalo de 30+ dias
    ).length,
  }
  next()
})

export const DeckModel = model<Deck>('Deck', DeckSchema)
