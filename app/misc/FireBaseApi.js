import {firebase} from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import uuid from 'uuid';

//To add avatar field

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
          avatar: null, //we can add URI of Avater  here later
          path: null, // path we use as  Ref for delete prev file
        };
        //Add user to /users
        dbUsers
          .doc(user.user._user.uid)
          .set({
            userBody,
          })
          .then(user => {
            console.log('created new user :', user);
          });

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
  console.log('in login');

  //Register
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      console.log('res in login', res);
      if (res.user) {
        //After User Logged obtain avatar from /users by id
        let userRef = dbUsers.doc(res.user.uid);
        userRef.get().then(user => {
          // console.log('user after login  user._data', user._data);
          return cb({
            email: user._data.userBody.email,
            _id: user._data.userBody._id,
            avatar: user._data.userBody.avatar,
            path: user._data.userBody.path,
          });
        });
      }
    })
    .catch(err => {
      const error = err['message'].toString().substring(21);
      return cb({error});
    });
};

//Update /user-->avatar field

export const uploadAvatar = async (image, id, path, cb) => {
  console.log('path to delete', path);

  //Create object for cb
  let cbObj = {};

  const fileExt = image.uri.split('.').pop();
  const fileName = `${uuid()}.${fileExt}`;
  console.log('fileName', fileName);
  console.log('image.uri', image.uri);

  //Create Ref for Image in Storage
  const storageRef = firebase.storage().ref(`avatars/${fileName}`);
  console.log('storageRef', storageRef);

  storageRef.putFile(image.uri).on(
    firebase.storage.TaskEvent.STATE_CHANGED,
    snapshot => {
      console.log('snapshot', snapshot);

      if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
        cbObj.snapshot = snapshot;
        //update path in /users
        let userRef = dbUsers.doc(id);
        userRef.update({'userBody.path': `${snapshot.ref.path}`}).then(() => {
          cbObj.path = snapshot.ref.path;
        });
      }

      //After New File created we can delete previous one with ref
      // Create a reference to the file to delete
      // var desertRef = storageRef.child(path);
      // console.log('desertRef', desertRef);
      const fileRef = firebase.storage().ref(path);
      console.log('fileRef ', fileRef);

      // Delete the file
      if (path) {
        fileRef
          .delete()
          .then(() => {
            return console.log('previous file deleted successfully');
          })
          .catch(error => {
            console.log('cant delete previous file', error);
          });
      }
    },
    //Catch Error if upload failed
    error => {
      unsubscribe();

      cb('Image upload failed' + error.toString());
    },
    //Get Download Url of stored file
    async () => {
      await storageRef.getDownloadURL().then(url => {
        //Create Ref for Document to Update in /users
        let userRef = dbUsers.doc(id);
        userRef.update({'userBody.avatar': `${url}`}).then(() => {
          cbObj.urlToFile = url;

          console.log('url', url);
          console.log('cbObj.urlToFile', cbObj.urlToFile);
          cb({cbObj});
        });
      });
    },
  );
};
