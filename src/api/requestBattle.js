// import env from '../env';
//
// export default function requestBattle(battleId) {
//   const storedToken = localStorage.getItem('token');
//   const userId = localStorage.getItem('userId');
//
//   return fetch(`${env.API_BASE_URL}/battle`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${storedToken}`
//     },
//     body: JSON.stringify({ userTwoId: userId })
//   })
//     .then(response => {
//       return response.json();
//     })
//     .then(data => {
//       return data;
//     })
//     .catch(err => console.log('API call requestBattle failed:', err));
// }
