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
import {GiftedChat} from 'react-native-gifted-chat';
import {NavigationEvents} from 'react-navigation';

export class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      messages: [],
      restrictDump: false,
    };
  }

  _onSend = (messages = []) => {
    this.setState(prevState => ({
      messages: GiftedChat.append(prevState.messages, messages),
    }));
  };

  //Load messages from firebase /'messages'
  _loadMessages = async () => {
    //if component loaded do not update DB
    this.setState({restrictDump: true});
    setTimeout(() => {
      this.setState({restrictDump: false});
    }, 1000);

    await firestore()
      .collection('messages')
      .get()
      .then(response => {
        response._docs.forEach(element => {
          console.log('element', element._data.message);
          //Add to state
          this.setState(prevState => {
            return {
              ...prevState,
              messages: prevState.messages.concat(element._data.message),
            };
          });
        });
      });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.messages !== this.state.messages) {
      const ref = firestore().collection('messages');
      const message = this.state.messages[0];
      console.log('message', message);
      if (message !== undefined && !this.state.restrictDump) {
        ref.add({
          message,
        });
      }
    }
  }

  //Clear State on willBlur
  _clearState = () => {
    this.setState({messages: []});
  };

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
          <View>
            <NavigationEvents
              onWillFocus={() => this._loadMessages()}
              // onDidFocus={payload => console.log('did focus', payload)}
              onWillBlur={() => this._clearState()}
              // onDidBlur={payload => console.log('did blur', payload)}
            />
          </View>
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
