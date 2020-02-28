import React, { useState } from "react";
import TrackPlayer from "react-native-track-player";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import Slider from './Slider';
import { timer } from './helper'
import { checkForAdvert } from './helper'

async function seekTrackComplete(val) {
  await TrackPlayer.seekTo(val)
  await TrackPlayer.play()
}

function ProgressBar() {
  const progress = TrackPlayer.useTrackPlayerProgress();
  return (
    <Slider
      maximumValue={progress.duration}
      minimumValue={0}
      midValue={progress.bufferedPosition}
      step={1}
      style={Platform.OS === "ios" ? styles.iosProgressBar : styles.progressBar}
      maximumTrackTintColor={"#ffffff40"}
      minimumTrackTintColor={"#FF7241"}
      thumbTintColor={"#FF7241"}
      onSlidingComplete={(val) => seekTrackComplete(val)}
      value={progress.position}
      thumbStyle={{ height: 12, width: 12 }}
      trackStyle={{ height: 1 }}
    />
  );
}

function Player(props) {
  let [displayLoader, setHookDisplayLoader] = useState(true)
  let [displayPlayPause, setHookDisplayPlayPause] = useState(true)
  TrackPlayer.getState()
    .then(playbackState => {
      setHookDisplayLoader(playbackState !== TrackPlayer.STATE_PLAYING && playbackState !== TrackPlayer.STATE_PAUSED)
      setHookDisplayPlayPause(playbackState === TrackPlayer.STATE_PLAYING)
    })
  const progress = TrackPlayer.useTrackPlayerProgress();


  return (
    <View>
      <React.Fragment>
        <View style={styles.durationContainer}>
          <Text style={styles.currentPosition}>
            {timer(progress.position)}
          </Text>
          <Text style={styles.totalDuration}>
            {timer(progress.duration)}
          </Text>
        </View>
        <View>
          <ProgressBar parentProps={props} />
        </View>
        <View style={styles.controls}>
          <TouchableOpacity onPress={() => checkForAdvert('previousTrack')}>
            <Image
              style={styles.playerControlButton}
              source={require("./images/previous.png")}
            />
          </TouchableOpacity>
          {
            displayLoader ?
              <Image style={styles.playerControlButtonPlay} source={require("./images/loader.gif")} />
              :
              <TouchableOpacity onPress={() => props.onTogglePlayback()}>
                <Image style={styles.playerControlButtonPlay} source={displayPlayPause ? require("./images/pause.png") : require("./images/play.png")} />
              </TouchableOpacity>
          }
          <TouchableOpacity onPress={() => checkForAdvert('nextTrack')}>
            <Image style={styles.playerControlButton} source={require("./images/next.png")} />
          </TouchableOpacity>
        </View>
      </React.Fragment>
    </View>
  );
}


const styles = StyleSheet.create({

  playerControlButtonPlay: {
    width: (45),
    height: (45),
    resizeMode: 'contain'
  },
  playerControlButton: {
    width: (13.5),
    height: (13.5),
    resizeMode: 'contain'
  },
  progressBar: {
    width: '100%'
  },
  iosProgressBar: {
    marginTop: -10,
  },
  controls: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: 'space-between'
  },
  currentPosition: {
    color: "#fff",
    opacity: 0.7,
    fontSize: 12,
    fontWeight: '400'
  },
  totalDuration: {
    color: "#fff",
    fontSize: 12,
    fontWeight: '400'
  },
  durationContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});


export default Player
