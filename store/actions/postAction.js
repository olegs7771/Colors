import {SEND_POST} from './type';

export const sendPost = data => dispatch => {
  console.log('data', data);
  dispatch({
    type: SEND_POST,
    payload: data,
  });
};
