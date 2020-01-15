import {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from './store/store';

//Screens
import HomeScreen from './app/screens/HomeScreen';
import ChatScreen from './app/screens/ChatScreen';
import LoginScreen from './app/auth/LoginScreen';
import RegisterScreen from './app/auth/RegisterScreen';
import LoaderScreen from './app/screens/LoaderScreen';
//Navs
import DrawerContent from './app/navs/DrawerContent';

import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const store = configureStore();

import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Transition} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

//Drawer

const MyDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Chat: {
      screen: ChatScreen,
    },
  },
  {
    initialRouteName: 'Home',
    contentComponent: ({navigation}) => {
      return <DrawerContent navigation={navigation} />;
    },
  },
);

const AppStack = createStackNavigator(
  {App: MyDrawerNavigator},

  {
    defaultNavigationOptions: {
      header: ({navigation}) => {
        console.log('navigation.state', navigation.state);

        return (
          <View
            style={{
              height: 50,
              flexDirection: 'row',
              paddingLeft: 10,
              backgroundColor: '#007ab3',
            }}>
            <TouchableOpacity style={{paddingTop: 10}}>
              <Icon
                name="align-justify"
                size={30}
                color="#fff"
                onPress={() => navigation.toggleDrawer()}
              />
            </TouchableOpacity>
            <View
              style={{
                width: '80%',
                alignItems: 'center',
                paddingTop: 10,
              }}>
              {/* <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>
                test
              </Text> */}
            </View>
          </View>
        );
      },
    },
  },
);

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
});

const MySwitch = createAnimatedSwitchNavigator(
  {
    Loader: LoaderScreen,
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

const AppNavigator = createAppContainer(MySwitch);
class App extends Component {
  render() {
    console.log('this.props', this.props);

    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

export default App;
