import { SET_CURRENT_TRACK } from "./../constants";

let initialState = {}

export const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_TRACK:
      return {
        ...state,
        data: action.payload
      }
    default:
      return state;
  }
}