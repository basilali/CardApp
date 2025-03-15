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
            </div>
        </div>
    );
} 