'use client'

import { Button } from "@/components/atoms/Button/Button"
import { Typography } from "@/components/atoms/Typography/Typography"
import { Deck } from "@/types/card"
import { Download, Edit, Play } from "lucide-react"
import Link from "next/link"

interface DeckHeaderProps {
  deck: Deck
  onExport?: () => void
  className?: string
}

export function DeckHeader({ deck, onExport, className }: DeckHeaderProps) {
  return (
    <div className={className}>
      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <Typography variant="h2">{deck.name}</Typography>
            <Typography variant="subtle">{deck.description}</Typography>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/study/${deck.id}`}>
              <Button>
                <Play className="w-4 h-4 mr-2" />
                Study Now
              </Button>
            </Link>
            <Link href={`/decks/${deck.id}/edit`}>
              <Button variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </Link>
            {onExport && (
              <Button variant="outline" onClick={onExport}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            )}
          </div>
        </div>

        {deck.tags && deck.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {deck.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-sm font-medium text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
