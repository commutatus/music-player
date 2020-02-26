/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import React from 'react';
import TrackPlayer from 'react-native-track-player';
import { name as appName } from './app.json';


const app = () => {
  return (
    <App />
  )
}

AppRegistry.registerComponent(appName, () => app);
TrackPlayer.registerPlaybackService(() => require('./playerService'));