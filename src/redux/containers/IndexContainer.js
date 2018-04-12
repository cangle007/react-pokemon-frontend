import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import IndexPage from '../../components/IndexPage';
import signInProcess from '../thunks/signInProcess';
import signUpProcess from '../thunks/signUpProcess';
import getRegisteredUsersObjProcess from '../thunks/getRegisteredUsersObjProcess';

function mapStateToProps(state, ownProps) {
  return {
    userSignIn: state.userSignIn,
    errorMessage: state.errorMessage,
    userSignup: state.userSignup,
    users: state.users
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    signIn: attribute => {
      dispatch(signInProcess(attribute));
    },
    signUp: attribute => {
      dispatch(signUpProcess(attribute));
    },
    get_user: () => dispatch(getRegisteredUsersObjProcess())
  };
}

const withlifecycle = lifecycle({
  componentDidMount() {
    this.props.get_user();
  }
});

const connectToStore = connect(mapStateToProps, mapDispatchToProps);

export default compose(connectToStore, withlifecycle)(withRouter(IndexPage));
