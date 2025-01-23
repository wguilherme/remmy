'use client'

import { Typography } from "@/components/atoms/Typography/Typography"
import { ThemeToggle } from "@/components/molecules/ThemeToggle/ThemeToggle"
import { Brain } from "lucide-react"
import Link from "next/link"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <Brain className="h-6 w-6" />
          <Typography variant="h3" as="span">Remmy</Typography>
        </Link>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
