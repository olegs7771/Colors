import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/dist/Ionicons';

export default class DrawerContent extends Component {
  constructor(props) {
    super(props);
    this._retreive();

    this.state = {
      email: null,
    };
  }

  _retreive = async () => {
    AsyncStorage.getItem('email').then(email => {
      this.setState({email});
    });
  };

  _logOutUser = () => {
    AsyncStorage.removeItem('email')
      .then(() => {
        this.props.navigation.navigate('Login');
      })
      .catch(err => {
        console.log('err:', err);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.containerUser}>
          {this.state.email ? (
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#FFF'}}>
              User : {this.state.email}{' '}
            </Text>
          ) : (
            <Text style={{fontSize: 20, color: '#FFF'}}> SignIn </Text>
          )}
        </TouchableOpacity>
        {this.state.email ? (
          <TouchableOpacity
            style={styles.containerLog}
            onPress={this._logOutUser}>
            <View style={styles.containerIcon}>
              <Icon
                name="md-log-out"
                size={20}
                color="#FFF"
                style={{marginLeft: 10}}
              />
            </View>
            <View style={styles.containerText}>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: '#FFF'}}>
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    alignItems: 'center',
  },
  containerUser: {
    alignItems: 'center',
    paddingVertical: 5,
    marginTop: 20,
    backgroundColor: '#7575a3',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  containerLog: {
    flexDirection: 'row',
    backgroundColor: '#7575a3',
    padding: 7,
    width: '40%',
    marginTop: 20,
    borderRadius: 5,
  },
  containerText: {
    marginLeft: 10,
  },
  containerIcon: {},
});
