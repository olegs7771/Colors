import {firebase} from '@react-native-firebase/storage';

export const register = (email, password, cb) => {
  //Register
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(
      user => {
        // console.log('user', user.additionalUserInfo.isNewUser);
        //New User been created
        console.log('user', user);
        const message = `User ${user.user._user.email} been created`;
        console.log('message', message);

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
