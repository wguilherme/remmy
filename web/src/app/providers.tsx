'use client'

import { DeckProvider } from '@/components/providers/DeckProvider'
import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <DeckProvider>{children}</DeckProvider>
    </ThemeProvider>
  )
}
