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
    <div className="Card" >
      
      <img src={card.image} alt={card.code} />
    </div>
  )
}
export default Card;
