import Card from './Card';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from './DeckOfCardsApp';

/** DeckOfCards
 * 
 * props:
 *  - deckId - string with unique deck Id
 *  
 * 
 * state: 
 *  - cardsDrawn: array of cards that have been drawn 
 *  [ {image, value, suit, code }, ... ]
 *  - numOfCards - number of cards drawn
*/

function DeckOfCards({ deckId }) {
  const [cardsDrawn, setCardsDrawn] = useState([]);
  const [drawingCard, setDrawingCard] = useState(false);
  console.log('DeckOfCards top, state cardsDrawn:', cardsDrawn);

  function handleClick() {
    setDrawingCard(!drawingCard);
  }

  useEffect(function drawNewCard() {
    if (numOfCards < 1 || numOfCards > 52) return;
    async function draw() {
      const cardResult = await axios.get(`${BASE_URL}${deckId}/draw/?count=1`);
      console.log('effect draw(), cardResult:', cardResult);

      const newCard = cardResult.data.cards;
      setCardsDrawn(cards => [...cardsDrawn, newCard]);
    }
  }, [drawingCard]);

  const cards = cardsDrawn.map( card => <Card card={card} />);

  return (
    <div className="DeckOfCards" >
      {cards}
      {(cardsDrawn.length < 52) && <button onClick={handleClick}>Add a card!</button>}

    </div>
  )
}
export default DeckOfCards;
