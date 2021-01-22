import DeckOfCards from './DeckOfCards';
import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = "https://deckofcardsapi.com/api/deck/";

/** DeckOfCards App
 * 
 * State:
 *  - deck ID - passed to DeckOfCards as prop
 *  - isLoading - true/false
 * 
 * Props:
 *  - none
 * 
 * App -> DeckOfCardsApp -> DeckOfCards -> Card
 */

function DeckOfCardsApp() {
  const [deckId, setDeckId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  console.log('DeckOfCardsApp top, deckId state:', deckId, 'isLoading state:', isLoading);

  useEffect(function fetchNewDeckIdWhenMounted() {
    async function fetchDeckId() {
      const deckResult = await axios.get(`${BASE_URL}new/`);
      const newDeckId = deckResult.data.deck_id;
      setDeckId(newDeckId);
      setIsLoading(false);
    }
    fetchDeckId();
  }, []);

  if (isLoading) return <i>Loading...</i>;

  return (
    <div className="DeckOfCardsApp">
      <DeckOfCards deckId={deckId} />
    </div>
  )
}

export default DeckOfCardsApp;
export {BASE_URL};