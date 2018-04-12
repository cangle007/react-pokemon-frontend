import getRegisteredUsersObj from '../../api/getRegisteredUsersObj';

export default function getRegisteredUsersObjProcess() {
  return (dispatch, getState, socket) => {
    return getRegisteredUsersObj().then(result => {
      dispatch({
        type: 'FETCHED_USERS',
        users: result
      });
      return result;
    });
  };
}
