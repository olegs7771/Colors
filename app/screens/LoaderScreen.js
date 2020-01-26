import React, {Component} from 'react';
import {Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {getAuth} from '../../store/actions/authAction';

class LoaderScreen extends Component {
  constructor(props) {
    super(props);

    this._retrieveData();
  }

  _retrieveData = async () => {
    await AsyncStorage.getItem('user')
      .then(user => {
        JSON.parse(user);
        console.log('user ::', user);

        //Redux
        if (email) {
          this.props.getAuth({email});
        }
        this.props.navigation.navigate(email ? 'App' : 'Auth');
        console.log('email', email);
      })
      .catch(err => {
        console.log('err:', err);
      });
  };

  render() {
    return (
      <View>
        <Text> Loader.. </Text>
      </View>
    );
  }
}

export default connect(null, {getAuth})(LoaderScreen);
