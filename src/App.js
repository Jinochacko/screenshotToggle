import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { View, Text } from 'react-native';

import Home from './containers/Home';

import configureStore from './Store';

export default class App extends Component {
  state = {
    isLoading: true,
    store: configureStore(() => this.setState({ isLoading: false })),
  };
  render() {
    const { store, isLoading } = this.state;
    if (isLoading) {
      return <View><Text>Loading.....</Text></View>;
    }
    return (
        <Provider store={store}>
          <Home />
        </Provider>
    );
  }
}