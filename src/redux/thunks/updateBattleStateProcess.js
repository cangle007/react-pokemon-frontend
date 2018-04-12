import { socket } from '../../socket.io/socketManager';

export default function updateBattleStateProcess() {
  return (dispatch, getState) => {
    socket.on('UPDATED_BATTLE_STATE', obj => {
      console.log('obj---------', obj);
      dispatch({
        type: 'GET_BATTLE_STATE',
        getBattleState: obj
      });
    });
  };
}
