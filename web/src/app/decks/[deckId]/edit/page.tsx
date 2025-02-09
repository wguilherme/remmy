'use client'

import { Button } from "@/components/atoms/Button/Button"
import { Typography } from "@/components/atoms/Typography/Typography"
import { DeckForm } from "@/components/organisms/DeckForm/DeckForm"
import { useDecks } from "@/components/providers/DeckProvider"
import { DeckFormData } from "@/types/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

export default function EditDeckPage() {
  const params = useParams()
  const router = useRouter()
  const { getDeckById, updateDeck } = useDecks()
  const deck = getDeckById(params.deckId as string)

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
            The deck you're trying to edit doesn't exist.
          </Typography>
        </div>
      </main>
    )
  }

  const handleSubmit = (data: DeckFormData) => {
    updateDeck({ ...deck, ...data })
    router.push(`/decks/${deck.id}`)
  }

  return (
    <main className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Typography variant="h2">Edit Deck</Typography>
          <Typography variant="subtle">
            Update your deck's information and cards
          </Typography>
        </div>
        <Link href={`/decks/${deck.id}`}>
          <Button variant="ghost">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Deck
          </Button>
        </Link>
      </div>

      <div className="max-w-2xl mx-auto">
        <DeckForm onSubmit={handleSubmit} initialData={deck} />
      </div>
    </main>
  )
}
