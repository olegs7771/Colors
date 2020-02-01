import {firebase} from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

//To add avatar field
const dbMessages = firestore().collection('messages');
const dbUsers = firestore().collection('users');

export const register = async (email, password, cb) => {
  //Register
  await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(
      user => {
        // console.log('user', user.additionalUserInfo.isNewUser);
        //New User been created
        console.log('user', user);
        const message = `User ${user.user._user.email} been created`;
        console.log('message', message);
        //Create user body for /users
        const userBody = {
          _id: user.user._user.uid,
          email: user.user._user.email,
          avatar: null,
        };

        return cb({
          message,
        });
      },
      err => {
        console.log('err :', err);

        const error = err['message'].toString().substring(31);

        return cb({error});
      },
    );
};

//Login
export const login = async (email, password, cb) => {
  //Register
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      return cb({
        email: res.user.email,
        _id: res.user.uid,
      });
    })
    .catch(err => {
      const error = err['message'].toString().substring(21);
      return cb({error});
    });
};

//Upload Image to Storage

export const uploadAvatar = (image, cb) => {
  db.add({
    message,
  }).then(ref => {
    console.log(' added  message ref.id', ref.id);
  });
};
