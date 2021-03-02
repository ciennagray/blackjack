export const drawNCardsWithDeckId = async (deckId, n) => {
  if (!deckId) {
    return [];
  }

  const response = await fetch(drawNCardsWithDeckIdEndpoint(deckId, n))
  return response;
}

export const drawNCardsWithDeckIdEndpoint = (deckId, count) => {
  return `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`
}