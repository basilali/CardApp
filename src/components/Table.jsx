import { useState } from 'react';
import { Deck } from '../Deck';
import { CardView } from './Card';

export function Table() {
    const [deckInstance] = useState(new Deck());
    const [inPlay, setInPlay] = useState([]);

    function reset() {
        if (inPlay.length > 0) {
            deckInstance.returnCards(inPlay);
            setInPlay([]);
        }
    }

    function deal(count = 1) {
        if (count > 1) {
            reset();
        }
        const cards = deckInstance.deal(count);
        if (cards) {
            if (count === 1) {
                setInPlay(prevCards => [...prevCards, cards[0]]);
            } else {
                setInPlay(cards);
            }
        }
    }

    function wildcard() {
        const card = deckInstance.createWildcard();
        setInPlay(prevCards => [...prevCards, card]);
    }

    function clickCard(id) {
        setInPlay(prevCards => {
            const newCards = prevCards.map(card => {
                if (card.id === id) {
                    const newCard = card.clone();
                    newCard.toggleSelection();
                    return newCard;
                }
                return card;
            });

            const selectedCount = newCards.filter(card => card.isSelected()).length;
            if (selectedCount === 2) {
                setTimeout(() => swapCards(), 500);
            }

            return newCards;
        });
    }

    function swapCards() {
        setInPlay(prevCards => {
            const newCards = prevCards.map(card => card.clone());
            let i1 = null;
            let i2 = null;

            for (let i = 0; i < newCards.length; i++) {
                if (newCards[i].isSelected()) {
                    if (i1 === null) {
                        i1 = i;
                    } else if (i2 === null) {
                        i2 = i;
                        break;
                    }
                }
            }

            if (i1 !== null && i2 !== null) {
                const temp = newCards[i1].clone();
                newCards[i1] = newCards[i2].clone();
                newCards[i2] = temp;

                newCards[i1].resetSelection();
                newCards[i2].resetSelection();
            }

            return newCards;
        });
    }

    function toss() {
        setInPlay(prevCards => {
            const selectedCard = prevCards.find(card => card.isSelected());
            if (selectedCard) {
                return prevCards.filter(card => card.id !== selectedCard.id);
            }
            return prevCards;
        });
    }

    function shuffle() {
        setInPlay(prevCards => {
            const newCards = [...prevCards];
            for (let i = newCards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
            }
            newCards.forEach(card => card.resetSelection());
            return newCards;
        });
    }

    return (
        <div className="table">
            <h1 className="title">Card Manipulation</h1>
            <div className="topRow">
                <div className="deckSpot">
                    {deckInstance.cards.length === 0 ? 
                        <div className="emptyDeck">Deck empty</div> :
                        <div className="deck" onClick={() => deal()}>DECK</div>
                    }
                </div>
                <div className="playArea">
                    {inPlay.map((card) =>
                        <CardView
                            key={card.id}
                            status={card.status}
                            id={card.id}
                            value={card.value}
                            suite={card.suite}
                            clickCard={() => clickCard(card.id)}
                            type={card.type}
                            suitSvg={card.getSuitSvg()}
                        />
                    )}
                </div>
            </div>
            <div className="bottomRow">
                <div className="button-container">
                    <div className="buttonRow">
                        <button onClick={() => deal(5)}>DEAL 5</button>
                        <button onClick={() => deal(7)}>DEAL 7</button>
                        <button onClick={() => reset()}>RESET</button>
                    </div>
                    <div className="buttonRow">
                        <button onClick={() => toss()}>TOSS</button>
                        <button onClick={() => shuffle()}>SHUFFLE</button>
                        <button onClick={() => wildcard()}>WILDCARD</button>
                    </div>
                </div>
            </div>
            <div className="button-descriptions">
                <div className="button-description">
                    <span className="button-name">DECK:</span>
                    <span>Click to deal one card at a time from the deck</span>
                </div>
                <div className="button-description">
                    <span className="button-name">DEAL 5:</span>
                    <span>Deals 5 new cards, clearing the current play area</span>
                </div>
                <div className="button-description">
                    <span className="button-name">DEAL 7:</span>
                    <span>Deals 7 new cards, clearing the current play area</span>
                </div>
                <div className="button-description">
                    <span className="button-name">RESET:</span>
                    <span>Returns all cards to the deck and shuffles them</span>
                </div>
                <div className="button-description">
                    <span className="button-name">TOSS:</span>
                    <span>Removes the selected card from play</span>
                </div>
                <div className="button-description">
                    <span className="button-name">SHUFFLE:</span>
                    <span>Randomly rearranges all cards in the play area</span>
                </div>
                <div className="button-description">
                    <span className="button-name">WILDCARD:</span>
                    <span>Adds a special wildcard to the play area</span>
                </div>
                <a href="https://github.com/basilali/CardApp" target="_blank" rel="noopener noreferrer" className="github-link">
                <svg xmlns="http://www.w3.org/2000/svg" class="github-icon" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.486 2 12.018c0 4.428 2.865 8.186 6.839 9.525.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.003.07 1.531 1.033 1.531 1.033.892 1.53 2.341 1.088 2.91.833.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.092.39-1.986 1.03-2.686-.103-.253-.447-1.27.098-2.645 0 0 .84-.269 2.75 1.026a9.564 9.564 0 012.5-.336 9.56 9.56 0 012.5.336c1.909-1.295 2.747-1.026 2.747-1.026.546 1.375.202 2.392.1 2.645.64.7 1.028 1.594 1.028 2.686 0 3.847-2.337 4.695-4.565 4.942.36.311.678.924.678 1.861 0 1.343-.012 2.426-.012 2.757 0 .268.18.579.688.48C19.138 20.2 22 16.444 22 12.018 22 6.486 17.523 2 12 2z" clip-rule="evenodd"></path></svg>
                </a>
            </div>
        </div>
    );
} 