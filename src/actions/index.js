import * as Adapters from '../adapters'

// User Actions
export const loadUser = () => {
  return (dispatch) => {
    Adapters.fetchUser().then(user => {
      dispatch(setUser({user}))
    })
  }
}

export const getUserByUsername = (user, history) => {
  return (dispatch) => {
    Adapters.getUserByName(user).then(usr =>{
      dispatch(setUser(usr))
      history.push('/home')
    })
  }
}

const setUser = (user) => {
  // console.log(user)
  return {
    type: 'LOAD_USER',
    payload: {
      user
    }
  }
}
// ========================================================

// SESSION ACTIONS
export const loadSession = (sessionID) => {
  return dispatch => {
    Adapters.fetchSession(sessionID).then(session => {
      // console.log('in loadSession', session)
      dispatch(setSession(session))
    })
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
//========================================================

// Campaign  Actions
export const createCampaign = (campaign, history, pushURL, user) => {
  // console.log('createCampaign', campaign, 'url', pushURL)
  return dispatch => {
    Adapters.campaignPostFetch(campaign)
    .then(camp => {
      Adapters.characterPostFetch({user_id: user, campaign_id: camp.id, name: 'Dungeonmaster'})
      .then(character =>{
        // debugger
        const campaign1 = {
          ...camp,
          characters: [character]
        }
        dispatch(setCampaign(campaign1))
        history.push(pushURL + camp.id)
      })
    })

  }
}

export const deleteCampaign = (campaign, history) => {
  return dispatch => {
    Adapters.campaignDelete(campaign)
    .then(response => {
      console.log('in delete dispatch', response)
      history.push(`boo`)
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

export const prepLoadCampaign = () => {
  return {
    type: 'PREP_LOAD_CAMPAIGN'
  }
}

export const setCampaign = (campaign) => {
  return {
    type: 'LOAD_CAMPAIGN',
    payload: {
      campaign
    }
}
}

export const setCurrentCampaign = (campaign) => {
  return {
    type: 'SET_CAMPAIGN',
    payload: {
      campaign
    }
}
}

// export const addCampaign = (campaign) => {
//   return dispatch => {
//     const action ={
//       type: 'ADD_CAMPAIGN',
//       payload: {
//         campaign
//       }
//     }
//   }
// }
// ========================================================

// Character Actions

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
// ========================================================

// Location Actions

export const loadLocations = () => {
  return dispatch => {
    Adapters.fetchLocations()
    .then(locations => {
      // console.log('in Actoin', locations)
      dispatch(setLocations(locations))
    })
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
// ========================================================

// Event Actions

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
// ========================================================

// Chapter Actions

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
// ========================================================
