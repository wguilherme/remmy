import { Progress } from "@/components/atoms/Progress/Progress"
import { Typography } from "@/components/atoms/Typography/Typography"
import { cn } from "@/lib/utils"
import * as React from "react"

interface StudyProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  totalCards: number
  cardsStudied: number
  correctAnswers: number
  streak: number
}

const StudyProgress = React.forwardRef<HTMLDivElement, StudyProgressProps>(
  ({ className, totalCards, cardsStudied, correctAnswers, streak, ...props }, ref) => {
    const progress = Math.round((cardsStudied / totalCards) * 100)
    const accuracy = cardsStudied > 0 
      ? Math.round((correctAnswers / cardsStudied) * 100)
      : 0

    return (
      <div
        ref={ref}
        className={cn("space-y-4", className)}
        {...props}
      >
        <div className="flex justify-between items-center">
          <Typography variant="h4">Study Progress</Typography>
          <Typography variant="subtle">
            {cardsStudied} of {totalCards} cards
          </Typography>
        </div>
        
        <Progress value={progress} className="h-2" />
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-secondary/20 rounded-lg p-4">
            <Typography variant="subtle">Accuracy</Typography>
            <Typography variant="h3">{accuracy}%</Typography>
          </div>
          
          <div className="bg-secondary/20 rounded-lg p-4">
            <Typography variant="subtle">Current Streak</Typography>
            <Typography variant="h3">{streak}</Typography>
          </div>
        </div>
      </div>
    )
  }
)
StudyProgress.displayName = "StudyProgress"

export { StudyProgress }
