import { Schema } from 'mongoose'
import { Card } from '@remmy/domain'

export const CardSchema = new Schema<Card>(
  {
    id: { type: String, required: true },
    front: { type: String, required: true },
    back: { type: String, required: true },
    notes: String,
    tags: [String],
    easeFactor: { type: Number, required: true, default: 2.5 },
    interval: { type: Number, required: true, default: 0 },
    dueDate: { type: Date, required: true, default: Date.now },
    lapses: { type: Number, required: true, default: 0 },
    lastReview: Date,
    nextReview: Date,
  },
  {
    timestamps: true,
    _id: false, // Usaremos nosso próprio id
  }
)
