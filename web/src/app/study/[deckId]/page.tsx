'use client'

import { StudySession } from "@/components/templates/StudySession/StudySession"
import { englishDeck } from "@/lib/constants/mockData"

export default function StudyPage() {
  // TODO: Fetch deck data based on deckId from params
  // For now, we'll use the mock data
  return (
    <main className="min-h-screen bg-background">
      <StudySession deck={englishDeck} />
    </main>
  )
}
