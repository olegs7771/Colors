import React, {Component} from 'react';
import {Text, StyleSheet, View, Button, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import RemotePushController from '../misc/RemotePushController';
export default class HomeScreen extends Component {
  state = {
    email: null,
  };

  componentDidMount() {
    //Check if AsyncStorage contains user email
    AsyncStorage.getItem('email').then(email => {
      console.log('email', email);

      if (email) {
        this.setState({email});
      } else {
        //Persist logged user email in AsyncStorage
        const email = this.props.navigation.state.params.email;
        // this.setState({email});
        AsyncStorage.setItem('email', email);
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image
            source={require('../../assets/beach.jpg')}
            style={{position: 'absolute', height: 600, width: '100%'}}
          />
        </View>
        <View style={styles.containerTitle}>
          <Text style={styles.textTitle}>Wellcome to ChatApp !</Text>

          <View>
            <RemotePushController />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTitle: {
    alignItems: 'center',
    paddingTop: 20,
  },
  textTitle: {
    fontSize: 20,
    color: '#FFF',
  },
});
