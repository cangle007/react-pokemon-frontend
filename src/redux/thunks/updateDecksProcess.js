import updateDecks from '../../api/updateDecks';
import getPokemonObj from '../../api/getPokemonObj';

export default function updateUserDeckProcess(deckObj, deckId, userId) {
  return (dispatch, getState, socket) => {
    let scope = {}; //to manage new data structure

    return updateDecks(deckObj, deckId, userId)
      .then(decks => {
        scope.userDecks = decks; //create new property to scope
        const promises = [];

        let newUserDeck = decks.map(userDecks => {
          userDecks.cards = userDecks.cards.split(',').map(ids => {
            return Number(ids);
          });
          return userDecks;
        });

        newUserDeck.forEach(userDeck => {
          const ids = userDeck.cards;
          userDeck.cards = ids;
          ids.forEach(id => {
            promises.push(getPokemonObj(id)); //insert pokemonId to getPokemonObj
          });
        });

        return Promise.all(promises); //return pokemon obj as a promises, characters(see below)
      })
      .then(characters => {
        scope.userDecks.forEach(decks => {
          decks.cards = decks.cards.map(id =>
            characters.find(character => character.id === id)
          );
        });
        dispatch({ type: 'UPDATE_DECK', userDecks: scope.userDecks });
      })
      .catch(error => {
        console.log('updateDecksProcess could not fetch: ', error);
      });
  };
}
