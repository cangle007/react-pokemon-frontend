export default function rootReducer(
  currentState = {
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
  },
  action
) {
  switch (action.type) {
    case 'CLEAR_ROOT_REDUCER':
      return {
        ...currentState,
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
      };

    case 'GET_BATTLE_STATE':
      console.log('GET_BATTLE_STATE----------', action.getBattleState);
      return { ...currentState, getBattleState: action.getBattleState };

    //why do we even need this? this should be updating GET_BATTLE_STATE
    // case 'SET_BATTLE_STATE':
    //   console.log('action++++++++++', action);
    //   return { ...currentState, setBattleState: action.battleStateObj };

    case 'CREATE_BATTLE':
      return { ...currentState, createBattleObj: action.createBattleObj };

    case 'REQUEST_BATTLE':
      return { ...currentState, requestBattleObj: action.requestBattleObj };

    case 'UPDATE_MESSAGES':
      //let combinedMessages = currentState.messages.concat(action.messages);

      let combinedMessages = action.messages;

      while (combinedMessages.length > 5) {
        combinedMessages.splice(0, 1);
      }
      return {
        ...currentState,
        messages: combinedMessages
      };

    case 'FETCHED_USERS':
      return { ...currentState, users: action.users };

    case 'USER_SIGNUP':
      return { ...currentState, userSignup: action.userSignup };

    case 'ERROR_HANDLING_MESSAGE':
      return { ...currentState, errorMessage: action.errorMessage };

    case 'USER_SIGNIN':
      return { ...currentState, userSignIn: action.userSignIn };

    case 'FETCHED_POKEMON_OBJ_LIST':
      return { ...currentState, pokemonArray: action.pokemonObjList };

    case 'FETCHED_DEFAULT_POKEMON':
      return {
        ...currentState,
        defaultPokemonArray: action.defaultPokemonArray
      };

    case 'FETCHED_USER_DECKS':
      return {
        ...currentState,
        userDecks: action.userDecks
      };

    case 'CREATE_USER_DECK':
      return {
        ...currentState,
        userDecks: [...currentState.userDecks, action.userDecks]
      };

    case 'DELETE_USER_DECK':
      let currentDecks = [...currentState.userDecks];
      let deleteDeck = currentDecks.filter(deckObj => {
        return deckObj.id !== Number(action.deckId);
      });
      return {
        ...currentState,
        userDecks: deleteDeck
      };

    case 'UPDATE_DECK':
      return { ...currentState, userDecks: action.userDecks };

    default:
      return currentState;
  }
}
