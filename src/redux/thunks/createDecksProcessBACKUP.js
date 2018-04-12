import createDecks from '../../api/createDecks';
import getPokemonObj from '../../api/getPokemonObj';

export default function createUserDeckProcess(
  deckName,
  wins,
  losses,
  pokemonIds,
  userId
) {
  return (dispatch, getState, socket) => {
    let scope = {};

    return createDecks(deckName, wins, losses, pokemonIds, userId)
      .then(newDeck => {
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

        return Promise.all(promises);
      })
      .then(characters => {
        scope.userDeck.forEach(decks => {
          decks.cards = decks.cards.map(id =>
            characters.find(character => character.id === id)
          );
        });
        dispatch({ type: 'CREATE_USER_DECK', userDecks: scope.userDeck[0] });
      })
      .catch(error => {
        console.error('getUserDecksProcess: Couldnt fetch createDeck: ', error);
      });
  };
}

// import createDecks from '../../api/createDecks';
//
// export default function createUserDeckProcess(deckObj) {
//   return (dispatch, getState, socket) => {
//     return createDecks(deckObj, deckObj.userId)
//       .then(newDeck => {
//         console.log('createdUserDeck----------', newDeck);
//         dispatch({ type: 'CREATE_USER_DECK', deckObj });
//       })
//       .catch(error => {
//         console.error('getUserDecksProcess: Couldnt fetch createDeck: ', error);
//       });
//   };
// }
