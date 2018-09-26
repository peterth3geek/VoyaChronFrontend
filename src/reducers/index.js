import { combineReducers } from 'redux';
import initReducer from './initReducer';
import campaignReducer from './campaignReducer'
import eventReducer from './eventReducer'

const rootReducer = combineReducers({
  initReducer: initReducer,
  campaignReducer: campaignReducer,
  eventReducer: eventReducer
})

export default rootReducer;
