
import TrackPlayer from 'react-native-track-player';
import {
  Platform,
} from 'react-native';

import { checkForAdvert } from './src/helper'

module.exports = async function () {
  TrackPlayer.addEventListener('remote-play', async () => {
    TrackPlayer.play()
  })

  TrackPlayer.addEventListener('remote-pause', () => {
    TrackPlayer.pause()
  });

  TrackPlayer.addEventListener('remote-next', async () => {
    checkForAdvert('nextTrack')
  });

  TrackPlayer.addEventListener('remote-previous', async () => {
    checkForAdvert('previousTrack')
  });

  TrackPlayer.addEventListener('remote-stop', () => {
    TrackPlayer.stop()
  });

  TrackPlayer.addEventListener('remote-duck', async (data) => {
    if (Platform.OS === 'ios') {
      if (data.paused) {
        TrackPlayer.pause()
      }
      else {
        TrackPlayer.play()
      }
    } else if (Platform.OS === 'android') {
      if (data.paused) {
        const currentState = await TrackPlayer.getState();
        wasPlaying = currentState === TrackPlayer.STATE_PLAYING;
        TrackPlayer.pause();
      } else if (wasPlaying) {
        TrackPlayer.play();
        wasPlaying = false;
      } else if (data.permanent) {
        TrackPlayer.stop()
      }
    }
  });

  TrackPlayer.addEventListener('playback-queue-ended', (data) => {
    if (data.track) {
      checkForAdvert('nextTrack')
    }
  });

  TrackPlayer.addEventListener('remote-seek', async (data) => {
    TrackPlayer.seekTo(data.position)
  });

}; 