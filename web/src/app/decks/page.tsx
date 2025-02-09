'use client'

import { Button } from "@/components/atoms/Button/Button"
import { Typography } from "@/components/atoms/Typography/Typography"
import { DeckCard } from "@/components/molecules/DeckCard/DeckCard"
import { DeckFilters } from "@/components/organisms/DeckFilters/DeckFilters"
import { useDecks } from "@/components/providers/DeckProvider"
import { Plus } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface Filters {
  search: string
  category: string
  tags: string[]
}

export default function DecksPage() {
  const { decks } = useDecks()
  const [filters, setFilters] = useState<Filters>({
    search: "",
    category: "all",
    tags: [],
  })

  // Get unique categories and tags
  const categories = Array.from(
    new Set(decks.map((deck) => deck.category).filter(Boolean))
  ) as string[]
  
  const allTags = Array.from(
    new Set(decks.flatMap((deck) => deck.tags || []))
  )

  // Filter decks
  const filteredDecks = decks.filter((deck) => {
    const matchesSearch =
      !filters.search ||
      deck.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      deck.description.toLowerCase().includes(filters.search.toLowerCase())

    const matchesCategory =
      filters.category === "all" || deck.category === filters.category

    const matchesTags =
      filters.tags.length === 0 ||
      filters.tags.every((tag) => deck.tags?.includes(tag))

    return matchesSearch && matchesCategory && matchesTags
  })

  return (
    <main className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Typography variant="h2">All Decks</Typography>
          <Typography variant="subtle">
            Browse and manage your flashcard decks
          </Typography>
        </div>
        <Link href="/decks/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Deck
          </Button>
        </Link>
      </div>

      <DeckFilters
        filters={filters}
        onFiltersChange={setFilters}
        categories={categories}
        availableTags={allTags}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredDecks.map((deck) => (
          <DeckCard key={deck.id} deck={deck} />
        ))}
        {filteredDecks.length === 0 && (
          <div className="col-span-full text-center py-12">
            <Typography variant="subtle">No decks found</Typography>
          </div>
        )}
      </div>
    </main>
  )
}
