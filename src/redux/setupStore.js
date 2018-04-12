import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/rootReducer';
import thunkMiddleware from 'redux-thunk';
// import io from 'socket.io-client'; //socket-io
// import env from '../env'; //socket-io

// const socketUrl = `${env.API_BASE_URL}`;
// export const socket = io(socketUrl); //exported to App.js on line 4 to use

// socket.on('connect', () => {
//   console.log('Socket Connected. Initalized from redux store ', socket.id);
// });
// HACK:

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers(applyMiddleware(thunkMiddleware));

//DONT DELETE THIS. TO SEND SOCKET TO THUNK AS PROPS
// const enhancers = composeEnhancers(
//   applyMiddleware(thunkMiddleware.withExtraArgument(socket))
// );

export default function setupStore() {
  return createStore(rootReducer, enhancers);
}
