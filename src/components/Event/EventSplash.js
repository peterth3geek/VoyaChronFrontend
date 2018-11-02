import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import compose from 'recompose/compose'

import { withStyles } from '@material-ui/core/styles';
import { withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';


import { createEvent, loadSession, setSession, loadChapter, setChapter, setCampaign } from '../../actions'

import EventTextField from './EventTextField'
import EventCard from './EventCard'

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '70vh',
    width: '70vw',
    zIndex: 1,
    overflow: 'auto',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  cardDiv: {
    height: '70vh',
    overflow: 'auto',
    // alignItems: 'center'
    // position: 'fixed',
    // bottom: 0
  },
});

class EventSplash extends React.Component{

  campaignClick = () => {
    this.props.setCampaign(this.props.campaign)
    this.props.history.push(`/campaign/${this.props.campaign.id}`)
  }

  chapterClick = () => {
    // console.log(this.props.chapter)
    this.props.loadChapter(this.props.chapter.id)
    this.props.history.push(`/campaign/${this.props.campaign.id}/${this.props.chapter.id}`)
  }

  mapEvents = () => {
    // const { characters } = this.props.campaign
    // const { session } = this.props
    const { eventArray } = this.props

    // console.log('map', session)
    const newArr = eventArray.sort((a, b) =>{
      return a.id - b.id
    })

    return newArr.map(event =>{
      // console.log(event)
      const sessionID = this.props.session.id
      const { chapter } = this.props
      // console.log('eventMap', event.session, sessionID)
      if(event.session === undefined){

      } else if (event.session.id === sessionID){
        return  <EventCard key={event.id} session={event.session} chapter={chapter} character={event.character} event={event}/>
      }
    })
  }

  componentDidMount(){
    const chapterID = this.props.match.params.chapter
    this.props.loadChapter(chapterID)
  }

  componentWillUnmount(){
    this.props.setSession({title: '', events: []})
  }

  componentWillMount(){
    const sessionID = this.props.match.params.session
    this.props.loadSession(sessionID)
  }

  render() {
    const { classes } = this.props;
    const { chapter } = this.props
    const { campaign } = this.props
    return (
      <div style={{flexDirection: 'row'}}>
        <div style={{backgroundColor: '#424242', padding: '1vh', maxHeight: '30vh'}}>
          <List dense>
            <ListItem button onClick={this.campaignClick}>
              <Typography variant='subheading'>{campaign.title}</Typography>
            </ListItem>
            <ListItem button onClick={this.chapterClick}>
              <Typography variant='display1'>{`${chapter.title} - "${this.props.session.title}"`}</Typography>
            </ListItem>
            <ListItem>
              <Typography align='justify' paragraph>{chapter.description}</Typography>
            </ListItem>
          </List>
        </div>
        <div  className={classes.root}>
        <div className={classes.cardDiv}>
            {this.mapEvents()}
        </div>
        <div>
          <EventTextField sessionID={this.props.session} user={this.props.currentUser}/>
        </div>
      </div>
      {/* <div>
          <PlayerDrawer campaign={campaign}/>
      </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {

  return{
    currentUser: state.initReducer.currentUser,
    eventArray: state.campaignReducer.campaignEvents,
    chapter: state.campaignReducer.currentChapter,
    session: state.campaignReducer.currentSession,
    campaign: state.campaignReducer.currentCampaign,
  }
}

export default withRouter(compose(
  connect(mapStateToProps, { createEvent, loadSession, setSession, loadChapter, setChapter, setCampaign }),
  withTheme(),
  withStyles(styles))(EventSplash))
