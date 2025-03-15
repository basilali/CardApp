import { Card } from './Card';

export class Deck {
    static SUITES = ["SPADES", "CLUBS", "HEARTS", "DIAMONDS"];
    static VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

    constructor() {
        this.cards = [];
        this.nextId = 1;
        this.initialize();
    }

    initialize() {
        this.cards = [];
        Deck.SUITES.forEach(suite => {
            Deck.VALUES.forEach(value => {
                this.cards.push(new Card(this.nextId++, suite, value));
            });
        });
        this.shuffle();
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
        return this.cards;
    }

    deal(count = 1) {
        if (count > this.cards.length) {
            return null;
        }
        const dealt = this.cards.splice(0, count);
        return dealt;
    }

    returnCards(cards) {
        this.cards.push(...cards);
        this.shuffle();
    }

    createWildcard() {
        const suite = Deck.SUITES[Math.floor(Math.random() * Deck.SUITES.length)];
        const value = Deck.VALUES[Math.floor(Math.random() * Deck.VALUES.length)];
        
        return new Card(this.nextId++, suite, value, 1);
    }

    isEmpty() {
        return this.cards.length === 0;
    }

    remainingCards() {
        return this.cards.length;
    }
} 