'use client'

import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import * as React from "react"

export interface FlashCardProps extends React.HTMLAttributes<HTMLDivElement> {
  front: React.ReactNode
  back: React.ReactNode
  isRevealed: boolean
  onFlip?: () => void
}

const FlashCard = React.forwardRef<HTMLDivElement, FlashCardProps>(
  ({ className, front, back, isRevealed, onFlip, ...props }, ref) => {
    return (
      <div
        className={cn(
          "relative perspective-1000 w-full max-w-2xl aspect-[4/3] cursor-pointer",
          className
        )}
        onClick={onFlip}
        ref={ref}
        {...props}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={isRevealed ? "back" : "front"}
            initial={{ rotateY: isRevealed ? -180 : 0, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: isRevealed ? 0 : 180, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 backface-hidden"
          >
            <div className="h-full w-full rounded-xl border bg-card p-6 text-card-foreground shadow-lg">
              <div className="flex h-full items-center justify-center text-center text-2xl">
                {isRevealed ? back : front}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    )
  }
)
FlashCard.displayName = "FlashCard"

export { FlashCard }
