import env from '../env';

export default function createUserDeck(
  deckName,
  wins,
  losses,
  pokemonIds,
  userId
) {
  const storedToken = localStorage.getItem('token');

  return fetch(`${env.API_BASE_URL}/users/${userId}/decks/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${storedToken}`
    },
    body: JSON.stringify({
      deckName,
      wins,
      losses,
      pokemonIds,
      userId
    })
    /*
    {
      name: 'some name',
      cards: '3,4,5'   // [3,4,5].join(',')
    }
    */
  })
    .then(response => {
      return response.json();
    })
    .then(newDeckObj => {
      return newDeckObj;
    })
    .catch(err => console.log('API call createDeck failed: ', err));
}
