'use client'

import { Typography } from "@/components/atoms/Typography/Typography"
import { DeckForm } from "@/components/organisms/DeckForm/DeckForm"
import { DeckFormData } from "@/types/card"
import { useRouter } from "next/navigation"

export default function NewDeckPage() {
  const router = useRouter()

  const handleSubmit = (data: DeckFormData) => {
    // In a real app, this would save to the database
    console.log("New deck:", data)
    router.push("/decks")
  }

  return (
    <main className="container mx-auto p-6 space-y-8">
      <div className="space-y-1">
        <Typography variant="h2">Create New Deck</Typography>
        <Typography variant="subtle">
          Create a new flashcard deck with custom cards and metadata
        </Typography>
      </div>

      <div className="max-w-2xl mx-auto">
        <DeckForm onSubmit={handleSubmit} />
      </div>
    </main>
  )
}
