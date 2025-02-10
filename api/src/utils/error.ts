export class APIError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: unknown
  ) {
    super(message)
    this.name = 'APIError'
  }
}

export function isAPIError(error: unknown): error is APIError {
  return error instanceof APIError
}

// Função helper para criar erros comuns
export const Errors = {
  NotFound: (message: string) => new APIError(404, message),
  BadRequest: (message: string, details?: unknown) =>
    new APIError(400, message, details),
  Unauthorized: (message: string) => new APIError(401, message),
  Forbidden: (message: string) => new APIError(403, message),
  Internal: (message: string) => new APIError(500, message),
}
