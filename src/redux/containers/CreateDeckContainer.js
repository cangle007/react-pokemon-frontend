import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import CreateDeckPage from '../../components/CreateDeckPage';
import getPokemonObjProcess from '../thunks/getPokemonObjProcess';
import getDefaultPokemonProcess from '../thunks/getDefaultPokemonProcess';
import createDecksProcess from '../thunks/createDecksProcess';

function mapStateToProps(state, ownProps) {
  return {
    pokemonArray: state.pokemonArray,
    defaultPokemonArray: state.defaultPokemonArray,
    userDecks: state.userDecks,
    users: state.users,
    userSignIn: state.userSignIn
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onPokemonObj: () => {
      dispatch(getPokemonObjProcess());
    },
    get_default_pokemon: () => dispatch(getDefaultPokemonProcess()),
    create_decks: (deckName, wins, losses, pokemonIds, userId) => {
      dispatch(createDecksProcess(deckName, wins, losses, pokemonIds, userId));
    },
    signOut: () => dispatch({ type: 'USER_SIGNIN', userSignIn: null })
  };
}

const connectToStore = connect(mapStateToProps, mapDispatchToProps);

const withlifecycle = lifecycle({
  componentDidMount() {
    this.props.onPokemonObj();
  }
});

export default compose(connectToStore, withlifecycle)(CreateDeckPage);
