
const userURL = 'http://localhost:3000/users'
const campaignURL =`http://localhost:3000/campaigns`
const sessionURL = 'http://localhost:3000/story_modules'
const locationURL = 'http://localhost:3000/locations'
const eventURL = 'http://localhost:3000/events'
const chapterURL = 'http://localhost:3000/chapters'
const characterURL = 'http://localhost:3000/characters'

// GET REQUESTS

export const fetchUser = (userID) => {
  return fetch(`${userURL}/1`)
  .then(r=>r.json())
}

export const fetchCampaign = (campaignID) => {
  return fetch(`${campaignURL}/${campaignID}`)
  .then(r=>r.json())
}

export const fetchSession = (sessionID) => {
  return fetch(`${sessionURL}/${sessionID}`)
  .then(r=>r.json())
}

export const fetchLocations = () => {
  return fetch(locationURL)
  .then(r=>r.json())
}

export const fetchChapter = (chapterID) => {
  return fetch(`${chapterURL}/${chapterID}`)
  .then(r=>r.json())
}

// POST REQUESTS

export const eventPostFetch = (event) => {
  return fetch(`${eventURL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
  }
).then(r=>r.json())
}

export const sessionPostFetch = (session) => {
  return fetch(sessionURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(session)
  }
).then(r=>r.json())
}

export const chapterPostFetch = (chapter) => {
  return fetch(chapterURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(chapter)
  }
).then(r=>r.json())
}

export const campaignPostFetch = (campaign) => {
  return fetch(campaignURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(campaign)
  }
).then(r=>r.json())
}

export const characterPostFetch = (character) => {
  return fetch(characterURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(character)
  }
).then(r=>r.json())
}

export const getUserByName = (username) => {
  return fetch(userURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(username)
  }
).then(r=>r.json())
}

// DELETE REQUESTS
export const campaignDelete = (campaign) => {
  console.log('in fetch', campaign)
  return fetch(`${campaignURL}/${campaign.id}`, {
    method: 'DELETE',
    body: JSON.stringify(campaign)
  }).then(r=>r.json()).catch(error => console.log(error))
}
