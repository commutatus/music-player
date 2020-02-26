import {
    SET_CURRENT_TRACK,
    TOGGLE_ADVERT_DISPLAY,
    SET_INITIAL_STATE,
} from './constants'


export const setCurrentTrackToStore = (payload) => {
    return { type: SET_CURRENT_TRACK, payload }
}

export const toggleAdvertDisplay = (payload) => {
    return { type: TOGGLE_ADVERT_DISPLAY, payload }
}

export const setInitialStateForAdvert = (payload) => {
    return { type: SET_INITIAL_STATE, payload }
}

