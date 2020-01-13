import React, {Component} from 'react';
import {Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
export default class LoaderScreen extends Component {
  constructor(props) {
    super(props);

    this._retrieveData();
  }

  _retrieveData = async () => {
    await AsyncStorage.getItem('email').then(res => {
      this.props.navigation.navigate(res ? 'Chat' : 'Auth');
      console.log('res', res);
    });
  };

  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}
