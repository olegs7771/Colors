import {Component} from 'react';

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class App extends Component {
  state = {
    respStyle: {
      backgroundColor: 'white',
      choosen: false,
    },
  };

  componentDidMount() {
    AsyncStorage.getItem('backgroundColor', (err, result) => {
      console.log('result', result);
      if (result) {
        this.setState(prevState => {
          return {
            respStyle: {
              ...prevState.respStyle,
              backgroundColor: result,
              choosen: true,
            },
          };
        });
      }
    });
  }

  //Change Colors
  _green = async () => {
    this.setState(prevState => {
      return {
        respStyle: {
          ...prevState.respStyle,
          choosen: true,
          backgroundColor: 'green',
        },
      };
    });

    await AsyncStorage.setItem('backgroundColor', 'green');
  };
  _red = async () => {
    this.setState(prevState => {
      return {
        respStyle: {
          ...prevState.respStyle,
          choosen: true,
          backgroundColor: 'red',
        },
      };
    });
    await AsyncStorage.setItem('backgroundColor', 'red');
  };
  _blue = async () => {
    this.setState(prevState => {
      return {
        respStyle: {
          ...prevState.respStyle,
          choosen: true,
          backgroundColor: 'blue',
        },
      };
    });
    await AsyncStorage.setItem('backgroundColor', 'blue');
  };
  _reset = async () => {
    this.setState(prevState => {
      return {
        respStyle: {
          ...prevState.respStyle,
          choosen: false,
          backgroundColor: 'white',
        },
      };
    });
    await AsyncStorage.removeItem('backgroundColor');
  };

  render() {
    const {choosen, backgroundColor} = this.state.respStyle;
    console.log('backgroundColor', backgroundColor);

    return (
      <View
        style={
          choosen
            ? {backgroundColor, alignItems: 'center', flex: 1}
            : styles.container
        }>
        <View style={styles.containerTitle}>
          <Text
            style={
              choosen
                ? {color: '#ffffff', fontSize: 30, fontWeight: 'bold'}
                : styles.textTitle
            }>
            Colors
          </Text>
          <View
            style={
              choosen
                ? {marginTop: 20, borderBottomWidth: 1, borderColor: '#ffffff'}
                : {marginTop: 20, borderBottomWidth: 1}
            }>
            <Text
              style={
                choosen ? {fontSize: 16, color: '#ffffff'} : {fontSize: 16}
              }>
              Choose the color of background
            </Text>
          </View>
        </View>
        <View style={styles.containerButtons}>
          <View style={{width: '30%'}}>
            <Button title="Green" color="green" onPress={this._green} />
          </View>
          <View style={{width: '30%'}}>
            <Button title="Red" color="red" onPress={this._red} />
          </View>
          <View style={{width: '30%'}}>
            <Button title="Blue" color="blue" onPress={this._blue} />
          </View>
        </View>
        <View style={{width: '30%', marginTop: 50}}>
          <Button title="Reset" color="grey" onPress={this._reset} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
  },
  containerTitle: {
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  containerButtons: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-between',
    width: '80%',
  },
});

export default App;
