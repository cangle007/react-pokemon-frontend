import createDecks from '../../api/createDecks';
import getPokemonObj from '../../api/getPokemonObj';

export default function createUserDeckProcess(
  deckName,
  wins,
  losses,
  pokemonIds,
  userId
) {
  return async (dispatch, getState, socket) => {
    try {
      let scope = {};
      let newDeck = await createDecks(
        deckName,
        wins,
        losses,
        pokemonIds,
        userId
      );
      scope.userDeck = newDeck;
      const promises = [];

      let newUserDeck = newDeck.map(userDeck => {
        userDeck.cards = userDeck.cards.split(',').map(ids => {
          return Number(ids);
        });
        return userDeck;
      });

      newUserDeck.forEach(userDeck => {
        const ids = userDeck.cards;
        userDeck.cards = ids;
        ids.forEach(id => {
          promises.push(getPokemonObj(id)); //insert pokemonId to getPokemonObj
        });
      });

      let characters = await Promise.all(promises);

      scope.userDeck.forEach(decks => {
        decks.cards = decks.cards.map(id =>
          characters.find(character => character.id === id)
        );
      });

      dispatch({ type: 'CREATE_USER_DECK', userDecks: scope.userDeck[0] });
    } catch (err) {
      console.log('err-------', err);
    }
  };
}
