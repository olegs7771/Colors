import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerUser}>
          {this.state.email ? (
            <Text style={{fontSize: 20}}> {this.state.email} </Text>
          ) : (
            <Text style={{fontSize: 20}}> SignIn </Text>
          )}
        </View>
        <View style={styles.containerIcon}>
          <Text>Logout</Text>
          <Icon name="md-log-out" size={20} style={{marginLeft: 10}} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
  },
  containerUser: {
    borderWidth: 1,
    alignItems: 'center',
    paddingVertical: 5,
  },
  containerIcon: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
