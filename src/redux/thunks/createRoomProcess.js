import { socket } from '../../socket.io/socketManager';

export default function createRoomProcess(battleId) {
  return (dispatch, getState) => {
    socket.emit('CREATE_ROOM', battleId);
  };
}
