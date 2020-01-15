import {GET_AUTH} from './type';

export const getAuth = data => dispatch => {
  dispatch({
    type: GET_AUTH,
    payload: data,
  });
};
