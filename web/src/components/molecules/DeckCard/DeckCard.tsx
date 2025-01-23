'use client'

import { Typography } from "@/components/atoms/Typography/Typography"
import { cn } from "@/lib/utils"
import { Deck } from "@/types/card"
import { BookOpen } from "lucide-react"
import Link from "next/link"
import * as React from "react"

interface DeckCardProps extends React.HTMLAttributes<HTMLDivElement> {
  deck: Deck
}

const DeckCard = React.forwardRef<HTMLDivElement, DeckCardProps>(
  ({ className, deck, ...props }, ref) => {
    return (
      <Link href={`/study/${deck.id}`}>
        <div
          ref={ref}
          className={cn(
            "group relative overflow-hidden rounded-lg border p-6 hover:border-primary transition-colors",
            className
          )}
          {...props}
        >
          <div className="flex justify-between gap-4">
            <div className="space-y-2">
              <Typography variant="h3">{deck.name}</Typography>
              <Typography variant="subtle">{deck.description}</Typography>
            </div>
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border bg-muted">
              <BookOpen className="h-6 w-6" />
            </div>
          </div>
          
          <div className="mt-4 flex items-center text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Typography variant="subtle">
                {deck.cards.length} cards
              </Typography>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
              <Typography variant="subtle">
                {new Date(deck.updatedAt).toLocaleDateString()}
              </Typography>
            </div>
          </div>
        </div>
      </Link>
    )
  }
)
DeckCard.displayName = "DeckCard"

export { DeckCard }
