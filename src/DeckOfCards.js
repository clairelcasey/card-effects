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
 * - shouldDraw: true/false
 * 
 * 
 * App -> DeckOfCardsApp -> DeckOfCards -> Card
*/

function DeckOfCards({ deckId }) {

  const [cardsDrawn, setCardsDrawn] = useState([]);
  const [shouldDraw, setShouldDraw] = useState(false);
  const [shouldShuffle, setShouldShuffle] = useState(false);
  console.log('DeckOfCards top, state cardsDrawn:', cardsDrawn);

  function handleDraw() {
    setShouldDraw(true);
  }

  function handleShuffle() {
    setShouldShuffle(true);
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

  }, [shouldDraw, deckId]);


  useEffect(function shuffleDeck() {
    async function shuffle() {
      const cardResult = await axios.get(`${BASE_URL}${deckId}/shuffle`);
      console.log('effect draw(), cardResult:', cardResult);


    }

    if(shouldShuffle) shuffle();
  }, [shouldShuffle]);


  const cards = cardsDrawn.map( card => <Card key={card.code} card={card} />);

  return (
    <div className="DeckOfCards" >
      {(cardsDrawn.length < 52) && <button onClick={handleDraw}>Add a card!</button>}
      {cards}
    </div>
  )
}
export default DeckOfCards;
