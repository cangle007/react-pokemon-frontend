import getDefaultPokemon from '../../api/getDefaultPokemon';

export default function getDefaultPokemonProcess() {
  return (dispatch, getState, socket) => {
    return getDefaultPokemon().then(defaultPokemon => {
      dispatch({
        type: 'FETCHED_DEFAULT_POKEMON',
        defaultPokemonArray: defaultPokemon
      });
      return defaultPokemon;
    });
  };
}
