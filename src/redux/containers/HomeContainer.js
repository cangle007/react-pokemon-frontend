import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import HomePage from '../../components/HomePage';
import getUserDecksProcess from '../thunks/getUserDecksProcess';
import getPokemonObjProcess from '../thunks/getPokemonObjProcess';
import deleteDecksProcess from '../thunks/deleteDecksProcess';
import createBattleProcess from '../thunks/createBattleProcess';

import createRoomProcess from '../thunks/createRoomProcess';

//import parsingTextMiddleWare from '../thunks/parsingTextMiddleWare';

function mapStateToProps(state, ownProps) {
  return {
    pokemonObj: state.pokemonObj,
    pokemonArray: state.pokemonArray,
    defaultPokemonArray: state.defaultPokemonArray,
    userDecks: state.userDecks,
    userSignIn: state.userSignIn,
    createBattleObj: state.createBattleObj
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    create_room: battleId => dispatch(createRoomProcess(battleId)),
    onPokemonObj: pokemonId => {
      dispatch(getPokemonObjProcess(pokemonId));
    },
    get_userDecks: () => dispatch(getUserDecksProcess()),
    delete_decks: deckId => {
      dispatch(deleteDecksProcess(deckId));
    },
    signOut: () => dispatch({ type: 'USER_SIGNIN', userSignIn: null }),
    create_battle: () => dispatch(createBattleProcess())
  };
}

const withlifecycle = lifecycle({
  componentDidMount(prevProps, prevState) {
    this.props.get_userDecks();
  }
});

const connectToStore = connect(mapStateToProps, mapDispatchToProps);

export default compose(connectToStore, withlifecycle)(withRouter(HomePage));
