import React, {Component} from 'react';
import {firebase} from '@react-native-firebase/storage';
//Redux
import {connect} from 'react-redux';
import {getAuth} from '../../store/actions/authAction';

import AsyncStorage from '@react-native-community/async-storage';
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

//Validation]
import LoginValid from '../validation/LoginValid';
import {login} from '../misc/FireBaseApi';

class LoginScreen extends Component {
  state = {
    form: {
      email: '',
      password: '',
    },
    loading: false,
    errors: {},
  };
  _navigateToRegister = () => {
    this.props.navigation.navigate('Register');
  };

  _continue = async () => {
    const errorsLocal = {};
    //Validation
    const {errors, isValid} = LoginValid(this.state.form);
    if (!isValid) {
      return this.setState(prevState => {
        return {
          ...prevState,
          errors: errors,
        };
      });
    }

    this.setState(prevState => ({...prevState, loading: true}));

    const email = this.state.form.email,
      password = this.state.form.password;

    login(email, password, cb => {
      console.log('cb user logged', cb);

      if (cb.email) {
        this.setState({loading: false});

        //Create data for auth action
        const data = {
          email: cb.email,
          _id: cb._id,
          avatar: cb.avatar,
          path: cb.path,
        };

        //Set AsyncStorage
        AsyncStorage.setItem('user', JSON.stringify(data))
          .then(() => {
            console.log('user inserted in async storage');

            //To Redux
            this.props.getAuth(data);
            // Navigate to home
            this.props.navigation.navigate('Home', {
              email: this.state.form.email,
            });
          })
          .catch(err => {
            console.log('error itemSet()');
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

  // componentDidMount() {
  // this.setState(prevState => ({...prevState, loading: false}));
  // }

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
        <View style={{marginHorizontal: 32, alignItems: 'center'}}>
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
                };
              });
            }}
            value={this.state.form.email}
          />
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
                };
              });
            }}
            value={this.state.form.password}
          />
          {this.state.errors.password && (
            <Text style={{color: 'red'}}>{this.state.errors.password}</Text>
          )}

          {/* {Errors from FireStore API} */}
          {this.state.errors.common && (
            <View style={styles.containerErrors}>
              <Text style={{color: '#FFF'}}>{this.state.errors.common}</Text>
            </View>
          )}

          {this.state.loading && Object.keys(this.state.errors).length === 0 && (
            <View style={{marginTop: 20}}>
              <ActivityIndicator size={40} color="#4dc3ff" />
            </View>
          )}

          <View style={{alignItems: 'flex-end', marginTop: 30}}>
            <TouchableOpacity style={styles.continue} onPress={this._continue}>
              <Icon name="arrow-right" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.containerToRegister}>
            <View style={styles.containerTextToRegister}>
              <Text style={styles.textToRegister}>Not Registered Yet?</Text>
            </View>
            <TouchableOpacity
              style={styles.containerIcon}
              onPress={this._navigateToRegister}>
              <Icon name="arrow-right" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(null, {getAuth})(LoginScreen);

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
    width: '80%',
  },
  containerToRegister: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '60%',
  },
  containerTextToRegister: {},
  textToRegister: {
    fontSize: 16,
    color: 'grey',
  },
  containerIcon: {
    width: '20%',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '	rgb(96, 96, 133)',
    padding: 3,
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
  },
});
