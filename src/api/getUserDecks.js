/**how localstorage.getItem work is that we set it with localStorage.setItem().
Look at SiginInProcess file **/
import env from '../env';

export default function getUserDecks() {
  const storedUserId = localStorage.getItem('userId');
  const storedToken = localStorage.getItem('token');
  return fetch(`${env.API_BASE_URL}/users/${storedUserId}/decks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${storedToken}`
    }
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(err => console.log('API call getUserDecks failed:', err));
}
