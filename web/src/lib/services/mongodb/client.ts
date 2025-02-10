import { isMongoConfigValid } from './config'
import { MongoDBQueryOptions } from './types'

interface MongoDBResponse<T> {
  data: T
  success: boolean
}

export class MongoDBClient {
  private baseUrl = '/api'

  private async request<T>(
    action: string,
    collection: string,
    data: Record<string, unknown>
  ): Promise<MongoDBResponse<T>> {
    if (!isMongoConfigValid()) {
      throw new Error('MongoDB configuration is invalid')
    }

    const isGet = action === 'find'
    const url = new URL(`${this.baseUrl}/${collection}`, window.location.origin)

    if (isGet && data.filter) {
      Object.entries(data.filter).forEach(([key, value]) => {
        url.searchParams.append(key, String(value))
      })
      if (data.options) {
        Object.entries(data.options).forEach(([key, value]) => {
          url.searchParams.append(key, String(value))
        })
      }
    }

    const response = await fetch(url.toString(), {
      method: isGet ? 'GET' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: isGet ? undefined : JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const json = await response.json()
    return { data: json, success: true }
  }

  // Buscar documentos
  async find<T>(
    collection: string,
    filter: Record<string, unknown> = {},
    options: MongoDBQueryOptions = {}
  ): Promise<T[]> {
    const response = await this.request<T[]>('find', collection, {
      filter,
      options,
    })
    return response.data
  }

  // Buscar um documento
  async findOne<T>(
    collection: string,
    filter: Record<string, unknown>
  ): Promise<T | null> {
    const response = await this.request<T>('findOne', collection, { filter })
    return response.data || null
  }

  // Inserir um documento
  async insertOne<T>(
    collection: string,
    document: Record<string, unknown>
  ): Promise<T> {
    const response = await this.request<T>('insertOne', collection, { document })
    if (!response.data) {
      throw new Error('Failed to insert document')
    }
    return response.data
  }

  // Atualizar um documento
  async updateOne<T>(
    collection: string,
    filter: Record<string, unknown>,
    update: Record<string, unknown>
  ): Promise<T | null> {
    const response = await this.request<T>('updateOne', collection, {
      filter,
      update,
    })
    return response.data || null
  }

  // Deletar um documento
  async deleteOne(
    collection: string,
    filter: Record<string, unknown>
  ): Promise<boolean> {
    const response = await this.request<{ success: boolean }>('deleteOne', collection, {
      filter,
    })
    return Boolean(response.data?.success)
  }
}

// Exportar uma instância única
export const mongoClient = new MongoDBClient()
