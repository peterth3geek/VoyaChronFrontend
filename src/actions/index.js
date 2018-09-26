import * as Adapters from '../adapters'

export const loadUser = () => {
  return (dispatch) => {
    Adapters.fetchUser().then(user => {
      dispatch(setUser(user))
    })
  }
}

export const loadCampaign = () => {
  // console.log('in load')
  return dispatch => {
    Adapters.fetchCampaign()
    .then(campaign => {
      dispatch(setCampaign(campaign))
    })
  }
}

export const createEvent = (event) => {
  return dispatch => {
    Adapters.eventPostFetch(event)
    .then(ev => {
      dispatch(eventPost(ev))
    })
  }
}

const eventPost = (event) => {
  return {
    type: 'EVENT_POST_FETCH',
    payload: {
      event
    }
  }
}

export const prepLoadCampaign = () => {
  return {
    type: 'PREP_LOAD_CAMPAIGN'
  }
}

const setCampaign = (campaign) => {
  // console.log('in set', campaign)
  return {
    type: 'LOAD_CAMPAIGN',
    payload: {
      campaign
    }
  }
}

const setUser = (user) => {
  return {
    type: 'LOAD_USER',
    payload: {
      user
    }
  }
}
