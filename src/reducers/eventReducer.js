import {characterTheme, campaignTheme, eventTheme} from '../adapters'

const initialState = {
  loading: true,
  currentUser: {},
  currentCampaign: {characters: [], chapters: []},
  campaignEvents: [],
  userCampaigns: [],
  userCharacters: [],
  userEvents: [],
  // characterTheme: characterTheme,
  // campaignTheme: campaignTheme,
  // eventTheme: eventTheme
}

const eventReducer = (state = initialState, action) => {

  switch(action.type){

    case 'EVENT_POST_FETCH':
    return {
      ...state,
      campaignEvents: [...state.campaignEvents, action.payload.event]
    }

    default:
    return state
  }
}

export default eventReducer
