import { socket } from '../../socket.io/socketManager';

export default function setBattleStateProcess(stateObj) {
  return (dispatch, getState) => {
    socket.emit('STATE_UPDATED', stateObj);
  };
}
