import { Deck } from '@/types/card'

export const englishDeck: Deck = {
  id: 'english-ptbr-1',
  name: 'English to Portuguese',
  description: 'Basic English vocabulary for daily conversations',
  createdAt: new Date(),
  updatedAt: new Date(),
  cards: [
    {
      id: '1',
      front: 'Hello',
      back: 'Olá',
    },
    {
      id: '2',
      front: 'Good morning',
      back: 'Bom dia',
    },
    {
      id: '3',
      front: 'How are you?',
      back: 'Como você está?',
    },
    {
      id: '4',
      front: 'Thank you',
      back: 'Obrigado(a)',
    },
    {
      id: '5',
      front: 'Goodbye',
      back: 'Tchau / Adeus',
    },
    {
      id: '6',
      front: 'Please',
      back: 'Por favor',
    },
    {
      id: '7',
      front: 'You\'re welcome',
      back: 'De nada',
    },
    {
      id: '8',
      front: 'Nice to meet you',
      back: 'Prazer em conhecê-lo(a)',
    },
    {
      id: '9',
      front: 'See you later',
      back: 'Até mais tarde',
    },
    {
      id: '10',
      front: 'Have a nice day',
      back: 'Tenha um bom dia',
    }
  ]
}
