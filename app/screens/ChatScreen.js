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
      restrictUpdateState: false,
    };
  }

  _onSend = (messages = []) => {
    this.setState(prevState => ({
      messages: GiftedChat.append(prevState.messages, messages),
    }));
  };

  componentDidMount() {
    console.log('mounted');
    firestore()
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
              restrictDump: true,
            };
          });
        });
      });

    setTimeout(() => {
      this.setState({
        restrictDump: false,
      });
    }, 1000);
    // Subscribe to user updates in 2000ms after CDM

    const unsubscribe = firestore()
      .collection('messages')
      .onSnapshot(querySnapshot => {
        console.log('querySnapshot', querySnapshot);

        console.log('Total users', querySnapshot.size);
        console.log('User Documents', querySnapshot.docs);
        const {_changes, _docs} = querySnapshot;
        if (_changes.length !== _docs.length) {
          console.log('there is change');
          querySnapshot._changes.forEach(element => {
            console.log('element', element.doc._data.message);
            //Prevent state update of self state user
            if (element.doc._data.message.user.user !== this.props.auth.user) {
              this.setState(prevState => {
                return {
                  ...prevState,
                  restrictUpdateState: true,
                  messages: prevState.messages.concat(
                    element.doc._data.message,
                  ),
                };
              });
            }
          });
        }
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.messages !== this.state.messages &&
      !this.state.restrictUpdateState
    ) {
      const ref = firestore().collection('messages');
      const message = this.state.messages[0];
      console.log('message', message);
      console.log('state updated!');
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
              // onWillFocus={() => this._loadMessages()}
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
