# Contexto: API + MongoDB Integration

## Objetivo
Migrar o armazenamento de dados do localStorage para MongoDB Atlas através de uma API REST construída com Bun.

## Arquitetura

### Backend (API)
- **Runtime**: Bun
- **Database**: MongoDB Atlas
- **Estrutura**: REST API
- **Endpoints**: /api/decks, /api/cards
- **Features**:
  - CRUD completo
  - Validação de dados
  - Tratamento de erros
  - Logs e monitoramento

### Frontend (Next.js)
- **Cliente HTTP**: Fetch API
- **Cache**: Local + SWR/React Query
- **Estado**: Context API
- **Features**:
  - Cache local
  - Retry em falhas
  - Loading states
  - Error handling

## Estrutura de Dados

### Collections
```typescript
// Decks Collection
{
  id: string
  name: string
  description: string
  category?: string
  tags?: string[]
  language?: {
    from: string
    to: string
  }
  cards: Card[]
  stats: {
    totalCards: number
    newCards: number
    cardsToReview: number
    masteredCards: number
  }
  createdAt: Date
  updatedAt: Date
  lastStudied?: Date
}

// Cards (Embedded in Decks)
{
  id: string
  front: string
  back: string
  notes?: string
  tags?: string[]
  easeFactor: number
  interval: number
  dueDate: Date
  lapses: number
  lastReview?: Date
  nextReview?: Date
  createdAt: Date
  updatedAt: Date
}
```

## API Endpoints

### Decks
- `GET /api/decks` - Listar decks
- `GET /api/decks/:id` - Buscar deck
- `POST /api/decks` - Criar deck
- `PUT /api/decks/:id` - Atualizar deck
- `DELETE /api/decks/:id` - Remover deck
- `GET /api/decks/:id/stats` - Estatísticas

### Cards
- `POST /api/decks/:id/cards` - Adicionar card
- `PUT /api/decks/:id/cards/:cardId` - Atualizar card
- `DELETE /api/decks/:id/cards/:cardId` - Remover card
- `PUT /api/decks/:id/cards/:cardId/review` - Registrar revisão

## Pontos de Atenção
- Segurança da API
- Performance de queries
- Cache e otimização
- Tratamento de erros
- Migração de dados existentes

## Próximos Passos (Pós-MVP)
- Autenticação de usuários
- Sistema de backup
- Analytics
- Rate limiting
- Documentação OpenAPI

## Status: Em Implementação
Última atualização: 2024-02-09
