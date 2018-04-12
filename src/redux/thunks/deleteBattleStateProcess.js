import deleteBattleState from '../../api/deleteBattleState';

export default function deleteBattleStateProcess(battleId) {
  return (dispatch, getState, socket) => {
    return deleteBattleState(battleId);
  };
}

// import deleteBattleState from '../../api/deleteBattleState';
//
// export default function deleteBattleStateProcess(battleId) {
//   return (dispatch, getState, socket) => {
//     return deleteBattleState(battleId).then(result => {
//       dispatch({ type: 'DELETE_BATTLE_STATE', deleteBattleState: result });
//     });
//   };
// }
