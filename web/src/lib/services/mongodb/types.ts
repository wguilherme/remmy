export interface MongoDBResponse<T> {
  success: boolean
  data?: T | T[]
  error?: string
}

export interface MongoDBQueryOptions {
  limit?: number
  skip?: number
  sort?: Record<string, 1 | -1>
  projection?: Record<string, 0 | 1>
}
