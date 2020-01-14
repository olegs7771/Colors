import React, {Component} from 'react';
import {Text, StyleSheet, View, Button} from 'react-native';

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerTitle}>
          <Text style={styles.textTitle}>Wellcome to my App </Text>
          <Button
            title="Draw"
            onPress={() => this.props.navigation.toggleDrawer()}
          />
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
