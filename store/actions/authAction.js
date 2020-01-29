import {GET_AUTH, LOGOUT_USER} from './type';

export const getAuth = data => dispatch => {
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
