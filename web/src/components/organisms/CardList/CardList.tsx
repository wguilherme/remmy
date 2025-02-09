'use client'

import { Button } from "@/components/atoms/Button/Button"
import { Input } from "@/components/atoms/Input/Input"
import { Typography } from "@/components/atoms/Typography/Typography"
import { Card } from "@/types/card"
import { ChevronDown, ChevronUp, Edit, Search, Trash } from "lucide-react"
import { useState } from "react"

interface CardListProps {
  cards: Card[]
  onEdit?: (card: Card) => void
  onDelete?: (card: Card) => void
  className?: string
}

export function CardList({
  cards,
  onEdit,
  onDelete,
  className,
}: CardListProps) {
  const [search, setSearch] = useState("")
  const [expandedCards, setExpandedCards] = useState<string[]>([])

  const filteredCards = cards.filter(
    (card) =>
      card.front.toLowerCase().includes(search.toLowerCase()) ||
      card.back.toLowerCase().includes(search.toLowerCase()) ||
      card.notes?.toLowerCase().includes(search.toLowerCase())
  )

  const toggleCard = (cardId: string) => {
    setExpandedCards((prev) =>
      prev.includes(cardId)
        ? prev.filter((id) => id !== cardId)
        : [...prev, cardId]
    )
  }

  return (
    <div className={className}>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search cards..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Typography variant="subtle">
            {filteredCards.length} cards
          </Typography>
        </div>

        <div className="space-y-2">
          {filteredCards.map((card) => {
            const isExpanded = expandedCards.includes(card.id)

            return (
              <div
                key={card.id}
                className="rounded-lg border bg-card text-card-foreground"
              >
                <div className="flex items-center justify-between p-4">
                  <div className="flex-1 space-y-1">
                    <Typography>{card.front}</Typography>
                    {!isExpanded && (
                      <Typography variant="subtle" className="line-clamp-1">
                        {card.back}
                      </Typography>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {onEdit && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(card)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(card)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleCard(card.id)}
                    >
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                {isExpanded && (
                  <div className="border-t p-4 space-y-4">
                    <div>
                      <Typography variant="subtle">Back</Typography>
                      <Typography>{card.back}</Typography>
                    </div>
                    {card.notes && (
                      <div>
                        <Typography variant="subtle">Notes</Typography>
                        <Typography>{card.notes}</Typography>
                      </div>
                    )}
                    {card.tags && card.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {card.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
