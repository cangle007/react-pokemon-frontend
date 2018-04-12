import getPokemonObj from '../../api/getPokemonObj';
import getDefaultPokemon from '../../api/getDefaultPokemon';

export default function getPokemonObjProcess() {
  return (dispatch, getState, socket) => {
    const scope = {};

    return getDefaultPokemon()
      .then(defaultList => {
        scope.defaultPokemon = defaultList;
        const promises = [];

        defaultList.forEach(pokeObj => {
          promises.push(getPokemonObj(pokeObj.pokemonId));
        });

        return Promise.all(promises);
      })
      .then(pokemonObjList => {
        scope.pokemonObjList = [];
        scope.defaultPokemon.forEach(defaultPokemonObj => {
          pokemonObjList.forEach(pokemonObj => {
            if (defaultPokemonObj.pokemonId === pokemonObj.id) {
              pokemonObj.characterId = defaultPokemonObj.id;
              scope.pokemonObjList.push(pokemonObj);
            }
          });
        });
        dispatch({
          type: 'FETCHED_POKEMON_OBJ_LIST',
          pokemonObjList: scope.pokemonObjList
        });
      });
  };
}
