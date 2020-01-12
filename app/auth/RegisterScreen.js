import React, {Component} from 'react';

import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';

export default class RegisterScreen extends Component {
  state = {
    email: '',
    password: '',
  };

  componentDidMount() {
    database()
      ._app.auth()
      .createUserWithEmailAndPassword('joe.bloggs@example.com', '123456')
      .then(user => {
        console.log('user', user);
      })
      .catch(err => {
        console.log('Error :', err);
      });
  }

  _register = async () => {
    database()
      ._app.auth()
      .createUserWithEmailAndPassword('joe.bloggs@example.com', '123456')
      .then(user => {
        console.log('user', user);
      })
      .catch(err => {
        console.log('Error :', err);
      });

    // storage()
    //   ._app.auth()
    //   .createUserWithEmailAndPassword('joe.bloggs@example.com', '123456')
    //   .then(user => {
    //     console.log('user', user);
    //   })
    //   .catch(err => {
    //     console.log('Error :', err);
    //   });

    // await firebase
    //   .auth()
    //   .createUserWithEmailAndPassword('joe.bloggs@example.com', '123456')

    //   .then(user => {
    //     console.log('new user', user);
    //   })
    //   .catch(err => {
    //     console.log('err', err);
    //   });
    // const email = this.state.email;
    // const password = this.state.password;

    // auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then(user => {
    //     console.log('new user', user);
    //   })
    //   .catch(err => {
    //     console.log('err', err);
    //   });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.circle} />
        <View style={styles.circle2} />
        <View style={{marginTop: 24}}>
          <Image
            source={require('../../assets/Artboard.png')}
            style={{width: 180, height: 120, alignSelf: 'center'}}
          />
        </View>
        <View style={{marginHorizontal: 32}}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={email => {
              this.setState({email});
            }}
            value={this.state.email}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={password => {
              this.setState({password});
            }}
            value={this.state.password}
          />
          <View style={{alignItems: 'flex-end', marginTop: 34}}>
            <TouchableOpacity style={styles.continue} onPress={this._register}>
              <Text style={{color: '#fff'}}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f5f7',
  },
  circle: {
    width: 500,
    height: 500,
    borderRadius: 500 / 2,
    backgroundColor: '#FFF',
    position: 'absolute',
    left: -120,
    top: -20,
  },
  circle2: {
    width: 500,
    height: 500,
    borderRadius: 500 / 2,
    backgroundColor: '#e6f7ff',
    position: 'absolute',
    left: 200,
    top: -200,
  },

  input: {
    marginTop: 12,
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#bab7c3',
    borderRadius: 30,
    paddingHorizontal: 20,
    fontWeight: 'bold',
    color: 'grey',
  },
  continue: {
    width: 60,
    height: 60,
    borderRadius: 50 / 2,
    backgroundColor: '#4dc3ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
