import {
  TOGGLE_ADVERT_DISPLAY,
  SET_INITIAL_STATE
} from "./../constants";
 
let initialState = {
  openAdvert: false,
}

export const advertReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIAL_STATE:
      return {
        ...state,
        ...initialState
      }
    case TOGGLE_ADVERT_DISPLAY:
      return {
        ...state,
        openAdvert: action.payload
      }
    default:
      return state;
  }
}