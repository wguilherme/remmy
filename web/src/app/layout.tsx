import { Navbar } from "@/components/organisms/Navbar/Navbar"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { DeckProvider } from "@/components/providers/DeckProvider"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Remmy",
  description: "Your personal language learning companion",
}

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
          <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <DeckProvider>{children}</DeckProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
