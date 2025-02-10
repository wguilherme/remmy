import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { DeckController } from './controllers'
import { connectDB } from './config/database'
import { env } from './config/env'

// Conecta ao MongoDB
await connectDB()

const app = new Elysia()
  .use(cors({
    origin: env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  }))
  .get('/', () => 'Hello Remmy!')
  
  // Decks
  .get('/decks', async ({ query }) => {
    const decks = await DeckController.listDecks({
      search: query.search as string,
      category: query.category as string,
      tags: query.tags ? (query.tags as string).split(',') : undefined
    })
    return decks
  })
  
  .get('/decks/:deckId', async ({ params }) => {
    return DeckController.getDeckById(params.deckId)
  })
  
  .post('/decks', async ({ body }) => {
    return DeckController.createDeck(body as any)
  })
  
  .put('/decks/:deckId', async ({ params, body }) => {
    return DeckController.updateDeck(params.deckId, body as any)
  })
  
  .delete('/decks/:deckId', async ({ params }) => {
    await DeckController.deleteDeck(params.deckId)
    return { success: true }
  })
  
  // Cards
  .post('/decks/:deckId/cards', async ({ params, body }) => {
    return DeckController.addCard(params.deckId, body as any)
  })
  
  .put('/decks/:deckId/cards/:cardId', async ({ params, body }) => {
    return DeckController.updateCard(params.deckId, params.cardId, body as any)
  })
  
  .delete('/decks/:deckId/cards/:cardId', async ({ params }) => {
    return DeckController.deleteCard(params.deckId, params.cardId)
  })
  
  .listen(env.PORT)

console.log(
  `🦊 Remmy API is running at ${app.server?.hostname}:${app.server?.port}`
)
