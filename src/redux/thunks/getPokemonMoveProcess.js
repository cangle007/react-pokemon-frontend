import getPokemonMove from '../../api/getPokemonMove';

export default function getPokemonMoveProcess(moveName) {
  return (dispatch, getState, socket) => {
    getPokemonMove(moveName).then(obj => {});
  };
}
