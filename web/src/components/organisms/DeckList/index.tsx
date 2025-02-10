import { Button } from '@/components/atoms/Button'
import { Card } from '@/components/atoms/Card'
import { Deck } from '@remmy/domain'
import { Clock, Edit, Loader2, Plus, ScrollText } from 'lucide-react'
import Link from 'next/link'

interface DeckListProps {
  decks: Deck[]
  isLoading?: boolean
}

export function DeckList({ decks, isLoading = false }: DeckListProps) {
  if (isLoading) {
    return (
      <Card className="flex flex-col items-center justify-center gap-4 p-8 text-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        <div className="space-y-1">
          <h3 className="font-semibold">Loading decks...</h3>
          <p className="text-sm text-muted-foreground">
            Please wait while we fetch your decks
          </p>
        </div>
      </Card>
    )
  }

  if (!decks.length) {
    return (
      <Card className="flex flex-col items-center justify-center gap-4 p-8 text-center">
        <div className="rounded-full bg-muted p-3">
          <Plus className="h-6 w-6 text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <h3 className="font-semibold">No decks yet</h3>
          <p className="text-sm text-muted-foreground">
            Create or import a deck to get started!
          </p>
        </div>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {decks.map((deck) => (
        <Card key={deck.id} className="relative h-full p-6">
          <Link
            href={`/decks/${deck.id}/edit`}
            className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Edit className="h-4 w-4" />
          </Link>

          <Link href={`/decks/${deck.id}/study`} className="block h-full">
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="font-semibold">{deck.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {deck.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <ScrollText className="h-4 w-4" />
                  <span>{deck.stats.totalCards} cards</span>
                </div>
                {deck.stats.newCards > 0 && (
                  <div className="flex items-center gap-1">
                    <Plus className="h-4 w-4" />
                    <span>{deck.stats.newCards} new</span>
                  </div>
                )}
                {deck.stats.cardsToReview > 0 && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{deck.stats.cardsToReview} to review</span>
                  </div>
                )}
              </div>

              <div className="mt-auto pt-4">
                <Button className="w-full">Study Now</Button>
              </div>
            </div>
          </Link>
        </Card>
      ))}
    </div>
  )
}
