import { DeckProvider } from '@/components/providers/DeckProvider'
import { Toaster } from '@/components/atoms/Toast/Toaster'
import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DeckProvider>
            {children}
            <Toaster />
          </DeckProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
