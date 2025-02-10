import { z } from 'zod'
import { config } from 'dotenv'

// Carrega as variáveis de ambiente
config()

// Schema de validação das variáveis de ambiente
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('3001'),
  MONGODB_URI: z.string(),
  CORS_ORIGIN: z.string().default('http://localhost:3000'),
})

// Valida e exporta as variáveis de ambiente
export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
})
