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
import {selectPost} from '../../store/actions/postAction';

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
      deleting: false,
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
          //Add to state& prevent dump to server after CDM
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
    // Subscribe to user updates in 1000ms after CDM

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
            // console.log('element', element.doc._data.message);
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
      if (
        message !== undefined &&
        !this.state.restrictDump &&
        !this.state.deleting
      ) {
        db.add({
          message,
        }).then(ref => {
          console.log(' added  message ref.id', ref.id);
        });
      }
    }

    //Delete Post
    //Updating state
    if (prevProps.post !== this.props.post) {
      this.setState(prevState => {
        return {
          ...prevState,
          deleting: true,

          messages: prevState.messages.filter(element => {
            return element._id !== this.props.post.selectedPost._id;
          }),
        };
      });
      //reset state deleting to false
      setTimeout(() => {
        this.setState({deleting: false});
      }, 1000);
    }
  }

  onLongPress(context, message) {
    // console.log('message', message);
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
            //SelectedPost in Redux
            this.props.selectPost(message);

            // this._updateState(message._id);
            // //Delete Post from DB
            // console.log('message', message);

            db.get().then(res => {
              //Find all docs in DB & match with one to delete
              const docToDelete = res._docs.find(elem => {
                return elem._data.message._id === message._id;
              });
              // console.log('docToDelete.id', docToDelete.id);
              db.doc(docToDelete.id).delete();
            });
            // console.log('db.doc()', db.doc().path);
            // console.log('elem', elem._data.message._id);
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
        props={this.props}
        state={this.state}
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
  post: state.post,
});

const mapDispatchToProps = {selectPost};

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);

const styles = StyleSheet.create({});
