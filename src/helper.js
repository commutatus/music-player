import { client } from '../apolloClient'
import { nextTrackQuery, previousTrackQuery } from './query'
import TrackPlayer from 'react-native-track-player'
import defaultPic from './images/default.png'
import {
  setCurrentTrackToStore,
  setNextAd,
  toggleAdvertDisplay,
  setCurrentPlayingTrackType,
  setSongSkipCount,
} from './redux/actions'
import { store } from './redux/store';
import { advertTracks } from './constants'

getISODateTime = () => {
  let date = new Date();
  let userTimezoneOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - userTimezoneOffset)
}


export const timer = (value) => {
  if (!value) {
    return `0:00`;
  }
  value = Math.floor(value / 1);

  let sec_num = parseInt(value);
  let hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  let seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours < 10) { hours = "0" + hours; }
  if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }
  return `${hours >= 1 ? hours + ':' : ""}${minutes >= 1 ? minutes + ':' : "0:"}${seconds}`
}

export const manageTrack = async (type) => {
  let currentSong = store.getState().track.data
  let query = type === 'nextTrack' ? nextTrackQuery : previousTrackQuery

  let variables = {
    clientTime: getISODateTime(),
    currentStreamId: currentSong && currentSong.id ? Number(currentSong.id) : null
  }

  apiCall({ query, variables }, async (response) => {
    if (response[type]) {
      playCurrentTrack(response[type])
      store.dispatch(setCurrentTrackToStore(response[type]))
      store.dispatch(toggleAdvertDisplay(true))
    } else {
      console.log(response.graphQLErrors)
    }
  })
}

export const apiCall = ({ query, variables }, callback) => {
  client.query({
    query,
    variables,
    fetchPolicy: 'network-only'
  })
    .then(response => callback(response.data))
    .catch(async (error) => {
      callback(error)
    })
}

export const playCurrentTrack = async (trackDetails) => {
  const artwork = trackDetails.song.artists
    && trackDetails.song.artists.edges && trackDetails.song.artists.edges.length &&
    trackDetails.song.artists.edges[0].node.profilePicture &&
    trackDetails.song.artists.edges[0].node.profilePicture.url ?
    trackDetails.song.artists.edges[0].node.profilePicture.url : defaultPic

  const artist = trackDetails.song.artists.edges
    &&
    !!trackDetails.song.artists.edges.length
    ?
    trackDetails.song.artists.edges.map(item => item.node.firstName + " " + item.node.lastName).join(', ') : ''
  let currentSong = {
    "id": trackDetails.id,
    "url": trackDetails.song.mediumQuality.url,
    "title": trackDetails.song.title,
    "artist": artist,
    "artwork": artwork
  }
  playTrack(currentSong)
}


export const playTrack = async (track) => {
  await trackplayerServiceCheck(TrackPlayer.add, track)
  TrackPlayer.getQueue()
    .then(async (queuedTracks) => {
      //Condition to check if the playlist is just initiated 
      if (queuedTracks.length === 1) {
        await trackplayerServiceCheck(TrackPlayer.play)
      }
      //Play next track which is added
      else {
        TrackPlayer.skipToNext()
        TrackPlayer.getState()
          .then(async (state) => {
            if (state === TrackPlayer.STATE_PAUSED || state === TrackPlayer.STATE_CONNECTING) {
              await trackplayerServiceCheck(TrackPlayer.play)
            }
          })
      }
    })
}

export const trackplayerServiceCheck = async (action, ...args) => {
  try {
    return await action(...args)
  } catch (e) {
    if (e.message === 'The playback is not initialized') {
      try {
        await TrackPlayer.setupPlayer(PLAYER_OPTIONS)
        let currentState = await TrackPlayer.getState()
        return await action(...args)
      } catch (e) {
        return null
      }
    }
    return null
  }
}

export const playAdvert = async () => {
  store.dispatch(toggleAdvertDisplay(false))
  playTrack(advertTracks.advert)
}

export const checkForAdvert = (trackType) => {
  let { openAdvert } = store.getState().advert
  let currentTrack = store.getState().track.data

  if (trackType === 'previousTrack' && !currentTrack.isPreviousAvailable) return 0

  if (openAdvert) {
    playAdvert()
  } else {
    manageTrack(trackType)
  }
}