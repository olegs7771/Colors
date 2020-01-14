import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerTitle}>
          <Text style={styles.textTitle}>Wellcome to my App </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f7ff',
  },
  containerTitle: {
    alignItems: 'center',
    paddingTop: 20,
  },
  textTitle: {
    fontSize: 20,
  },
});
