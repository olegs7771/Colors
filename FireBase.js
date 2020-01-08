import firebase from 'firebase';

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
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
    });
  };
}
