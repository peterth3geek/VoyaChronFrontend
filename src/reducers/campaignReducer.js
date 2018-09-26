import {characterTheme, campaignTheme, eventTheme} from '../adapters'

const initialState = {
  loading: true,
  currentUser: {},
  currentCampaign: {characters: [], chapters: []},
  campaignEvents: [],
  userCampaigns: [],
  userCharacters: [],
  userEvents: [],
  characterTheme: characterTheme,
  campaignTheme: campaignTheme,
  eventTheme: eventTheme
}

const campaignReducer = (state = initialState, action) => {

  switch(action.type){

    case 'PREP_LOAD_CAMPAIGN':
    return {
      ...state,
      loading: true
    }

    case'LOAD_CAMPAIGN':
    const eventArray = []
    action.payload.campaign.characters.map(character => {
      character.events.map(event => {
        eventArray.push(event)
      })
    })
    return {
      ...state,
      currentCampaign: action.payload.campaign,
      campaignEvents: eventArray,
      loading: false
    }

    case 'EVENT_POST_FETCH':
    console.log('in campaignReducer action', action.payload)
    return {
      ...state,
      campaignEvents: [...state.campaignEvents, action.payload.event]
    }

    default:
    return state
  }
}

export default campaignReducer
