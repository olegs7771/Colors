import React, {Component, useEffect} from 'react';
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
import {firebase} from '@react-native-firebase/storage';

class LoginScreen extends Component {
  state = {
    email: '',
    password: '',
    loading: false,
  };
  _navigateToRegister = () => {
    this.props.navigation.navigate('Register');
  };

  _continue = async () => {
    this.setState(prevState => ({...prevState, loading: true}));

    const email = this.state.email,
      password = this.state.password;
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res =>
        AsyncStorage.setItem('email', email).then(() => {
          //To Redux
          this.props.getAuth({email});
          this.props.navigation.navigate('Home', {email: res.user._user.email});
        }),
      )
      .catch(err => {
        console.log('err:', err);
      });
  };

  componentDidMount() {
    this.setState(prevState => ({...prevState, loading: false}));
  }

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
          {this.state.loading && (
            <ActivityIndicator size="small" color="#00ff00" />
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
});
