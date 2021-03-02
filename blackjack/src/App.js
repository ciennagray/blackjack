import './App.css';
import Hand from './components/player/hand.js'
import { drawNCardsWithDeckId } from './api/cards.js'
import { getPoints } from './util/card/cardUtils';
import { SHUFFLED_DECK_ENDPOINT } from './api/constants.js'
import { useEffect, useState } from 'react';

const LOSE = -1;
const WIN = 1;
const NOT_COMPLETE = 0;

function App() {
  const [shuffledDeck, setShuffledDeck] = useState(null);
  const [houseCards, setHouseCards] = useState(null);
  const [housePoints, setHousePoints] = useState(0);
  const [playerCards, setPlayerCards] = useState(null);
  const [playerPoints, setPlayerPoints] = useState(0);
  const [gameOver, setGameOver] = useState(0);

  useEffect(async () => {
    if (!!shuffledDeck) {
      return;
    }

    await fetch(SHUFFLED_DECK_ENDPOINT)
      .then(response => response.json())
      .then(data => setShuffledDeck(data));
  }, [])

  useEffect(async () => {
    if (!!shuffledDeck) {
      drawNCardsWithDeckId(shuffledDeck.deck_id, 2)
        .then(response => response.json())
        .then(data => setHouseCards(data.cards));

      drawNCardsWithDeckId(shuffledDeck.deck_id, 2)
        .then(response => response.json())
        .then(data => { setPlayerCards(data.cards) });
    }
  }, [shuffledDeck])

  useEffect(() => {
    if (!houseCards) {
      return;
    }

    getPoints(houseCards, setHousePoints);
  }, [houseCards])

  useEffect(() => {
    if (!playerCards) {
      return;
    }

    getPoints(playerCards, setPlayerPoints);
  }, [playerCards])

  useEffect(() => {
    if (playerPoints > 20) {
      setGameOver(playerPoints === 21 && housePoints != 21 ? WIN : LOSE);
    }

  }, [playerPoints])

  const handleHitMeClick = async () => {
    await drawNCardsWithDeckId(shuffledDeck.deck_id, 1)
      .then(response => response.json())
      .then(data => {
        setPlayerCards(playerCards.concat(data.cards))
      })
  }

  const handleEndRoundClick = () => {
    if (housePoints > 21 || housePoints < playerPoints) {
      setGameOver(WIN);
    } else {
      setGameOver(LOSE);
    }
  }

  return (
    <div className='App' key='main-app'>
      {
        gameOver === LOSE &&
        <div>
          <h1>YOU LOSE!!! ://</h1>
        </div>

      }
      {
        gameOver === WIN &&
        <h1>YOU WON!!!</h1>
      }
      <div>
        <div className='table' key='table'>
          <Hand
            key='house-player'
            playerName={'house'}
            playerCards={houseCards}
            playerPoints={housePoints}
          />

          <Hand
            key='player-1'
            playerName={'player-1'}
            playerCards={playerCards}
            playerPoints={playerPoints}
          />
        </div>
        {
          gameOver === NOT_COMPLETE &&
          <div>
            <button
              className='hit-me-button'
              key='hit-me'
              onClick={handleHitMeClick}
            >HIT ME</button>
            <button
              className='end-button'
              key='end-game'
              onClick={handleEndRoundClick}
            >END ROUND</button>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
