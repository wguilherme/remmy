import { Button } from "@/components/atoms/Button/Button"
import { cn } from "@/lib/utils"
import { ReviewQuality } from "@/types/card"
import * as React from "react"

interface CardActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  onAnswer: (quality: ReviewQuality) => void
  isRevealed: boolean
}

const CardActions = React.forwardRef<HTMLDivElement, CardActionsProps>(
  ({ className, onAnswer, isRevealed, ...props }, ref) => {
    if (!isRevealed) return null

    return (
      <div
        ref={ref}
        className={cn("flex gap-2 w-full justify-center", className)}
        {...props}
      >
        <Button
          variant="destructive"
          size="lg"
          onClick={() => onAnswer(1)}
          className="flex-1 max-w-32"
        >
          Again
        </Button>
        <Button
          variant="warning"
          size="lg"
          onClick={() => onAnswer(2)}
          className="flex-1 max-w-32"
        >
          Hard
        </Button>
        <Button
          variant="success"
          size="lg"
          onClick={() => onAnswer(4)}
          className="flex-1 max-w-32"
        >
          Good
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => onAnswer(5)}
          className="flex-1 max-w-32"
        >
          Easy
        </Button>
      </div>
    )
  }
)
CardActions.displayName = "CardActions"

export { CardActions }
