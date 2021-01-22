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
 * 
 * App -> DeckOfCardsApp -> DeckOfCards -> Card
*/

function DeckOfCards({ deckId }) {
  const [cardsDrawn, setCardsDrawn] = useState([]);
  const [shouldDraw, setShouldDraw] = useState(false);
  console.log('DeckOfCards top, state cardsDrawn:', cardsDrawn);

  function handleClick() {
    setShouldDraw(true);
  }

  useEffect(function drawNewCard() {

    async function draw() {
      const cardResult = await axios.get(`${BASE_URL}${deckId}/draw/?count=1`);
      console.log('effect draw(), cardResult:', cardResult);

      const newCard = cardResult.data.cards[0];
      setCardsDrawn(cardsDrawn => [...cardsDrawn, newCard]);
      setShouldDraw(false);
    }

    if(shouldDraw) draw();

  }, [shouldDraw]);

  const cards = cardsDrawn.map( card => <Card key={card.code} card={card} />);

  return (
    <div className="DeckOfCards" >
      {(cardsDrawn.length < 52) && <button onClick={handleClick}>Add a card!</button>}
      {cards}
    </div>
  )
}
export default DeckOfCards;
