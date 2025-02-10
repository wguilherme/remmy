'use client'

import { Card } from '@/components/atoms/Card'
import { Typography } from '@/components/atoms/Typography/Typography'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface FlashCardProps {
  front: string
  back: string
  notes?: string
  isRevealed: boolean
  onFlip: () => void
}

export function FlashCard({
  front,
  back,
  notes,
  isRevealed,
  onFlip,
}: FlashCardProps) {
  const [isFlipping, setIsFlipping] = useState(false)

  const handleFlip = () => {
    setIsFlipping(true)
    onFlip()
    setTimeout(() => setIsFlipping(false), 300)
  }

  return (
    <motion.div
      className={cn(
        'w-full max-w-2xl aspect-[3/2] cursor-pointer perspective-1000',
        isFlipping && 'pointer-events-none'
      )}
      onClick={handleFlip}
      animate={{ rotateY: isRevealed ? 180 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={cn(
          'relative w-full h-full p-8 preserve-3d backface-hidden',
          'flex flex-col items-center justify-center text-center gap-4'
        )}
      >
        <div
          className={cn(
            'absolute inset-0 p-8 flex flex-col items-center justify-center backface-hidden',
            !isRevealed && 'visible',
            isRevealed && 'invisible'
          )}
        >
          <Typography variant="h3">Question</Typography>
          <Typography className="mt-4">{front}</Typography>
        </div>

        <div
          className={cn(
            'absolute inset-0 p-8 flex flex-col items-center justify-center backface-hidden rotate-y-180',
            isRevealed && 'visible',
            !isRevealed && 'invisible'
          )}
        >
          <Typography variant="h3">Answer</Typography>
          <Typography className="mt-4">{back}</Typography>
          {notes && (
            <Typography variant="subtle" className="mt-4">
              {notes}
            </Typography>
          )}
        </div>
      </Card>
    </motion.div>
  )
}
