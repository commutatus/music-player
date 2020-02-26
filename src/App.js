
import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { manageTrack } from './helper'
import TrackPlayer from 'react-native-track-player'
import PlayerController from './PlayerController'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    this.setUpPlayer()
    manageTrack("nextTrack")
  }

  setUpPlayer = async () => {
    TrackPlayer.setupPlayer({
      maxBuffer: 500,
      minBuffer: 300,
      maxCacheSize: 100,
      waitForBuffer: true
    })
      .then(() => {
        TrackPlayer.updateOptions({
          stopWithApp: true,
          alwaysPauseOnInterruption: true,
          capabilities: [
            TrackPlayer.CAPABILITY_PLAY,
            TrackPlayer.CAPABILITY_PAUSE,
            TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
            TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
            TrackPlayer.CAPABILITY_SEEK_TO
          ]
        });
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <PlayerController />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#696969',
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center'
  }
});

export default App;
