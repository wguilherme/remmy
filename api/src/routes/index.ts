import { Elysia } from 'elysia'
import { deckRoutes } from './deck.routes'

export const router = new Elysia()
  .use(deckRoutes)
