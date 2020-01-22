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
  Clipboard,
} from 'react-native';

import {connect} from 'react-redux';

// import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
// import {firebase} from '@react-native-firebase/storage';
import {GiftedChat} from 'react-native-gifted-chat';

import firestore from '@react-native-firebase/firestore';
const db = firestore().collection('messages');

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
        // console.log('querySnapshot', querySnapshot);

        // console.log('Total users', querySnapshot.size);
        // console.log('User Documents', querySnapshot.docs);
        const {_changes, _docs} = querySnapshot;
        if (_changes.length !== _docs.length) {
          // console.log('there is change');
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
      const message = this.state.messages[0];
      console.log('message', message);
      console.log('state updated!');
      if (message !== undefined && !this.state.restrictDump) {
        db.add({
          message,
        });
      }
    }
  }

  onLongPress(context, message) {
    console.log('message', message);
    const options = ['Delete Message', 'Cancel', 'Copy Text'];
    const cancelButtonIndex = options.length - 2;

    context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            // //Delete Post from DB
            const id = JSON.stringify(db.doc().id);
            // db.doc(id).delete();
            // console.log('deleted :', id);
            db.doc(id).delete();

            break;
        }
      },
    );
  }

  render() {
    // console.log('GigtedChat', <GiftedChat />);

    const chat = (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this._onSend(messages)}
        user={{user: this.props.auth.user}}
        onLongPress={this.onLongPress}
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
