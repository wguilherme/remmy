'use client'

import { Typography } from "@/components/atoms/Typography/Typography"
import { Deck } from "@/types/card"
import { BookOpen, Calendar, Clock, Tag } from "lucide-react"

interface DeckStatsProps {
  deck: Deck
  className?: string
}

export function DeckStats({ deck, className }: DeckStatsProps) {
  const stats = [
    {
      label: "Total Cards",
      value: deck.cards.length,
      icon: BookOpen,
    },
    {
      label: "Categories",
      value: deck.category || "None",
      icon: Tag,
    },
    {
      label: "Last Studied",
      value: deck.lastStudied
        ? new Date(deck.lastStudied).toLocaleDateString()
        : "Never",
      icon: Calendar,
    },
    {
      label: "Created",
      value: new Date(deck.createdAt).toLocaleDateString(),
      icon: Clock,
    },
  ]

  return (
    <div className={className}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-2 p-4 rounded-lg bg-accent/50"
          >
            <stat.icon className="w-5 h-5 text-primary" />
            <Typography variant="subtle" className="text-center">
              {stat.label}
            </Typography>
            <Typography variant="h4" className="text-center">
              {stat.value}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  )
}
