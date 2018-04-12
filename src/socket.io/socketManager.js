import io from 'socket.io-client';
import env from '../env';
const socketUrl = `${env.API_BASE_URL}`; //socket-io
export const socket = io(socketUrl); //exported to battlePageContainer

//console.log('url-----------', socketUrl);
//initalized socket & created room
socket.on('connect', () => {
  console.log('Socket initalized: ', socket.id);
});

socket.on('disconnect', () => {
  console.log('disconnected to server');
});
