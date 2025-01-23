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
          onClick={() => onAnswer(1)}
          className="w-full bg-red-500 hover:bg-red-600 text-white"
        >
          <div className="flex items-center gap-1.5">
            <span className="font-medium">Again</span>
            <span className="text-sm opacity-90">(1)</span>
          </div>
        </Button>
        <Button
          onClick={() => onAnswer(2)}
          className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700"
        >
          <div className="flex items-center gap-1.5">
            <span className="font-medium">Hard</span>
            <span className="text-sm opacity-90">(2)</span>
          </div>
        </Button>
        <Button
          onClick={() => onAnswer(4)}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white"
        >
          <div className="flex items-center gap-1.5">
            <span className="font-medium">Good</span>
            <span className="text-sm opacity-90">(3)</span>
          </div>
        </Button>
        <Button
          onClick={() => onAnswer(5)}
          className="w-full bg-green-500 hover:bg-green-600 text-white"
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
