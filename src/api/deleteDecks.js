import env from '../env';

export default function deleteUserDeck(deckId) {
  const storedToken = localStorage.getItem('token');

  return fetch(`${env.API_BASE_URL}/decks/${deckId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${storedToken}`
    }
  })
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => console.log('API call deleteDeck failed:', err));
}
