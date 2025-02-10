'use client'

import { DeckList } from '@/components/organisms/DeckList'
import { ImportExportActions } from '@/components/organisms/ImportExportActions/ImportExportActions'
import { useDecks } from '@/components/providers/DeckProvider'
import { useEffect } from 'react'

export default function ExplorePage() {
  const { decks, loadDecks, isLoading } = useDecks()

  useEffect(() => {
    void loadDecks()
  }, [loadDecks])

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col gap-4">
        <ImportExportActions onImportSuccess={loadDecks} />
        <DeckList decks={decks} isLoading={isLoading} />
      </div>
    </div>
  )
}
