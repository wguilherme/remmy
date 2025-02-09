'use client'

import { Input } from "@/components/atoms/Input/Input"
import { Label } from "@/components/atoms/Label/Label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/Select/Select"
import { TagInput } from "@/components/molecules/TagInput/TagInput"
import { Search } from "lucide-react"

interface DeckFilters {
  search?: string
  category?: string
  tags: string[]
}

interface DeckFiltersProps {
  filters: DeckFilters
  onFiltersChange: (filters: DeckFilters) => void
  categories: string[]
  availableTags: string[]
  className?: string
}

export function DeckFilters({
  filters,
  onFiltersChange,
  categories,
  availableTags,
  className,
}: DeckFiltersProps) {
  return (
    <div className={className}>
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search decks..."
            value={filters.search}
            onChange={(e) =>
              onFiltersChange({ ...filters, search: e.target.value })
            }
            className="pl-9"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              value={filters.category}
              onValueChange={(value) =>
                onFiltersChange({ ...filters, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <TagInput
              value={filters.tags}
              onChange={(tags) => onFiltersChange({ ...filters, tags })}
              suggestions={availableTags}
              placeholder="Filter by tags..."
            />
          </div>
        </div>
      </div>
    </div>
  )
}
