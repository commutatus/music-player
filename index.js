/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import React from 'react';
import TrackPlayer from 'react-native-track-player';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { store } from './src/redux/store'

const app = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

AppRegistry.registerComponent(appName, () => app);
TrackPlayer.registerPlaybackService(() => require('./playerService'));