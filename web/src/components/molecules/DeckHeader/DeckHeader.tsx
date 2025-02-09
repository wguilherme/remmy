'use client'

import { Button } from "@/components/atoms/Button/Button"
import { Typography } from "@/components/atoms/Typography/Typography"
import { Deck } from "@/types/card"
import { Calendar, Pencil } from "lucide-react"
import Link from "next/link"

interface DeckHeaderProps {
  deck: Deck
}

export function DeckHeader({ deck }: DeckHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <Typography variant="h2">{deck.name}</Typography>
          <Typography variant="subtle">{deck.description}</Typography>
        </div>
        <Link href={`/decks/${deck.id}/edit`}>
          <Button variant="outline">
            <Pencil className="w-4 h-4 mr-2" />
            Edit Deck
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>
            Created{" "}
            {new Intl.DateTimeFormat("en-US", {
              dateStyle: "medium",
            }).format(deck.createdAt)}
          </span>
        </div>
        {deck.lastStudied && (
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>
              Last studied{" "}
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "medium",
              }).format(deck.lastStudied)}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
