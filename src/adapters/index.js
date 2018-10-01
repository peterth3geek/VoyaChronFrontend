import { createMuiTheme } from '@material-ui/core/styles';
// #700297
// #0097A7
// #ddc700

export const fetchUser = () => {
  return fetch('http://localhost:3000/users/3')
  .then(r=>r.json())
}

export const fetchCampaign = (campaignID) => {
  return fetch(`http://localhost:3000/campaigns/${campaignID}`)
  .then(r=>r.json())
}

export const eventPostFetch = (event) => {
  return fetch('http://localhost:3000/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
  }
).then(r=>r.json())
}

export const fetchChapter = (chapterID) => {
  console.log('fetch', chapterID)
  return fetch(`http://localhost:3000/chapters/${chapterID}`)
  .then(r=>r.json())
}

export const characterTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {main: '#0097A7'},
    secondary: {main: '#700297'}
  },
  status: {
    danger: '#ddc700',
    error: '#bc0042'
  }
})

export const campaignTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {main: '#c43e00'},
    secondary: {main: '#5ddef4'}
  },
  status: {
    danger: '#ddc700',
    error: '#bc0042'
  }
})

export const eventTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {main: '#5ddef4'},
    secondary: {main: '#e5db00'}
  },
  status: {
    danger: '#ddc700',
    error: '#bc0042'
  }
})
