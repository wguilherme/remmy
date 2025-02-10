import { Elysia, t } from 'elysia'
import { DeckController } from '../controllers/deck.controller'

export const deckRoutes = new Elysia({ prefix: '/api/decks' })
  // Listar decks
  .get('/', async ({ query }) => {
    const { search, category, tags } = query
    return DeckController.listDecks({
      search: search as string,
      category: category as string,
      tags: tags ? (tags as string).split(',') : undefined,
    })
  })

  // Buscar deck por ID
  .get('/:id', async ({ params: { id } }) => {
    return DeckController.getDeckById(id)
  })

  // Criar deck
  .post('/', async ({ body }) => {
    return DeckController.createDeck(body as any)
  }, {
    body: t.Object({
      name: t.String(),
      description: t.String(),
      category: t.Optional(t.String()),
      tags: t.Optional(t.Array(t.String())),
      language: t.Optional(t.Object({
        from: t.String(),
        to: t.String(),
      })),
    })
  })

  // Atualizar deck
  .put('/:id', async ({ params: { id }, body }) => {
    return DeckController.updateDeck(id, body as any)
  }, {
    body: t.Object({
      name: t.Optional(t.String()),
      description: t.Optional(t.String()),
      category: t.Optional(t.String()),
      tags: t.Optional(t.Array(t.String())),
      language: t.Optional(t.Object({
        from: t.String(),
        to: t.String(),
      })),
    })
  })

  // Deletar deck
  .delete('/:id', async ({ params: { id } }) => {
    await DeckController.deleteDeck(id)
    return { success: true }
  })

  // Grupo de rotas para cards
  .group('/cards', (app) => app
    // Adicionar card
    .post('/:id', async ({ params: { id }, body }) => {
      return DeckController.addCard(id, body as any)
    }, {
      body: t.Object({
        front: t.String(),
        back: t.String(),
        notes: t.Optional(t.String()),
        tags: t.Optional(t.Array(t.String())),
      })
    })

    // Atualizar card
    .put('/:id/:cardId', async ({ params: { id, cardId }, body }) => {
      return DeckController.updateCard(id, cardId, body as any)
    }, {
      body: t.Object({
        front: t.Optional(t.String()),
        back: t.Optional(t.String()),
        notes: t.Optional(t.String()),
        tags: t.Optional(t.Array(t.String())),
        easeFactor: t.Optional(t.Number()),
        interval: t.Optional(t.Number()),
        dueDate: t.Optional(t.String()),
        lapses: t.Optional(t.Number()),
        lastReview: t.Optional(t.String()),
        nextReview: t.Optional(t.String()),
      })
    })

    // Deletar card
    .delete('/:id/:cardId', async ({ params: { id, cardId } }) => {
      await DeckController.deleteCard(id, cardId)
      return { success: true }
    })
  )
