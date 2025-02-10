import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { env, connectDB } from './config'

// Conecta ao MongoDB
await connectDB()

// Cria a aplicação
const app = new Elysia()
  // Middleware CORS
  .use(cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  }))
  // Middleware de parse de JSON
  .onParse((request) => {
    if (request.headers.get('content-type')?.includes('application/json')) {
      return request.json()
    }
  })
  // Middleware de erro
  .onError(({ code, error, set }) => {
    console.error(`Error [${code}]:`, error)
    
    if (code === 'NOT_FOUND') {
      set.status = 404
      return { error: 'Not Found' }
    }

    set.status = 500
    return { error: 'Internal Server Error' }
  })
  // Health check
  .get('/health', () => ({ status: 'ok' }))

// Inicia o servidor
app.listen(env.PORT, () => {
  console.log(`🚀 Server running at http://localhost:${env.PORT}`)
})
