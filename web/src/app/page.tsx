'use client'

import { Typography } from "@/components/atoms/Typography/Typography"
import { DeckCard } from "@/components/molecules/DeckCard/DeckCard"
import { decks } from "@/lib/constants/mockData"

export default function HomePage() {
  return (
    <main className="container mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <Typography variant="h2">Your Decks</Typography>
        <Typography variant="subtle">
          Select a deck to start studying
        </Typography>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {decks.map((deck) => (
          <DeckCard key={deck.id} deck={deck} />
        ))}
      </div>
    </main>
  )
}
