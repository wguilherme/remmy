import { Card } from './card.interface';
export interface Deck {
    id: string;
    name: string;
    description: string;
    category?: string;
    tags?: string[];
    language?: {
        from: string;
        to: string;
    };
    cards: Card[];
    stats: DeckStats;
    createdAt: Date;
    updatedAt: Date;
    lastStudied?: Date;
}
export interface DeckStats {
    totalCards: number;
    newCards: number;
    cardsToReview: number;
    masteredCards: number;
}
export type DeckExport = Omit<Deck, 'id' | 'createdAt' | 'updatedAt' | 'stats'>;
