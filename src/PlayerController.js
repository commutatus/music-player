import React from "react";
import TrackPlayer from "react-native-track-player";
import Player from './Player'

const PlayerController = (props) => {

  const playbackState = TrackPlayer.usePlaybackState()
  async function togglePlayback() {
    if (playbackState === TrackPlayer.STATE_PAUSED) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }


  
  return (
    <React.Fragment>
      <Player
        onTogglePlayback={togglePlayback}
        playbackState={playbackState}
        {...props}
      />
    </React.Fragment>
  );
}

export default PlayerController
