import env from '../env';

export default function getBattleState() {
  const storedToken = localStorage.getItem('token');
  const battleId = Number(localStorage.getItem('currentBattleId'));

  return fetch(`${env.API_BASE_URL}/battle/${battleId}/state`, {
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
    .catch(err => console.log('API call getBattleState failed:', err));
}
