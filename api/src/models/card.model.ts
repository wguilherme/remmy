import { Schema } from 'mongoose'

export interface ICard {
  id: string
  front: string
  back: string
  notes?: string
  tags?: string[]
  easeFactor: number
  interval: number
  dueDate: Date
  lapses: number
  lastReview?: Date
  nextReview?: Date
  createdAt: Date
  updatedAt: Date
}

export const CardSchema = new Schema<ICard>(
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
