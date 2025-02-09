'use client'

import { Button } from "@/components/atoms/Button/Button"
import { FlashCard } from "@/components/atoms/Card/FlashCard"
import { Typography } from "@/components/atoms/Typography/Typography"
import { useDecks } from "@/components/providers/DeckProvider"
import { processReview } from "@/lib/anki/algorithm"
import { ReviewQuality } from "@/types/card"
import { ArrowLeft, Check, ThumbsDown, ThumbsUp, X } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

export default function StudyPage() {
  const params = useParams()
  const router = useRouter()
  const { getDeckById, updateDeck } = useDecks()
  const deck = getDeckById(params.deckId as string)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isRevealed, setIsRevealed] = useState(false)

  if (!deck) {
    return (
      <main className="container mx-auto p-6 space-y-8">
        <Link href="/decks">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Decks
          </Button>
        </Link>

        <div className="text-center space-y-2">
          <Typography variant="h2">Deck not found</Typography>
          <Typography variant="subtle">
            The deck you're looking for doesn't exist.
          </Typography>
        </div>
      </main>
    )
  }

  if (deck.cards.length === 0) {
    return (
      <main className="container mx-auto p-6 space-y-8">
        <Link href={`/decks/${deck.id}`}>
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Deck
          </Button>
        </Link>

        <div className="text-center space-y-2">
          <Typography variant="h2">No cards to study</Typography>
          <Typography variant="subtle">
            Add some cards to your deck to start studying!
          </Typography>
        </div>
      </main>
    )
  }

  const currentCard = deck.cards[currentCardIndex]

  const handleReview = (quality: ReviewQuality) => {
    const updatedCard = {
      ...currentCard,
      ...processReview(currentCard, quality),
    }

    const updatedDeck = {
      ...deck,
      cards: deck.cards.map((card) =>
        card.id === updatedCard.id ? updatedCard : card
      ),
      lastStudied: new Date(),
    }

    updateDeck(updatedDeck)

    if (currentCardIndex < deck.cards.length - 1) {
      setCurrentCardIndex((prev) => prev + 1)
      setIsRevealed(false)
    } else {
      // Finished studying
      router.push(`/decks/${deck.id}`)
    }
  }

  const progress = Math.round(((currentCardIndex + 1) / deck.cards.length) * 100)

  return (
    <main className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <Link href={`/decks/${deck.id}`}>
          <Button variant="ghost">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Deck
          </Button>
        </Link>
        <Typography variant="subtle">
          Card {currentCardIndex + 1} of {deck.cards.length}
        </Typography>
      </div>

      <div className="w-full bg-muted rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-center">
        <FlashCard
          front={currentCard.front}
          back={currentCard.back}
          isRevealed={isRevealed}
          onFlip={() => setIsRevealed(!isRevealed)}
        />
      </div>

      <div className="flex justify-center gap-4">
        {!isRevealed ? (
          <Button
            size="lg"
            onClick={() => setIsRevealed(true)}
            className="w-full max-w-sm"
          >
            Show Answer
          </Button>
        ) : (
          <div className="flex gap-2 w-full max-w-2xl">
            <Button
              variant="destructive"
              onClick={() => handleReview(ReviewQuality.AGAIN)}
              className="flex-1"
            >
              <X className="w-4 h-4 mr-2" />
              Again
            </Button>
            <Button
              variant="outline"
              onClick={() => handleReview(ReviewQuality.HARD)}
              className="flex-1"
            >
              <ThumbsDown className="w-4 h-4 mr-2" />
              Hard
            </Button>
            <Button
              variant="outline"
              onClick={() => handleReview(ReviewQuality.GOOD)}
              className="flex-1"
            >
              <ThumbsUp className="w-4 h-4 mr-2" />
              Good
            </Button>
            <Button
              variant="default"
              onClick={() => handleReview(ReviewQuality.EASY)}
              className="flex-1"
            >
              <Check className="w-4 h-4 mr-2" />
              Easy
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}
