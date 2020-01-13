import {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from './store/store';
import ChatScreen from './app/screens/ChatScreen';
import LoginScreen from './app/auth/LoginScreen';
import RegisterScreen from './app/auth/RegisterScreen';
import LoaderScreen from './app/screens/LoaderScreen';
import React from 'react';

const store = configureStore();

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import {Transition} from 'react-native-reanimated';
const AppStack = createStackNavigator({
  Chat: ChatScreen,
});
const AuthStack = createStackNavigator({
  Loader: LoaderScreen,
  Login: LoginScreen,
  Register: RegisterScreen,
});

const MySwitch = createAnimatedSwitchNavigator(
  {
    Auth: AuthStack,
    Chat: AppStack,
  },
  {
    // The previous screen will slide to the bottom while the next screen will fade in
    transition: (
      <Transition.Together>
        <Transition.Out
          type="slide-bottom"
          durationMs={400}
          interpolation="easeIn"
        />
        <Transition.In type="fade" durationMs={500} />
      </Transition.Together>
    ),
  },
);

const AppNavigator = createAppContainer(MySwitch);
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
