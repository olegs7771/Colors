import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';

export default class DrawerContent extends Component {
  render() {
    return (
      <View style={styles.co}>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
