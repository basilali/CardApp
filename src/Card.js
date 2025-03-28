import heartSvg from './assets/heart.svg';
import diamondSvg from './assets/diamond.svg';
import clubSvg from './assets/club.svg';
import spadeSvg from './assets/spade.svg';

export class Card {
    static TYPES = {
        ORIGINAL: 'ORIGINAL',
        WILDCARD: 'WILDCARD'
    };

    constructor(id, suite, value, type = Card.TYPES.ORIGINAL, status = "notSelected") {
        this.id = id;
        this.suite = suite;
        this.value = value;
        this.type = type;
        this.status = status;
    }

    toggleSelection() {
        this.status = this.status === "selected" ? "notSelected" : "selected";
        return this.status;
    }

    resetSelection() {
        this.status = "notSelected";
    }

    isSelected() {
        return this.status === "selected";
    }

    isWildcard() {
        return this.type === Card.TYPES.WILDCARD;
    }

    clone() {
        return new Card(this.id, this.suite, this.value, this.type, this.status);
    }

    getSuitSvg() {
        switch(this.suite) {
            case 'HEARTS':
                return heartSvg;
            case 'DIAMONDS':
                return diamondSvg;
            case 'CLUBS':
                return clubSvg;
            case 'SPADES':
                return spadeSvg;
            default:
                return null;
        }
    }
} 