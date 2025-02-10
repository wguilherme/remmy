import { Response, Request } from 'express'
import { isAPIError } from '../utils/error'
import { ZodError } from 'zod'

export function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: (error: Error) => void
) {
  console.error('Error:', error)

  // Erros da API
  if (isAPIError(error)) {
    return res.status(error.statusCode).json({
      error: error.message,
      details: error.details,
    })
  }

  // Erros de validação do Zod
  if (error instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation error',
      details: error.errors,
    })
  }

  // Erro genérico
  return res.status(500).json({
    error: 'Internal server error',
  })
}
