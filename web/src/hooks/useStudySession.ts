'use client'
import {
  getDueCards,
  sortCardsByPriority,
  updateCardStats
} from '@/lib/anki/algorithm'
import { Card, Deck, ReviewQuality } from '@/types/card'
import { useCallback, useState } from 'react'

interface StudySessionState {
  currentCard: Card | null
  remainingCards: Card[]
  studiedCards: Card[]
  sessionStats: {
    totalCards: number
    cardsStudied: number
    correctAnswers: number
    streak: number
  }
}

export function useStudySession(deck: Deck) {
  const [isRevealed, setIsRevealed] = useState(false)
  const [state, setState] = useState<StudySessionState>(() => {
    const dueCards = getDueCards(deck.cards)
    const sortedCards = sortCardsByPriority(dueCards)
    
    return {
      currentCard: sortedCards[0] || null,
      remainingCards: sortedCards.slice(1),
      studiedCards: [],
      sessionStats: {
        totalCards: dueCards.length,
        cardsStudied: 0,
        correctAnswers: 0,
        streak: 0
      }
    }
  })

  const revealCard = useCallback(() => {
    setIsRevealed(true)
  }, [])

  const answerCard = useCallback((quality: ReviewQuality) => {
    if (!state.currentCard) return

    // Update current card with new intervals and stats
    const updatedCard = {
      ...state.currentCard,
      ...updateCardStats(state.currentCard, quality)
    }

    // Update session stats
    const isCorrect = quality >= 3
    const newStats = {
      ...state.sessionStats,
      cardsStudied: state.sessionStats.cardsStudied + 1,
      correctAnswers: state.sessionStats.correctAnswers + (isCorrect ? 1 : 0),
      streak: isCorrect ? state.sessionStats.streak + 1 : 0
    }

    // Move to next card
    setState(prev => ({
      currentCard: prev.remainingCards[0] || null,
      remainingCards: prev.remainingCards.slice(1),
      studiedCards: [...prev.studiedCards, updatedCard],
      sessionStats: newStats
    }))

    setIsRevealed(false)
  }, [state.currentCard, state.sessionStats])

  const skipCard = useCallback(() => {
    if (!state.currentCard) return

    setState(prev => ({
      ...prev,
      currentCard: prev.remainingCards[0] || null,
      remainingCards: [...prev.remainingCards.slice(1), prev.currentCard!]
    }))

    setIsRevealed(false)
  }, [state.currentCard])

  const isSessionComplete = !state.currentCard && state.remainingCards.length === 0

  return {
    currentCard: state.currentCard,
    isRevealed,
    sessionStats: state.sessionStats,
    isSessionComplete,
    actions: {
      revealCard,
      answerCard,
      skipCard
    }
  }
}
