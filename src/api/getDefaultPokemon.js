import env from '../env';

export default function getDefaultPokemon() {
  return fetch(`${env.API_BASE_URL}/characters`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(err => console.log('API call createDeck failed: ', err));
}
