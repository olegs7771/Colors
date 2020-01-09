import {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from './store/store';
import ChatScreen from './app/screens/ChatScreen';
import LoginScreen from './app/screens/LoginScreen';
import React from 'react';

const store = configureStore();

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
const AppStack = createStackNavigator({
  Login: LoginScreen,
  Chat: ChatScreen,
});
const AppNavigator = createAppContainer(AppStack);
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

export default App;
