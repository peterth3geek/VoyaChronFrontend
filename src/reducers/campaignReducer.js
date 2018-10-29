
const initialState = {
  loading: true,
  currentUser: {},
  currentChapter: {story_modules: []},
  currentCampaign: {characters: [], chapters: [], dungeonmaster: {username: ''}},
  campaignEvents: [],
  userCampaigns: [],
  userCharacters: [],
  userEvents: [],
  locations: [],
  currentSession: {title: '', events: []}
  // characterTheme: characterTheme,
  // campaignTheme: campaignTheme,
  // eventTheme: eventTheme
}

const campaignReducer = (state = initialState, action) => {

  switch(action.type){

    case 'PREP_LOAD_CAMPAIGN':
    return {
      ...state,
      loading: true
    }

    case 'LOAD_LOCATIONS':
    return {
      ...state,
      locations: action.payload.locations
    }

    case'LOAD_CAMPAIGN':
    const eventArray = []
    if(!!action.payload.campaign.characters){
      action.payload.campaign.characters.map(character => {
        if(!!character.events){
          character.events.map(event => {
            eventArray.push(event)
          })
        }
      })
    }

    return {
      ...state,
      currentCampaign: action.payload.campaign,
      campaignEvents: eventArray,
      loading: false
    }

    case'SET_CAMPAIGN':
    const eventArray2 = []
    if(!!action.payload.campaign.characters){
      action.payload.campaign.characters.map(character => {
        if(!!character.events){
          character.events.map(event => {
            eventArray2.push(event)
          })
        }
      })
    }

    return {
      ...state,
      currentCampaign: action.payload.campaign,
      campaignEvents: eventArray2,
      loading: false
    }

    case "ADD_CAMPAIGN":
    return{
      ...state,
      userCampaigns: [...state.userCampaigns, action.payload.campaign]
    }


    case 'EVENT_POST_FETCH':
    // console.log('in campaignReducer action', action.payload)
    return {
      ...state,
      campaignEvents: [...state.campaignEvents, action.payload.event]
    }

    case 'LOAD_CHAPTER':
    // console.log('chapter reducing', action.payload)
    return {
      ...state,
      currentChapter: action.payload.chapter
    }

    case 'LOAD_SESSION':
    return {
      ...state,
      currentSession: action.payload.session
    }

    default:
    return state
  }
}

export default campaignReducer
