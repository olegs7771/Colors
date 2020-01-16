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

// import auth from '@react-native-firebase/auth';
// import storage from '@react-native-firebase/storage';
// import {firebase} from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';

import {GiftedChat} from 'react-native-gifted-chat';

export class ChatScreen extends Component {
  state = {
    email: null,
    messages: [],
  };

  _onSend = (messages = []) => {
    this.setState(prevState => ({
      messages: GiftedChat.append(prevState.messages, messages),
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.messages !== this.state.messages) {
      const ref = firestore().collection('messages');
      const message = this.state.messages[0];
      console.log('message', message);
      ref.add({
        message,
      });
    }
  }

  render() {
    const chat = (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this._onSend(messages)}
        user={{user: this.props.auth.user}}
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

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);

const styles = StyleSheet.create({});
