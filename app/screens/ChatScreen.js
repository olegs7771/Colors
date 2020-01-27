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
  TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';
import {selectPost} from '../../store/actions/postAction';
import {GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';

const db = firestore().collection('messages');

export class ChatScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      restrictDump: false,
      restrictUpdateState: false,
      deleting: false,
      restrictAddType: false,
    };
  }

  _onSend = (messages = []) => {
    this.setState(prevState => ({
      restrictAddType: true,
      messages: GiftedChat.append(prevState.messages, messages),
    }));

    setTimeout(() => {
      this.setState({
        restrictAddType: false,
      });
    }, 2000);
  };

  componentDidMount() {
    // Subscribe to user updates in 1000ms after CDM
    const unsubscribe = firestore()
      .collection('messages')
      .onSnapshot(querySnapshot => {
        // console.log('querySnapshot on change', querySnapshot);
        console.log('querySnapshot', querySnapshot);

        const {_changes, _docs, size} = querySnapshot;
        console.log('there is change');
        querySnapshot._changes.forEach(element => {
          console.log('element CDM', element.doc._data.message);
          console.log('element CDM type', element.type);

          // console.log('element', element);
          // console.log('element.type', element.type);

          //When message been removed on server
          ////////////////////////////////////
          if (element.type === 'removed') {
            console.log('removed!');

            console.log('element to delete', element.doc._data.message._id);

            // Remove Message from State
            this.setState(prevState => {
              return {
                ...prevState,
                restrictUpdateState: true,
                restrictDump: true,
                messages: prevState.messages.filter(elem => {
                  return elem._id !== element.doc._data.message._id;
                }),
              };
            });
            setTimeout(() => {
              this.setState({
                restrictDump: false,
                restrictUpdateState: false,
              });
            }, 2000);
          }
          const messageUser = element.doc._data.message.user.user;
          const loggedUser = this.props.auth.user;

          //When Message been added on Server
          if (element.type === 'added') {
            console.log('added!');

            const message = element.doc._data.message;
            //If User made message prevent while type added
            if (!this.state.restrictAddType) {
              this.setState(prevState => {
                return {
                  ...prevState,
                  messages: prevState.messages.concat(message),
                  restrictDump: true,
                };
              });
            }
            setTimeout(() => {
              this.setState({
                restrictDump: false,
              });
            }, 2000);
          }
        });

        setTimeout(() => {
          this.setState({
            restrictUpdateState: false,
          });
        }, 1000);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.messages !== this.state.messages &&
      !this.state.restrictUpdateState
    ) {
      const message = this.state.messages[0];
      console.log('message!', message);
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

    // Delete Post
    // Updating state for SameUser
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
      }, 2000);
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
            // this._updateState(message._id);
            // //Delete Post from DB
            // console.log('message', message);

            db.get().then(res => {
              //Find all docs in DB & match with one to delete
              const docToDelete = res._docs.find(elem => {
                return elem._data.message._id === message._id;
              });
              console.log('docToDelete.id', docToDelete.id);
              db.doc(docToDelete.id)
                .delete()
                .then(() => {
                  console.log('deleted');
                  //SelectedPost in Redux to delete
                  this.props.selectPost(message);
                })
                .catch(err => {
                  console.log('cant delete', err);
                });
            });
            // console.log('db.doc()', db.doc().path);
            // console.log('elem', elem._data.message._id);
            break;
        }
      },
    );
  }

  render() {
    this.state.messages.forEach(message => {
      console.log('message.text', message.text);
    });

    const chat = (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this._onSend(messages)}
        user={{
          email: this.props.auth.user.email,
          _id: this.props.auth.user._id,
        }}
        onLongPress={this.onLongPress}
        props={this.props}
        state={this.state}
        showUserAvatar={true}
      />
    );

    if (Platform.OS === 'android') {
      return (
        <View
          style={{flex: 1}}
          behavior="padding"
          keyboardVerticalOffset={30}
          enabled>
          {chat}
        </View>
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
