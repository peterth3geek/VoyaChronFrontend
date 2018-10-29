
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

    // case'LOAD_CAMPAIGN':
    // console.log('user reducer', action.payload.campaign, 'user', state.currentUser)
    // return{
    //   ...state,
    //   currentUser: {
    //     ...state.currentUser,
    //     campaigns: [
    //       ...state.currentUser.campaigns,
    //       action.payload.campaign
    //     ]
    //   }
    // }

    default:
    return state
  }
}

export default initReducer
