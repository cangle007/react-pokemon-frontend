export default function getPokemonMove(moveName) {
  var Pokedex = require('../pokeapi-js-wrapper');
  let options = {
    protocol: 'https',
    cache: true
  };
  var P = new Pokedex.Pokedex(options);
  return P.getMoveByName(moveName) // with Promise
    .then(response => {
      console.log('resp8****************', response);
      return response;
    })
    .catch(err => console.log('API call getPokemonMoves failed: ', err));
}
