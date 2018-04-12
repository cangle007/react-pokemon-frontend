export default function clearRootReducerProcess() {
  return (dispatch, getState, socket) => {
    dispatch({
      type: 'CLEAR_ROOT_REDUCER',
      createBattleObj: {},
      defaultPokemonArray: [],
      errorMessage: null,
      messages: [],
      getBattleState: {},
      pokemonArray: [],
      requestBattleObj: {},
      setBattleState: {},
      userDecks: [],
      userSignup: {},
      userSignIn: {},
      users: []
    });
  };
}
