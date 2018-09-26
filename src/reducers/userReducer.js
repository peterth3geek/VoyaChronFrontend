const initialState = {
  loading: true,
  currentUser: {},
  userCampaigns: [],
  userCharacters: [],
  userEvents: [],

}

const userReducer = (state = initialState, action) => {

  switch(action.type){
    case'LOAD_INFO':
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
