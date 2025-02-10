'use client'

import { DeckList } from '@/components/organisms/DeckList'
import { useDecks } from '@/components/providers/DeckProvider'
import { Brain } from 'lucide-react'
import { useEffect } from 'react'

export default function Home() {
  const { decks, loadDecks } = useDecks()

  useEffect(() => {
    loadDecks()
  }, [loadDecks])

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center gap-4">
        <div className="rounded-full bg-primary/10 p-4">
          <Brain className="h-12 w-12 text-primary" />
        </div>
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Your Decks</h1>
          <p className="text-lg text-muted-foreground">
            Create and manage your flashcard decks
          </p>
        </div>
      </div>

      <DeckList decks={decks} />
    </div>
  )
}
