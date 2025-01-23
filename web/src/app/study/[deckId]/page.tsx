'use client'

import { Typography } from "@/components/atoms/Typography/Typography"
import { StudySession } from "@/components/templates/StudySession/StudySession"
import { findDeckById } from "@/lib/constants/mockData"
import { useParams } from "next/navigation"

export default function StudyPage() {
  const params = useParams()
  const deckId = params.deckId as string
  const deck = findDeckById(deckId)

  if (!deck) {
    return (
      <main className="container mx-auto p-6">
        <Typography variant="h2">Deck not found</Typography>
        <Typography variant="subtle">
          The deck you&apos;re looking for doesn&apos;t exist.
        </Typography>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <StudySession deck={deck} />
    </main>
  )
}
