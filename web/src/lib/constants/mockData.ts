import { Deck } from "@/types/card"
import { initializeCard } from "../anki/algorithm"

const now = new Date()

export const decks: Deck[] = [
  {
    id: "english-basics",
    name: "English Basics",
    description: "Basic English vocabulary for daily conversations",
    category: "Language Learning",
    tags: ["english", "beginner", "vocabulary"],
    author: "Remmy Team",
    version: "1.0.0",
    language: {
      from: "pt",
      to: "en"
    },
    createdAt: now,
    updatedAt: now,
    cards: [
      initializeCard({
        id: "1",
        front: "Hello",
        back: "Olá",
        notes: "Most common greeting",
        tags: ["greetings", "basic"],
      }),
      initializeCard({
        id: "2",
        front: "Good morning",
        back: "Bom dia",
        notes: "Used until noon",
        tags: ["greetings", "time"],
      }),
      initializeCard({
        id: "3",
        front: "How are you?",
        back: "Como você está?",
        notes: "Informal version",
        tags: ["greetings", "questions"],
      }),
      initializeCard({
        id: "4",
        front: "Thank you",
        back: "Obrigado(a)",
        notes: "Use 'obrigado' for male speakers, 'obrigada' for female speakers",
        tags: ["courtesy", "basic"],
      }),
      initializeCard({
        id: "5",
        front: "Goodbye",
        back: "Tchau / Adeus",
        notes: "'Tchau' is more informal, 'Adeus' is more formal",
        tags: ["greetings", "basic"],
      }),
    ],
  },
  {
    id: "english-intermediate",
    name: "English Intermediate",
    description: "Common phrases and expressions for intermediate learners",
    category: "Language Learning",
    tags: ["english", "intermediate", "phrases"],
    author: "Remmy Team",
    version: "1.0.0",
    language: {
      from: "pt",
      to: "en"
    },
    createdAt: now,
    updatedAt: now,
    cards: [
      initializeCard({
        id: "1",
        front: "I couldn't agree more",
        back: "Não poderia concordar mais",
        tags: ["expressions", "agreement"],
      }),
      initializeCard({
        id: "2",
        front: "That makes sense",
        back: "Isso faz sentido",
        tags: ["expressions", "agreement"],
      }),
      initializeCard({
        id: "3",
        front: "It's up to you",
        back: "É com você / Depende de você",
        tags: ["expressions", "decisions"],
      }),
      initializeCard({
        id: "4",
        front: "I'll think about it",
        back: "Vou pensar sobre isso",
        tags: ["expressions", "decisions"],
      }),
      initializeCard({
        id: "5",
        front: "Let me get back to you",
        back: "Deixa eu te responder depois",
        tags: ["expressions", "business"],
      }),
    ],
  },
  {
    id: "english-business",
    name: "Business English",
    description: "Professional vocabulary and expressions for the workplace",
    category: "Language Learning",
    tags: ["english", "business", "professional"],
    author: "Remmy Team",
    version: "1.0.0",
    language: {
      from: "pt",
      to: "en"
    },
    createdAt: now,
    updatedAt: now,
    cards: [
      initializeCard({
        id: "1",
        front: "Looking forward to",
        back: "Aguardando ansiosamente",
        tags: ["email", "formal"],
      }),
      initializeCard({
        id: "2",
        front: "As per our discussion",
        back: "Conforme nossa discussão",
        tags: ["email", "formal"],
      }),
      initializeCard({
        id: "3",
        front: "To follow up on",
        back: "Para dar continuidade a",
        tags: ["email", "formal"],
      }),
      initializeCard({
        id: "4",
        front: "I'm writing to inquire about",
        back: "Escrevo para perguntar sobre",
        tags: ["email", "formal"],
      }),
      initializeCard({
        id: "5",
        front: "Best regards",
        back: "Atenciosamente",
        tags: ["email", "formal"],
      }),
    ],
  },
]

export const findDeckById = (id: string): Deck | undefined => {
  return decks.find(deck => deck.id === id)
}
