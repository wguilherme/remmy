'use client'

import { Card, CardContent, CardHeader } from "@/components/atoms/Card/Card"
import { Typography } from "@/components/atoms/Typography/Typography"
import { Deck } from "@/types/card"
import { Calendar, Layers } from "lucide-react"
import Link from "next/link"

interface DeckCardProps {
  deck: Deck
  className?: string
}

export function DeckCard({ deck, className }: DeckCardProps) {
  return (
    <Link href={`/decks/${deck.id}`}>
      <Card className={className}>
        <CardHeader>
          <Typography variant="h3">{deck.name}</Typography>
          <Typography variant="subtle" className="line-clamp-2">
            {deck.description}
          </Typography>
        </CardHeader>

        <CardContent>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Layers className="h-4 w-4" />
              <span>{deck.cards?.length || 0} cards</span>
            </div>
            {deck.category && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{deck.category}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
