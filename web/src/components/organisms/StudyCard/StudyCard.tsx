'use client'

import { FlashCard } from "@/components/atoms/Card/FlashCard"
import { CardActions } from "@/components/molecules/CardActions/CardActions"
import { CardControls } from "@/components/molecules/CardControls/CardControls"
import { cn } from "@/lib/utils"
import { Card, ReviewQuality } from "@/types/card"
import * as React from "react"

interface StudyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  card: Card
  isRevealed: boolean
  onReveal: () => void
  onAnswer: (quality: ReviewQuality) => void
  onSkip: () => void
}

const StudyCard = React.forwardRef<HTMLDivElement, StudyCardProps>(
  ({ className, card, isRevealed, onReveal, onAnswer, onSkip, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-center gap-6 w-full max-w-4xl mx-auto", className)}
        {...props}
      >
        <FlashCard
          front={card.front}
          back={card.back}
          isRevealed={isRevealed}
          onFlip={!isRevealed ? onReveal : undefined}
          className="w-full"
        />

        <div className="flex flex-col gap-4 w-full">
          <CardControls
            isRevealed={isRevealed}
            onReveal={onReveal}
            onSkip={onSkip}
          />

          <CardActions
            isRevealed={isRevealed}
            onAnswer={onAnswer}
          />
        </div>
      </div>
    )
  }
)
StudyCard.displayName = "StudyCard"

export { StudyCard }
