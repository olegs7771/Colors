import {SELECT_POST} from './type';

export const selectPost = message => dispatch => {
  console.log('message', message);
  dispatch({
    type: SELECT_POST,
    payload: message,
  });
};
