'use client'

import { Deck } from '@remmy/domain'
import React, { createContext, useContext, useState } from 'react'

export interface DeckContextType {
  decks: Deck[]
  isLoading: boolean
  loadDecks: () => Promise<void>
}

const defaultContext: DeckContextType = {
  decks: [],
  isLoading: false,
  loadDecks: async () => {},
}

const DeckContext = createContext<DeckContextType>(defaultContext)

export function DeckProvider({ children }: { children: React.ReactNode }) {
  const [decks, setDecks] = useState<Deck[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const loadDecks = async () => {
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
  }

  const value: DeckContextType = {
    decks,
    isLoading,
    loadDecks,
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
