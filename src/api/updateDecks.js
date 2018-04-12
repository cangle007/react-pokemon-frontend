import env from '../env';

export default function updateUserDeck(deckObj, deckId, userId) {
  const storedToken = localStorage.getItem('token');
  return fetch(`${env.API_BASE_URL}/decks/${deckId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${storedToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(deckObj)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log('API call getUsers failed: ', err));
}
