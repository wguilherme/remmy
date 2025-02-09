'use client'

import { Deck } from "@/types/card"
import { createContext, useContext, useEffect, useState } from "react"

interface DeckContextType {
  decks: Deck[]
  addDeck: (deck: Deck) => void
  updateDeck: (deck: Deck) => void
  removeDeck: (id: string) => void
  getDeckById: (id: string) => Deck | undefined
}

const DeckContext = createContext<DeckContextType>({
  decks: [],
  addDeck: () => {},
  updateDeck: () => {},
  removeDeck: () => {},
  getDeckById: () => undefined,
})

export function DeckProvider({ children }: { children: React.ReactNode }) {
  const [decks, setDecks] = useState<Deck[]>([])

  // Carregar decks do localStorage ao iniciar
  useEffect(() => {
    const savedDecks = localStorage.getItem('remmy-decks')
    if (savedDecks) {
      try {
        const parsedDecks = JSON.parse(savedDecks)
        // Converter strings de data para objetos Date
        const decksWithDates = parsedDecks.map((deck: any) => ({
          ...deck,
          createdAt: new Date(deck.createdAt),
          updatedAt: new Date(deck.updatedAt),
          lastStudied: deck.lastStudied ? new Date(deck.lastStudied) : undefined,
          cards: deck.cards.map((card: any) => ({
            ...card,
            createdAt: new Date(card.createdAt),
            updatedAt: new Date(card.updatedAt),
            dueDate: new Date(card.dueDate),
            lastReview: card.lastReview ? new Date(card.lastReview) : undefined,
            nextReview: card.nextReview ? new Date(card.nextReview) : undefined,
          })),
        }))
        setDecks(decksWithDates)
      } catch (error) {
        console.error('Error loading decks from localStorage:', error)
      }
    }
  }, [])

  // Salvar decks no localStorage quando houver mudanças
  useEffect(() => {
    localStorage.setItem('remmy-decks', JSON.stringify(decks))
  }, [decks])

  const addDeck = (deck: Deck) => {
    setDecks((prev) => [...prev, deck])
  }

  const updateDeck = (updatedDeck: Deck) => {
    setDecks((prev) =>
      prev.map((deck) => (deck.id === updatedDeck.id ? updatedDeck : deck))
    )
  }

  const removeDeck = (id: string) => {
    setDecks((prev) => prev.filter((deck) => deck.id !== id))
  }

  const getDeckById = (id: string) => {
    return decks.find((deck) => deck.id === id)
  }

  return (
    <DeckContext.Provider
      value={{ decks, addDeck, updateDeck, removeDeck, getDeckById }}
    >
      {children}
    </DeckContext.Provider>
  )
}

export const useDecks = () => {
  const context = useContext(DeckContext)
  if (!context) {
    throw new Error("useDecks must be used within a DeckProvider")
  }
  return context
}
