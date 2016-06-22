/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import RootContainer from './app/containers/root_container';
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import * as reducers from './app/reducers'

const store = createStore(
    combineReducers({
      breakLength: reducers.breakLength,
      pomodoroLength: reducers.pomodoroLength,
      is_active: reducers.is_active,
      activity_type: reducers.activity_type,
      timer: reducers.timer
    })
);


const App = () => (
<Provider store={store}>
    <RootContainer />
</Provider>
)

AppRegistry.registerComponent('Pomodoro', () => App);
