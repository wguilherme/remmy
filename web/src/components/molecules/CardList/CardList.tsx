'use client'

import { Card } from "@/types/card"
import { Button } from "@/components/atoms/Button/Button"
import { Typography } from "@/components/atoms/Typography/Typography"
import { Plus } from "lucide-react"
import { useState } from "react"

interface CardListProps {
  cards: Card[]
  onCardsChange: (cards: Card[]) => void
}

export function CardList({ cards, onCardsChange }: CardListProps) {
  const [editingCardId, setEditingCardId] = useState<string>()

  const addCard = () => {
    onCardsChange([
      ...cards,
      {
        id: crypto.randomUUID(),
        front: "",
        back: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        easeFactor: 2.5,
        interval: 0,
        dueDate: new Date(),
        lapses: 0,
      },
    ])
  }

  const updateCard = (updatedCard: Card) => {
    onCardsChange(
      cards.map((card) =>
        card.id === updatedCard.id ? { ...updatedCard, updatedAt: new Date() } : card
      )
    )
  }

  const deleteCard = (id: string) => {
    onCardsChange(cards.filter((card) => card.id !== id))
  }

  return (
    <div className="space-y-4">
      {cards.length === 0 ? (
        <div className="text-center py-8">
          <Typography variant="subtle">No cards yet. Add your first card!</Typography>
        </div>
      ) : (
        <div className="grid gap-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className="p-4 rounded-lg border bg-card hover:border-primary transition-colors"
            >
              <div className="space-y-2">
                <div>
                  <Typography variant="h4">Front</Typography>
                  <Typography>{card.front}</Typography>
                </div>
                <div>
                  <Typography variant="h4">Back</Typography>
                  <Typography>{card.back}</Typography>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Button onClick={addCard} className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Card
      </Button>
    </div>
  )
}
