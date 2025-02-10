'use client'

import { DeckList } from '@/components/organisms/DeckList'
import { ImportExportActions } from '@/components/organisms/ImportExportActions/ImportExportActions'
import { useDecks, type DeckContextType } from '@/components/providers/DeckProvider'
import { useEffect } from 'react'

export default function Home() {
  const { decks, loadDecks, isLoading }: DeckContextType = useDecks()

  useEffect(() => {
    void loadDecks()
  }, []) 

  return (
    <main className="container mx-auto p-4">
      <div className="flex flex-col gap-4">
        <ImportExportActions onImportSuccess={loadDecks} />
        <DeckList decks={decks} isLoading={isLoading} />
      </div>
    </main>
  )
}
