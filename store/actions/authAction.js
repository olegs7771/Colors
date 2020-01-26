import {GET_AUTH, LOGOUT_USER} from './type';

export const getAuth = data => dispatch => {
  console.log('action auth data', data);

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
