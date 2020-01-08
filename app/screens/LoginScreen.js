import React, {Component} from 'react';

import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default class LoginScreen extends Component {
  state = {
    name: '',
  };

  _continue = () => {
    this.props.navigation.navigate('Chat', {name: this.state.name});
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.circle} />
        <View style={styles.circle2} />
        <View style={{marginTop: 44}}>
          <Image
            source={require('../../assets/chat.png')}
            style={{width: 100, height: 100, alignSelf: 'center'}}
          />
        </View>
        <View style={{marginHorizontal: 32}}>
          <Text style={styles.header}>Username :</Text>
          <TextInput
            style={styles.input}
            placeholder="DesignIntoCode"
            onChangeText={name => {
              this.setState({name});
            }}
            value={this.state.name}
          />
          <View style={{alignItems: 'flex-end', marginTop: 64}}>
            <TouchableOpacity style={styles.continue} onPress={this._continue}>
              <Icon name="arrow-right" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f5f7',
  },
  circle: {
    width: 500,
    height: 500,
    borderRadius: 500 / 2,
    backgroundColor: '#FFF',
    position: 'absolute',
    left: -120,
    top: -20,
  },
  circle2: {
    width: 500,
    height: 500,
    borderRadius: 500 / 2,
    backgroundColor: '#f5f0ff',
    position: 'absolute',
    left: 200,
    top: -200,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#514E5A',
    marginTop: 32,
  },
  input: {
    marginTop: 12,
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#bab7c3',
    borderRadius: 30,
    paddingHorizontal: 20,
    fontWeight: 'bold',
    color: 'grey',
  },
  continue: {
    width: 60,
    height: 60,
    borderRadius: 50 / 2,
    backgroundColor: '#9875e3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
