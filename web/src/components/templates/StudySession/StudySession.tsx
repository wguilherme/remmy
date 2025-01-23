'use client'

import { Typography } from "@/components/atoms/Typography/Typography"
import { StudyProgress } from "@/components/molecules/StudyProgress/StudyProgress"
import { StudyCard } from "@/components/organisms/StudyCard/StudyCard"
import { useStudySession } from "@/hooks/useStudySession"
import { cn } from "@/lib/utils"
import { Deck } from "@/types/card"
import * as React from "react"

interface StudySessionProps extends React.HTMLAttributes<HTMLDivElement> {
  deck: Deck
}

const StudySession = React.forwardRef<HTMLDivElement, StudySessionProps>(
  ({ className, deck, ...props }, ref) => {
    const {
      currentCard,
      isRevealed,
      sessionStats,
      isSessionComplete,
      actions: { revealCard, answerCard, skipCard },
    } = useStudySession(deck)

    if (isSessionComplete) {
      return (
        <div className="flex flex-col items-center justify-center gap-6 min-h-[60vh]">
          <Typography variant="h2">Session Complete! 🎉</Typography>
          <Typography variant="subtle">
            You&apos;ve reviewed all cards for now. Great job!
          </Typography>
          <StudyProgress
            totalCards={sessionStats.totalCards}
            cardsStudied={sessionStats.cardsStudied}
            correctAnswers={sessionStats.correctAnswers}
            streak={sessionStats.streak}
          />
        </div>
      )
    }

    if (!currentCard) {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <Typography variant="h3">Loading...</Typography>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn("container mx-auto p-6 space-y-8", className)}
        {...props}
      >
        <div className="flex flex-col gap-2">
          <Typography variant="h2">{deck.name}</Typography>
          <Typography variant="subtle">{deck.description}</Typography>
        </div>

        <StudyProgress
          totalCards={sessionStats.totalCards}
          cardsStudied={sessionStats.cardsStudied}
          correctAnswers={sessionStats.correctAnswers}
          streak={sessionStats.streak}
        />

        <StudyCard
          card={currentCard}
          isRevealed={isRevealed}
          onReveal={revealCard}
          onAnswer={answerCard}
          onSkip={skipCard}
        />
      </div>
    )
  }
)
StudySession.displayName = "StudySession"

export { StudySession }
