import "./Card.css"
/** Card
 * 
 * props:
 *  - card - {image, value, suit, code }
 *  
 * state: 
 *  none
 * 
 * App -> DeckOfCardsApp -> DeckOfCards -> Card
*/

function Card({ card }) {
  return (
    <div className="card" >
      <img src={card.image} />
    </div>
  )
}
export default Card;
