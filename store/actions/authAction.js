import {GET_AUTH, LOGOUT_USER} from './type';

export const getAuth = data => dispatch => {
  console.log('data of user', data);

  dispatch({
    type: GET_AUTH,
    payload: data,
  });
};
export const logoutUser = () => dispatch => {
  dispatch({
    type: LOGOUT_USER,
  });
};

//Update auth.user with new avatar url
export const storeAvatar = data => dispatch => {
  // console.log('data store avatar in action', data);
  dispatch({
    type: GET_AUTH,
    payload: data,
  });
};
