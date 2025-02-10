'use client'

import { Deck } from '@remmy/domain'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

export interface DeckContextType {
  decks: Deck[]
  isLoading: boolean
  loadDecks: () => Promise<void>
  getDeckById: (id: string) => Deck | undefined
  updateDeck: (deck: Deck) => void
}

const defaultContext: DeckContextType = {
  decks: [],
  isLoading: false,
  loadDecks: async () => {},
  getDeckById: () => undefined,
  updateDeck: () => {},
}

const DeckContext = createContext<DeckContextType>(defaultContext)

export function DeckProvider({ children }: { children: React.ReactNode }) {
  const [decks, setDecks] = useState<Deck[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const loadDecks = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/decks')
      if (!response.ok) {
        throw new Error('Failed to load decks')
      }
      const data = await response.json()
      setDecks(data)
    } catch (error) {
      console.error('Error loading decks:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const getDeckById = useCallback(
    (id: string) => {
      return decks.find((deck) => deck.id === id)
    },
    [decks]
  )

  const updateDeck = useCallback((updatedDeck: Deck) => {
    setDecks((prevDecks) =>
      prevDecks.map((deck) =>
        deck.id === updatedDeck.id ? updatedDeck : deck
      )
    )
  }, [])

  useEffect(() => {
    loadDecks()
  }, [loadDecks])

  const value: DeckContextType = {
    decks,
    isLoading,
    loadDecks,
    getDeckById,
    updateDeck,
  }

  return (
    <DeckContext.Provider value={value}>
      {children}
    </DeckContext.Provider>
  )
}

export function useDecks(): DeckContextType {
  const context = useContext(DeckContext)
  if (!context) {
    throw new Error('useDecks must be used within a DeckProvider')
  }
  return context
}
