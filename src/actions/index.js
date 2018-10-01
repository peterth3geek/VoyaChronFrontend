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


export const loadCampaign = (campaignID) => {
  // console.log('in load')
  return dispatch => {
    Adapters.fetchCampaign(campaignID)
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
  console.log('Reducing', chapter)
  return {
    type: 'LOAD_CHAPTER',
    payload: {
      chapter
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
