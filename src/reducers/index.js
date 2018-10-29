import { combineReducers } from 'redux';
import initReducer from './initReducer';
import campaignReducer from './campaignReducer'
import eventReducer from './eventReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
  initReducer: initReducer,
  campaignReducer: campaignReducer,
  eventReducer: eventReducer,
  userReducer: userReducer
})

export default rootReducer;
