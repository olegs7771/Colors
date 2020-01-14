import {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from './store/store';

//Screens
import HomeScreen from './app/screens/HomeScreen';
import ChatScreen from './app/screens/ChatScreen';
import LoginScreen from './app/auth/LoginScreen';
import RegisterScreen from './app/auth/RegisterScreen';
import LoaderScreen from './app/screens/LoaderScreen';
import DrawScreen from './app/screens/DrawScreen';

import React from 'react';
import {View, Text} from 'react-native';

const store = configureStore();

import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import {Transition} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

//Drawer

const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeScreen,
  },
  Chat: {
    screen: ChatScreen,
  },
});

const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
    Chat: ChatScreen,
  },
  {
    defaultNavigationOptions: {
      header: ({navigation}) => {
        return (
          <View
            style={{
              height: 50,
              flexDirection: 'row',
              paddingLeft: 10,
              backgroundColor: '#007ab3',
            }}>
            <View style={{paddingTop: 10}}>
              <Icon name="align-justify" size={30} color="#fff" />
            </View>
            <View
              style={{
                width: '80%',
                alignItems: 'center',
                paddingTop: 10,
              }}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>
                {navigation.state.routeName}
              </Text>
            </View>
          </View>
        );
      },
    },
  },
);

const AuthStack = createStackNavigator({
  Loader: LoaderScreen,
  Login: LoginScreen,
  Register: RegisterScreen,
});

const MySwitch = createAnimatedSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack,
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

const AppNavigator = createAppContainer(MyDrawerNavigator);
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
