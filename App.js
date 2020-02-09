import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
//Store
import {Provider} from 'react-redux';
import configureStore from './store/store';
//Screens
import HomeScreen from './app/screens/HomeScreen';
import ChatScreen from './app/screens/ChatScreen';
import LoginScreen from './app/auth/LoginScreen';
import RegisterScreen from './app/auth/RegisterScreen';
import LoaderScreen from './app/screens/LoaderScreen';
//NavsContent
import DrawerContent from './app/navs/DrawerContent';
//Navigation

import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';

import {Transition} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
const store = configureStore();

//BottomTabs
const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Chat: ChatScreen,
  },
  {
    navigationOptions: ({navigation}) => {
      const {routeName} = navigation.state.routes[navigation.state.index];

      return {
        headerTitleContainerStyle: {
          width: '60%',
          alignItems: 'center',
        },
        headerTitle: routeName,
        headerStyle: {
          backgroundColor: '#007ab3',
        },

        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
          color: '#FFF',
        },
        tabBarIcon: {
          fontSize: 20,
        },
      };
    },
  },
);

const AppStack = createStackNavigator(
  {TabNavigator},

  {
    defaultNavigationOptions: ({navigation}) => {
      return {
        headerLeft: () => (
          <Icon
            style={{marginLeft: 10}}
            name="align-justify"
            size={30}
            color="#FFF"
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      };
    },
  },
);

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
  },
  {
    defaultNavigationOptions: ({navigation}) => {
      const {routeName} = navigation.state;
      return {
        headerTitle: routeName,
        headerTitleContainerStyle: {
          width: '90%',
          alignItems: 'center',
        },
        headerStyle: {
          backgroundColor: '#007ab3',
        },
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
          color: '#FFF',
        },
        headerBackTitleVisible: {
          visible: true,
        },
      };
    },
  },
);
//Drawer
const MyDrawerNavigator = createDrawerNavigator(
  {
    DashBoard: {
      screen: AppStack,
    },
  },
  {
    contentComponent: ({navigation}) => {
      return <DrawerContent navigation={navigation} />;
    },
  },
);

const MySwitch = createAnimatedSwitchNavigator(
  {
    Loader: LoaderScreen,
    App: MyDrawerNavigator,
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
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

export default App;
