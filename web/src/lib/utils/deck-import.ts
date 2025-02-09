import { Card, Deck } from "@/types/card"
import { initializeCard } from "../anki/algorithm"
import { v4 as uuidv4 } from 'uuid'

interface DeckImport {
  version: string
  deck: Deck
}

export function validateDeckImport(data: unknown): DeckImport {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid file format")
  }

  const importData = data as Record<string, any>

  if (!importData.version || typeof importData.version !== "string") {
    throw new Error("Missing or invalid version")
  }

  if (!importData.deck || typeof importData.deck !== "object") {
    throw new Error("Missing or invalid deck data")
  }

  const { deck } = importData

  // Validar campos obrigatórios do deck
  const requiredDeckFields = ["name", "description", "cards"]
  for (const field of requiredDeckFields) {
    if (!deck[field]) {
      throw new Error(`Missing required deck field: ${field}`)
    }
  }

  if (!Array.isArray(deck.cards)) {
    throw new Error("Cards must be an array")
  }

  // Validar campos obrigatórios de cada card
  deck.cards.forEach((card: any, index: number) => {
    const requiredCardFields = ["front", "back"]
    for (const field of requiredCardFields) {
      if (!card[field]) {
        throw new Error(`Missing required card field: ${field} in card ${index + 1}`)
      }
    }
  })

  // Gerar novo ID para o deck
  deck.id = uuidv4()
  deck.createdAt = new Date()
  deck.updatedAt = new Date()

  // Inicializar cada card com o algoritmo Anki
  deck.cards = deck.cards.map((card: Partial<Card>) => initializeCard(card))

  return importData as DeckImport
}

export function prepareDeckExport(deck: Deck): DeckImport {
  return {
    version: "1.0",
    deck: {
      ...deck,
      cards: deck.cards.map(card => ({
        ...card,
        createdAt: card.createdAt.toISOString(),
        updatedAt: card.updatedAt.toISOString(),
        dueDate: card.dueDate.toISOString(),
        lastReview: card.lastReview?.toISOString(),
        nextReview: card.nextReview?.toISOString(),
      })),
      createdAt: deck.createdAt.toISOString(),
      updatedAt: deck.updatedAt.toISOString(),
      lastStudied: deck.lastStudied?.toISOString(),
    },
  }
}
