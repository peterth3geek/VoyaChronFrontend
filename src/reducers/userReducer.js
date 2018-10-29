const initialState = {
  loading: true,
  currentUser: {campaigns: []},
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

export default userReducer
