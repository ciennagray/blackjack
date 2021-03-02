import { FACE_CARD_VAL } from './constants.js';

export const isFaceCard = (cardValue) => {
  return (
    cardValue === 'ACE' 
    || cardValue === 'JACK' 
    || cardValue === 'QUEEN' 
    || cardValue === 'KING'
  );
}

export const getPoints = (cards, setPoints) => {
  let points = 0;
  cards.map(card => {
    points += isFaceCard(card.value) ? FACE_CARD_VAL : parseInt(card.value);
  });
  setPoints(points);
}