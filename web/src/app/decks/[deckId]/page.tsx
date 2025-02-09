'use client'

import { Button } from "@/components/atoms/Button/Button"
import { Typography } from "@/components/atoms/Typography/Typography"
import { CardList } from "@/components/molecules/CardList/CardList"
import { DeckHeader } from "@/components/molecules/DeckHeader/DeckHeader"
import { ImportExportActions } from "@/components/organisms/ImportExportActions/ImportExportActions"
import { useDecks } from "@/components/providers/DeckProvider"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function DeckPage() {
  const params = useParams()
  const { getDeckById, updateDeck } = useDecks()
  const deckId = params.deckId as string
  const deck = getDeckById(deckId)

  if (!deck) {
    return (
      <main className="container mx-auto p-6 space-y-8">
        <Link href="/decks">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Decks
          </Button>
        </Link>

        <div className="text-center space-y-2">
          <Typography variant="h2">Deck not found</Typography>
          <Typography variant="subtle">
            The deck you're looking for doesn't exist.
          </Typography>
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/decks">
          <Button variant="ghost">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Decks
          </Button>
        </Link>
        <ImportExportActions deck={deck} onImport={updateDeck} />
      </div>

      <DeckHeader deck={deck} />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Typography variant="h3">Cards</Typography>
          <Link href={`/decks/${deck.id}/study`}>
            <Button>Start Studying</Button>
          </Link>
        </div>
        <CardList
          cards={deck.cards}
          onCardsChange={(cards) => updateDeck({ ...deck, cards })}
        />
      </div>
    </main>
  )
}
