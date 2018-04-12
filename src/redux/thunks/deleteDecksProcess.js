import deleteDecks from '../../api/deleteDecks';

export default function deleteUserDeckProcess(deckId) {
  return (dispatch, getState, socket) => {
    return deleteDecks(deckId).then(() => {
      dispatch({ type: 'DELETE_USER_DECK', deckId });
    });
  };
}
