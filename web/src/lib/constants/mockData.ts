import { Deck } from "@/types/card"

export const decks: Deck[] = [
  {
    id: "english-basics",
    name: "English Basics",
    description: "Basic English vocabulary for daily conversations",
    createdAt: new Date(),
    updatedAt: new Date(),
    cards: [
      { id: "1", front: "Hello", back: "Olá" },
      { id: "2", front: "Good morning", back: "Bom dia" },
      { id: "3", front: "How are you?", back: "Como você está?" },
      { id: "4", front: "Thank you", back: "Obrigado(a)" },
      { id: "5", front: "Goodbye", back: "Tchau / Adeus" },
    ],
  },
  {
    id: "english-intermediate",
    name: "English Intermediate",
    description: "Common phrases and expressions for intermediate learners",
    createdAt: new Date(),
    updatedAt: new Date(),
    cards: [
      { id: "1", front: "I couldn't agree more", back: "Não poderia concordar mais" },
      { id: "2", front: "That makes sense", back: "Isso faz sentido" },
      { id: "3", front: "It's up to you", back: "É com você / Depende de você" },
      { id: "4", front: "I'll think about it", back: "Vou pensar sobre isso" },
      { id: "5", front: "Let me get back to you", back: "Deixa eu te responder depois" },
    ],
  },
  {
    id: "english-business",
    name: "Business English",
    description: "Professional vocabulary and expressions for the workplace",
    createdAt: new Date(),
    updatedAt: new Date(),
    cards: [
      { id: "1", front: "Looking forward to", back: "Aguardando ansiosamente" },
      { id: "2", front: "As per our discussion", back: "Conforme nossa discussão" },
      { id: "3", front: "To follow up on", back: "Para dar continuidade a" },
      { id: "4", front: "I'm writing to inquire about", back: "Escrevo para perguntar sobre" },
      { id: "5", front: "Best regards", back: "Atenciosamente" },
    ],
  },
]

export const findDeckById = (id: string): Deck | undefined => {
  return decks.find(deck => deck.id === id)
}
