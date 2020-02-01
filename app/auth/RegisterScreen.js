import React, {Component} from 'react';

import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {firebase} from '@react-native-firebase/storage';
//Validation]
import LoginValid from '../validation/LoginValid';
import {register} from '../misc/FireBaseApi';

export default class RegisterScreen extends Component {
  state = {
    form: {
      email: '',
      password: '',
    },
    loading: false,
    errors: {},
    message: {},
  };

  _register = async () => {
    this.setState({loading: true});
    const errorsLocal = {};
    const messagesLocal = {};
    // Validation;
    const {errors, isValid} = LoginValid(this.state.form);
    if (!isValid) {
      return this.setState(prevState => {
        return {
          ...prevState,
          errors: errors,
        };
      });
    }
    const email = this.state.form.email,
      password = this.state.form.password;
    await register(email, password, cb => {
      if (cb.message) {
        messagesLocal.user = cb.message;
        this.setState({
          messages: messagesLocal,
          loading: false,
        });
      }
      if (cb.error) {
        this.setState({
          errors: {
            common: cb.error,
          },
        });
      }
    });
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
              this.setState(prevState => {
                return {
                  form: {
                    ...prevState.form,
                    email,
                  },
                  errors: {},
                  loading: false,
                };
              });
            }}
            value={this.state.form.email}
          />
          {/* {Errors} */}
          {this.state.errors.email && (
            <Text style={{color: 'red'}}>{this.state.errors.email}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={password => {
              this.setState(prevState => {
                return {
                  form: {
                    ...prevState.form,
                    password,
                  },
                  errors: {},
                  loading: false,
                };
              });
            }}
            value={this.state.form.password}
          />

          {/* {Errors} */}
          {this.state.errors.password && (
            <Text style={{color: 'red', fontSize: 16}}>
              {this.state.errors.password}
            </Text>
          )}

          {/* {Errors from FireStore API} */}
          {this.state.errors.common && (
            <View style={styles.containerErrors}>
              <Text style={{color: '#FFF'}}>{this.state.errors.common}</Text>
            </View>
          )}

          {/* {Messages from Local} */}
          {this.state.messages && (
            <View style={styles.containerMessages}>
              <Text style={{color: '#FFF', fontSize: 16}}>
                {this.state.messages.user}
              </Text>
            </View>
          )}

          {this.state.loading && Object.keys(this.state.errors).length === 0 && (
            <View style={{marginTop: 20}}>
              <ActivityIndicator size={40} color="#4dc3ff" />
            </View>
          )}
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
  containerErrors: {
    padding: 5,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: '#ff1a1a',
    alignItems: 'center',
  },
  containerMessages: {
    padding: 5,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: '#00cc00',
    alignItems: 'center',
  },
});
