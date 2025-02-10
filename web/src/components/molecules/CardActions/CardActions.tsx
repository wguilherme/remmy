'use client'

import { Button } from "@/components/atoms/Button/Button"
import { ReviewQuality } from "@/types/card"
import { cn } from "@/lib/utils"
import * as React from "react"

interface CardActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  isRevealed: boolean
  onAnswer: (quality: ReviewQuality) => void
}

const CardActions = React.forwardRef<HTMLDivElement, CardActionsProps>(
  ({ className, isRevealed, onAnswer, ...props }, ref) => {
    if (!isRevealed) return null

    return (
      <div
        ref={ref}
        className={cn("grid grid-cols-1 sm:grid-cols-4 gap-2 sm:max-w-2xl sm:mx-auto", className)}
        {...props}
      >
        <Button
          variant="danger"
          onClick={() => onAnswer(1)}
          className="w-full"
        >
          <div className="flex items-center gap-1.5">
            <span className="font-medium">Again</span>
            <span className="text-sm opacity-90">(1)</span>
          </div>
        </Button>
        <Button
          variant="secondary"
          onClick={() => onAnswer(2)}
          className="w-full"
        >
          <div className="flex items-center gap-1.5">
            <span className="font-medium">Hard</span>
            <span className="text-sm opacity-90">(2)</span>
          </div>
        </Button>
        <Button
          variant="primary"
          onClick={() => onAnswer(4)}
          className="w-full"
        >
          <div className="flex items-center gap-1.5">
            <span className="font-medium">Good</span>
            <span className="text-sm opacity-90">(3)</span>
          </div>
        </Button>
        <Button
          variant="success"
          onClick={() => onAnswer(5)}
          className="w-full"
        >
          <div className="flex items-center gap-1.5">
            <span className="font-medium">Easy</span>
            <span className="text-sm opacity-90">(4)</span>
          </div>
        </Button>
      </div>
    )
  }
)
CardActions.displayName = "CardActions"

export { CardActions }
