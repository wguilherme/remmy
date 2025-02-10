'use client'

import { Button } from "@/components/atoms/Button/Button"
import { FlashCard } from "@/components/atoms/FlashCard"
import { Typography } from "@/components/atoms/Typography/Typography"
import { useDecks } from "@/components/providers/DeckProvider"
import { processReview } from "@/lib/anki/algorithm"
import { ReviewQuality } from "@remmy/domain"
import { ArrowLeft, Check, ThumbsDown, ThumbsUp, X } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

export default function StudyPage() {
  const params = useParams()
  const router = useRouter()
  const { getDeckById, updateDeck } = useDecks()
  const [isRevealed, setIsRevealed] = useState(false)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)

  const deck = getDeckById(params.deckId as string)

  useEffect(() => {
    if (!deck) {
      router.push('/decks')
    }
  }, [deck, router])

  if (!deck) {
    return null
  }

  const currentCard = deck.cards[currentCardIndex]

  const handleReview = useCallback(
    (quality: ReviewQuality) => {
      if (!currentCard) return

      const now = new Date()
      const updatedCard = {
        ...currentCard,
        ...processReview(currentCard, quality),
        lastReview: now.toISOString(),
      }

      const updatedCards = [...deck.cards]
      updatedCards[currentCardIndex] = updatedCard

      updateDeck({
        ...deck,
        cards: updatedCards,
        lastStudied: now.toISOString(),
      })

      if (currentCardIndex < deck.cards.length - 1) {
        setCurrentCardIndex((prev) => prev + 1)
        setIsRevealed(false)
      } else {
        router.push(`/decks/${deck.id}`)
      }
    },
    [currentCard, currentCardIndex, deck, router, updateDeck]
  )

  if (!currentCard) {
    return (
      <main className="container mx-auto p-6 space-y-8">
        <Link href={`/decks/${deck.id}`}>
          <Button variant="ghost">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Deck
          </Button>
        </Link>

        <div className="text-center space-y-2">
          <Typography variant="h2">No cards to study</Typography>
          <Typography variant="subtle">
            This deck has no cards. Add some cards to start studying!
          </Typography>
        </div>
      </main>
    )
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
          notes={currentCard.notes}
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
