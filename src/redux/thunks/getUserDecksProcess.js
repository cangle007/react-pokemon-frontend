import getUserDecks from '../../api/getUserDecks';
import getPokemonObj from '../../api/getPokemonObj';

export default function getUserDecksProcess() {
  return (dispatch, getState, socket) => {
    const scope = {};
    return getUserDecks()
      .then(userDecks => {
        scope.userDecks = userDecks;
        const promises = [];

        let newUserDeck = userDecks.map(userDeck => {
          userDeck.cards = userDeck.cards.split(',').map(card => {
            return Number(card);
          });
          return userDeck;
        });

        newUserDeck.forEach(userDeck => {
          const ids = userDeck.cards;
          userDeck.cards = ids; //i dont get it
          ids.forEach(id => {
            promises.push(getPokemonObj(id));
          });
        });
        return Promise.all(promises);
      })
      .then(characters => {
        scope.userDecks.forEach(userDeck => {
          userDeck.cards = userDeck.cards.map(id =>
            characters.find(character => character.id === id)
          );
        });
        dispatch({ type: 'FETCHED_USER_DECKS', userDecks: scope.userDecks });
      })
      .catch(error => {
        console.error('getUserDecksProcess couldnt fetch userDecks: ', error);
      });
  };
}
