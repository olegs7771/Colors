import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  Alert,
} from 'react-native';

import {connect} from 'react-redux';

import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {firebase} from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';

import {GiftedChat} from 'react-native-gifted-chat';

export class ChatScreen extends Component {
  state = {
    email: null,
  };
  static navigationOptions = ({navigation}) => ({
    title: 'test',
  });
  state = {
    messages: [],
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

    const ref = firestore().collection('messages');
    const addTodo = async () => {
      await ref.add({
        text: 'some message',
        user: 'some user',
      });
    };
    addTodo();
    ref.onSnapshot(data => {
      // console.log('data', data);
      // data.forEach(doc => {
      //   console.log(doc.data);
      // });
    });
  }

  render() {
    const chat = (
      <GiftedChat
        messages={this.state.messages}
        // onSend={Fire.send}
        user={this.user}
      />
    );

    if (Platform.OS === 'android') {
      return (
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior="padding"
          keyboardVerticalOffset={30}
          enabled>
          {chat}
        </KeyboardAvoidingView>
      );
    }
    return <SafeAreaView style={{flex: 1}}>{chat}</SafeAreaView>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);

const styles = StyleSheet.create({});