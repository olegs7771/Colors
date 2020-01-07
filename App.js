import {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from './store/store';
import HomeScreen from './app/HomeScreen';
import React from 'react';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    );
  }
}

export default App;
