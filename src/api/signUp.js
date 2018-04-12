import env from '../env';

export default function signUp(attribute) {
  return fetch(`${env.API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(attribute)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log('API call signUp failed: ', err));
}
