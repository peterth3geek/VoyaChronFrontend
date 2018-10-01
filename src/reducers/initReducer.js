import {characterTheme, campaignTheme, eventTheme} from '../adapters'

const initialState = {
  loading: true,
  currentUser: {},
  currentChapter: {},
  currentCampaign: {},
  userCampaigns: [],
  userCharacters: [],
  userEvents: [],
  // characterTheme: characterTheme,
  // campaignTheme: campaignTheme,
  // eventTheme: eventTheme
}

const initReducer = (state = initialState, action) => {

  switch(action.type){
    case'LOAD_USER':
    return {
      ...state,
      currentUser: action.payload.user,
      loading: false
    }

    default:
    return state
  }
}

export default initReducer
