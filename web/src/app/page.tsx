'use client'

import { Button } from "@/components/atoms/Button/Button"
import { Typography } from "@/components/atoms/Typography/Typography"
import { DeckCard } from "@/components/molecules/DeckCard/DeckCard"
import { ImportExportActions } from "@/components/organisms/ImportExportActions/ImportExportActions"
import { useDecks } from "@/components/providers/DeckProvider"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const { decks, addDeck } = useDecks()

  return (
    <main className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Typography variant="h2">Your Decks</Typography>
          <Typography variant="subtle">
            Select a deck to start studying
          </Typography>
        </div>
        <div className="flex items-center gap-2">
          <ImportExportActions onImport={addDeck} />
          <Link href="/decks/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Deck
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {decks.map((deck) => (
          <DeckCard key={deck.id} deck={deck} />
        ))}
        {decks.length === 0 && (
          <div className="col-span-full text-center py-12">
            <Typography variant="subtle">No decks yet. Create or import one to get started!</Typography>
          </div>
        )}
      </div>
    </main>
  )
}
