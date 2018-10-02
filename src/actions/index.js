import * as Adapters from '../adapters'

export const loadUser = () => {
  return (dispatch) => {
    Adapters.fetchUser().then(user => {
      dispatch(setUser(user))
    })
  }
}

export const loadSession = (sessionID) => {
  return dispatch => {
    Adapters.fetchSession(sessionID).then(session => {
      // console.log('in loadSession', session)
      dispatch(setSession(session))
    })
  }
}

export const createCharacter = (character) => {
  return dispatch => {
    Adapters.characterPostFetch(character)
    .then(char => {
      dispatch(setCharacter(char))
    })
  }
}

export const setCharacter = (character) => {
  // console.log('in setSession', session)
  return {
    type: 'LOAD_CHARACTER',
    payload: {
      character
    }
  }
}


export const createSession = (session, history, url) => {
  return dispatch => {
    Adapters.sessionPostFetch(session)
    .then(sess => {
      // console.log('in createSession', sess)
      dispatch(setSession(sess))
      history.push(url + sess.id)
    })
  }
}

export const setSession = (session) => {
  // console.log('in setSession', session)
  return {
    type: 'LOAD_SESSION',
    payload: {
      session
    }
  }
}

export const createCampaign = (campaign, history, pushURL, user) => {
  // console.log('createCampaign', campaign, 'url', pushURL)
  return dispatch => {
    Adapters.campaignPostFetch(campaign)
    .then(camp => {
      dispatch(createCharacter({user_id: user, campaign_id: camp.id, name: 'Dungeonmaster'}))
      dispatch(setCampaign(camp))
      history.push(pushURL + camp.id)
    })

  }
}


export const loadCampaign = (campaignID) => {
  console.log('in load', campaignID)
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
    console.log('REDUCING', campaign)
  const action = {
    type: 'LOAD_CAMPAIGN',
    payload: {
      campaign
    }
  }

  return dispatch(action)
}
}

export const createChapter = (chapter, history, url) => {
  return dispatch => {
    Adapters.chapterPostFetch(chapter)
    .then(chap => {
      // console.log('in createChapter', chap)
      dispatch(setChapter(chap))
      history.push(url + chap.id)
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
