'use client'

import { Button } from '@/components/atoms/Button'
import { Card } from '@/components/atoms/Card'
import { FlashCard } from '@/components/atoms/FlashCard'
import { useDecks } from '@/components/providers/DeckProvider'
import { processReview } from '@/lib/anki/algorithm'
import { Card as CardType, ReviewQuality } from '@remmy/domain'
import { useCallback, useEffect, useMemo, useState } from 'react'

export default function StudyPage({
  params,
}: {
  params: { deckId: string }
}) {
  const { decks, updateDeck } = useDecks()
  const [isRevealed, setIsRevealed] = useState(false)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)

  const deck = useMemo(
    () => decks.find((deck) => deck.id === params.deckId),
    [decks, params.deckId]
  )

  const cards = useMemo(() => {
    if (!deck) return []
    return deck.cards
      .filter((card) => {
        if (!card.nextReview) return true
        return new Date(card.nextReview) <= new Date()
      })
      .sort((a, b) => {
        if (!a.nextReview) return -1
        if (!b.nextReview) return 1
        return (
          new Date(a.nextReview).getTime() - new Date(b.nextReview).getTime()
        )
      })
  }, [deck])

  const currentCard = useMemo(
    () => cards[currentCardIndex],
    [cards, currentCardIndex]
  )

  const handleReview = useCallback(
    (quality: ReviewQuality) => {
      if (!deck || !currentCard) return

      const now = new Date().toISOString()
      const review = processReview(currentCard, quality)

      const updatedCard: CardType = {
        ...currentCard,
        ...review,
        lastReview: now,
      }

      const updatedDeck = {
        ...deck,
        cards: deck.cards.map((card) =>
          card.id === currentCard.id ? updatedCard : card
        ),
        lastStudied: now,
      }

      updateDeck(updatedDeck)
      setCurrentCardIndex((index) => index + 1)
      setIsRevealed(false)
    },
    [currentCard, deck, updateDeck]
  )

  useEffect(() => {
    if (!deck) {
      // TODO: handle deck not found
      return
    }
  }, [deck])

  if (!deck || !currentCard) {
    return (
      <div className="container mx-auto flex h-[calc(100vh-4rem)] items-center justify-center p-4">
        <Card className="flex flex-col items-center justify-center gap-4 p-8 text-center">
          <div className="space-y-1">
            <h3 className="font-semibold">No cards to review</h3>
            <p className="text-sm text-muted-foreground">
              All cards have been reviewed. Come back later!
            </p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto flex h-[calc(100vh-4rem)] flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{deck.name}</h1>
          <p className="text-sm text-muted-foreground">
            Card {currentCardIndex + 1} of {cards.length}
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <FlashCard
          front={currentCard.front}
          back={currentCard.back}
          isRevealed={isRevealed}
          onReveal={() => setIsRevealed(true)}
        />
      </div>

      {isRevealed && (
        <div className="grid grid-cols-4 gap-2">
          <Button
            variant="destructive"
            onClick={() => handleReview(ReviewQuality.BLACKOUT)}
          >
            Again
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleReview(ReviewQuality.HARD)}
          >
            Hard
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleReview(ReviewQuality.GOOD)}
          >
            Good
          </Button>
          <Button
            variant="default"
            onClick={() => handleReview(ReviewQuality.EASY)}
          >
            Easy
          </Button>
        </div>
      )}
    </div>
  )
}
