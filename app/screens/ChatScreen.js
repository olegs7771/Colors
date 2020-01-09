import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';

import {connect} from 'react-redux';

// import AsyncStorage from '@react-native-community/async-storage';
import Fire from '../../Fire';
import {GiftedChat} from 'react-native-gifted-chat';

export class ChatScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('name'),
  });
  state = {
    messages: [],
  };

  get user() {
    return {
      _id: Fire.uid,
      name: this.props.navigation.state.params.name,
    };
  }

  componentDidMount() {
    Fire.get(message =>
      this.setState(prevState => ({
        messages: GiftedChat.append(prevState.messages, message),
      })),
    );
  }

  componentWillUnmount() {
    Fire.off();
  }

  render() {
    console.log('Fire', Fire);

    const chat = (
      <GiftedChat
        messages={this.state.messages}
        onSend={Fire.send}
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
