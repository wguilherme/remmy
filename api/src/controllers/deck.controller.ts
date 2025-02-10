import { DeckModel, IDeck } from '../models'
import { Errors } from '../utils/error'

export class DeckController {
  // Listar todos os decks
  static async listDecks(filters?: {
    search?: string
    category?: string
    tags?: string[]
  }): Promise<IDeck[]> {
    const query: any = {}

    if (filters?.search) {
      query.$text = { $search: filters.search }
    }

    if (filters?.category) {
      query.category = filters.category
    }

    if (filters?.tags?.length) {
      query.tags = { $in: filters.tags }
    }

    return DeckModel.find(query)
  }

  // Buscar deck por ID
  static async getDeckById(id: string): Promise<IDeck> {
    const deck = await DeckModel.findOne({ id })
    if (!deck) {
      throw Errors.NotFound(`Deck with id ${id} not found`)
    }
    return deck
  }

  // Criar novo deck
  static async createDeck(data: Omit<IDeck, 'id' | 'createdAt' | 'updatedAt' | 'stats'>): Promise<IDeck> {
    const deck = new DeckModel({
      ...data,
      id: crypto.randomUUID(),
    })
    return deck.save()
  }

  // Atualizar deck
  static async updateDeck(id: string, data: Partial<IDeck>): Promise<IDeck> {
    const deck = await DeckModel.findOneAndUpdate(
      { id },
      { $set: data },
      { new: true }
    )
    if (!deck) {
      throw Errors.NotFound(`Deck with id ${id} not found`)
    }
    return deck
  }

  // Deletar deck
  static async deleteDeck(id: string): Promise<void> {
    const result = await DeckModel.deleteOne({ id })
    if (result.deletedCount === 0) {
      throw Errors.NotFound(`Deck with id ${id} not found`)
    }
  }

  // Adicionar card ao deck
  static async addCard(deckId: string, card: Omit<IDeck['cards'][0], 'id' | 'createdAt' | 'updatedAt'>): Promise<IDeck> {
    const deck = await DeckModel.findOne({ id: deckId })
    if (!deck) {
      throw Errors.NotFound(`Deck with id ${deckId} not found`)
    }

    deck.cards.push({
      ...card,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return deck.save()
  }

  // Atualizar card
  static async updateCard(deckId: string, cardId: string, data: Partial<IDeck['cards'][0]>): Promise<IDeck> {
    const deck = await DeckModel.findOne({ id: deckId })
    if (!deck) {
      throw Errors.NotFound(`Deck with id ${deckId} not found`)
    }

    const card = deck.cards.find(c => c.id === cardId)
    if (!card) {
      throw Errors.NotFound(`Card with id ${cardId} not found in deck ${deckId}`)
    }

    Object.assign(card, data)
    card.updatedAt = new Date()

    return deck.save()
  }

  // Deletar card
  static async deleteCard(deckId: string, cardId: string): Promise<IDeck> {
    const deck = await DeckModel.findOne({ id: deckId })
    if (!deck) {
      throw Errors.NotFound(`Deck with id ${deckId} not found`)
    }

    const cardIndex = deck.cards.findIndex(c => c.id === cardId)
    if (cardIndex === -1) {
      throw Errors.NotFound(`Card with id ${cardId} not found in deck ${deckId}`)
    }

    deck.cards.splice(cardIndex, 1)
    return deck.save()
  }
}
