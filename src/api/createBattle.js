import env from '../env';

export default function createBattle() {
  const storedToken = localStorage.getItem('token');

  return fetch(`${env.API_BASE_URL}/battle`, {
    method: 'POST',
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
    .catch(err => console.log('API call createBattle failed: ', err));
}
