export interface Card {
    id: string;
    front: string;
    back: string;
    notes?: string;
    tags?: string[];
    easeFactor: number;
    interval: number;
    dueDate: Date;
    lapses: number;
    lastReview?: Date;
    nextReview?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare enum ReviewQuality {
    BLACKOUT = 0,
    INCORRECT = 1,
    HARD = 2,
    GOOD = 3,
    EASY = 4,
    PERFECT = 5
}
