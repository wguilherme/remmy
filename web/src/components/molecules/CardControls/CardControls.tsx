import { Button } from "@/components/atoms/Button/Button"
import { cn } from "@/lib/utils"
import { SkipForward } from "lucide-react"
import * as React from "react"

interface CardControlsProps extends React.HTMLAttributes<HTMLDivElement> {
  onReveal: () => void
  onSkip: () => void
  isRevealed: boolean
}

const CardControls = React.forwardRef<HTMLDivElement, CardControlsProps>(
  ({ className, onReveal, onSkip, isRevealed, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex gap-2 w-full justify-center", className)}
        {...props}
      >
        {!isRevealed && (
          <Button
            variant="outline"
            size="lg"
            onClick={onReveal}
            className="min-w-40"
          >
            Show Answer
          </Button>
        )}
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onSkip}
          title="Skip Card"
        >
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>
    )
  }
)
CardControls.displayName = "CardControls"

export { CardControls }
