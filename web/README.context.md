# Contexto do Projeto Remmy

## Objetivo Principal
Remmy é uma aplicação web de estudo baseada no método Anki, focada em proporcionar uma experiência moderna e eficiente de aprendizado através de flashcards.

## Arquitetura
- Frontend: Next.js (App Router)
- UI: Interface moderna com suporte a tema claro/escuro
- Padrão: Componentes React com TypeScript
- Estado: Gerenciamento local com hooks React

## Stack Tecnológica
- Next.js
- TypeScript
- React
- TailwindCSS
- Tema escuro/claro persistente

## Estrutura de Diretórios Principal
```
web/
├── app/          # Rotas e páginas Next.js
├── components/   # Componentes React reutilizáveis
├── lib/         # Lógica de negócios e utilidades
└── public/      # Arquivos estáticos
```

## Fluxos Principais
1. **Sistema de Estudo**
   - Implementação do algoritmo Anki
   - Interface de cartões com animações
   - Sistema de avaliação (1-4)
   - Sistema de progresso

2. **Navegação**
   - Lista de decks na página inicial
   - Navegação dinâmica entre decks
   - Tratamento de rotas não encontradas

3. **Interface do Usuário**
   - Tema escuro/claro persistente
   - Navbar com navegação
   - Sistema de atalhos de teclado
   - Layout responsivo

## Atalhos de Teclado
- Espaço: Revelar cartão
- 1-4: Avaliar resposta
- S: Pular cartão

## Estado Atual
O projeto possui as funcionalidades básicas implementadas, incluindo:
- Interface de estudo funcional
- Algoritmo do Anki
- Deck de exemplo
- Sistema de progresso básico
- Tema escuro/claro
- Navegação entre decks

## Próximos Passos
Consulte o arquivo `TODO.context.md` para ver as próximas features e melhorias planejadas.
