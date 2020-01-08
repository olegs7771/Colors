import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

export class HomeScreen extends Component {
  render() {
    return (
      <View>
        <Text>chat</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({});
