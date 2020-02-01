import {GET_AUTH, LOGOUT_USER, STORE_AVATAR_IMAGE} from './type';

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

//Store Avatar Image in FireBase Storage

export const storeAvatar = data => dispatch => {
  console.log('data store avatar', data);
  fetch(' https://us-central1-chat-7c887.cloudfunctions.net/storeImage', {
    method: 'POST',
    body: data.fd,
    // body: JSON.stringify({
    //   image: data.base64,
    // }),
  })
    .then(res => res.json())
    .then(parsedRes => {
      console.log('parsedRes', parsedRes);
    })
    .catch(err => console.log('error in action', err));
};
