import { combineReducers } from 'redux'
import { playerReducer } from './reducers/playerReducer'
import { advertReducer } from './reducers/advertReducer'
 
export const allReducers = combineReducers({
  track: playerReducer,
  advert: advertReducer
})
