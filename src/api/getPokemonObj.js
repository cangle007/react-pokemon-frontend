export default function getPokemon(pokemonId) {
  //var Pokedex = require('pokeapi-js-wrapper');
  var Pokedex = require('../pokeapi-js-wrapper');
  let options = {
    protocol: 'https',
    cache: true
  };
  var P = new Pokedex.Pokedex(options);
  return P.getPokemonByName(pokemonId) // with Promise
    .then(response => {
      return response;
    })
    .catch(err => console.log('API call getPokemonObj failed: ', err));
}
