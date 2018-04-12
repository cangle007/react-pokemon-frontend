import { socket } from '../../socket.io/socketManager';

export default function createMessageProcess(messageObj) {
  return (dispatch, getState) => {
    socket.emit('RECONNECT_ROOM', messageObj.battleId);
    socket.emit('CREATE_MESSAGE', messageObj);
  };
}
