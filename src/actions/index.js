import * as Adapters from '../adapters'

export const loadUser = () => {
  return (dispatch) => {
    Adapters.fetchUser().then(user => {
      dispatch(setUser(user))
    })
  }
}

export const loadChapter = (chapterID) => {
  return dispatch => {
    Adapters.fetchChapter(chapterID).then(chapter =>{
      dispatch(setChapter(chapter))
    }
    )
  }
}

export const loadSession = (sessionID) => {
  return dispatch => {
    Adapters.fetchSession(sessionID).then(session => {
      dispatch(setSession(session))
    })
  }
}

export const setSession = (session) => {
  return {
    type: 'LOAD_SESSION',
    payload: {
      session
    }
  }
}


export const loadCampaign = (campaignID) => {
  // console.log('in load')
  return dispatch => {
    Adapters.fetchCampaign(campaignID)
    .then(campaign => {
      dispatch(setCampaign(campaign))
    })
  }
}

export const loadLocations = () => {
  return dispatch => {
    Adapters.fetchLocations()
    .then(locations => {
      // console.log('in Actoin', locations)
      dispatch(setLocations(locations))
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

export const createSession = (session) => {
  return dispatch => {
    Adapters.sessionPostFetch(session)
    .then(sess => {
      dispatch(setSession(sess))
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

export const setCampaign = (campaign) => {
  return dispatch => {
    // console.log('REDUCING', campaign)
  const action = {
    type: 'LOAD_CAMPAIGN',
    payload: {
      campaign
    }
  }

  return dispatch(action)
}
}

export const setChapter = (chapter) => {
  // console.log('Reducing', chapter)
  return {
    type: 'LOAD_CHAPTER',
    payload: {
      chapter
    }
  }
}

const setLocations = (locations) => {
  // console.log('set location', locations)
  return {
    type: 'LOAD_LOCATIONS',
    payload:{
      locations
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
