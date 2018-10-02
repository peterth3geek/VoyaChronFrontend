
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
      userCharacters: action.payload.user.characters,
      loading: false
    }

    case'LOAD_CHARACTER':
    return {
      ...state,
      userCharacters: [...state.userCharacters, action.payload.character]
    }

    default:
    return state
  }
}

export default initReducer
