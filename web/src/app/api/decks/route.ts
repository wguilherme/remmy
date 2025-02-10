import { NextResponse } from 'next/server'

const mockDecks = [
  {
    id: '1',
    name: 'JavaScript Basics',
    description: 'Learn the fundamentals of JavaScript programming',
    tags: ['programming', 'javascript', 'web'],
    cards: [
      {
        id: '1',
        front: 'What is JavaScript?',
        back: 'JavaScript is a programming language that enables interactive web pages',
        notes: 'Created by Brendan Eich in 1995',
        tags: ['basics'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        dueDate: new Date().toISOString(),
        lastReview: null,
        nextReview: null,
        easeFactor: 2.5,
        interval: 0,
        lapses: 0,
      },
    ],
    stats: {
      totalCards: 1,
      newCards: 1,
      cardsToReview: 0,
      masteredCards: 0,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastStudied: null,
  },
  {
    id: '2',
    name: 'React Hooks',
    description: 'Master React Hooks with practical examples',
    tags: ['programming', 'react', 'web'],
    cards: [
      {
        id: '2',
        front: 'What is useState?',
        back: 'useState is a Hook that lets you add React state to function components',
        notes: 'Introduced in React 16.8',
        tags: ['hooks'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        dueDate: new Date().toISOString(),
        lastReview: null,
        nextReview: null,
        easeFactor: 2.5,
        interval: 0,
        lapses: 0,
      },
    ],
    stats: {
      totalCards: 1,
      newCards: 1,
      cardsToReview: 0,
      masteredCards: 0,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastStudied: null,
  },
]

export async function GET() {
  try {
    return NextResponse.json(mockDecks)
  } catch (error) {
    console.error('Error loading decks:', error)
    return NextResponse.json(
      { error: 'Failed to load decks' },
      { status: 500 }
    )
  }
}
