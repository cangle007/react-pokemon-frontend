import env from '../env';

export default function getRegisteredUsersObj() {
  return fetch(`${env.API_BASE_URL}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(err => console.log('API call getUsers failed: ', err));
}
