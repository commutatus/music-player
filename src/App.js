
import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { manageTrack } from './helper'
import TrackPlayer from 'react-native-track-player'
import PlayerController from './PlayerController'
import { connect } from 'react-redux';
import { setInitialStateForAdvert } from './redux/actions'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    this.setUpPlayer()
    this.props.setInitialStateForAdvert()
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
    let { trackDetails, openAdvert } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{!openAdvert ? "Advertisement" : trackDetails ? trackDetails.song.title : ''}</Text>
        <PlayerController />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    trackDetails: state.track.data,
    openAdvert: state.advert.openAdvert
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#696969',
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center'
  },
  title: {
    alignSelf: 'center',
    marginBottom: 20
  }
});

const mapDispatchToProps = {
  setInitialStateForAdvert,
}

export default (
  connect(mapStateToProps, mapDispatchToProps)
)(App)
