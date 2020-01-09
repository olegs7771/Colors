import firebase from '@react-native-firebase/app';
import firebaseAuth from '@react-native-firebase/auth';

class Fire {
  constructor() {
    this.init(), this.checkAuth();
  }

  init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyCC2E7W6H_p2hbiJq7wm_KE5rIAZpFgwkg',
        authDomain: 'chat-7c887.firebaseapp.com',
        databaseURL: 'https://chat-7c887.firebaseio.com',
        projectId: 'chat-7c887',
        storageBucket: 'chat-7c887.appspot.com',
        messagingSenderId: '1060282241694',
        appId: '1:1060282241694:web:807e575de7d603a937618f',
        measurementId: 'G-EBSY6BDBZN',
      });
    }
  };

  checkAuth = () => {
    firebaseAuth.auth().onAuthStateChanged(user => {
      if (!user) {
        firebaseAuth.auth().signInAnonymously();
      }
    });
  };

  send = messages => {
    messages.forEach(item => {
      const message = {
        text: item.text,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: item.user,
      };

      this.db.push(message);
    });
  };
  parse = message => {
    console.log('message', message);

    const {user, text, timestamp} = message.val();
    const {key: _id} = message;
    const createdAt = new Date(timestamp);
    return {
      _id,
      createdAt,
      text,
      user,
    };
  };

  get = callback => {
    this.db.on('child_added', snapshot => callback(this.parse(snapshot)));
  };

  off() {
    this.db.off();
  }

  get db() {
    return firebase.database().ref('messages');
  }
  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
}
export default new Fire();
