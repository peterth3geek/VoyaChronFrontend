import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import compose from 'recompose/compose'

import { withStyles } from '@material-ui/core/styles';
import { withTheme } from '@material-ui/core/styles';
import { setChapter, loadChapter, loadLocations } from '../actions'

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import Typography from '@material-ui/core/Typography';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import Button from '@material-ui/core/Button';
import { createEvent } from '../actions';
import SessionCard from './SessionCard';
import SessionForm from './SessionForm'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';


class ChapterSplash extends React.Component{

  state = {
    setOpen: false
  }

  handleClose = () => {
    this.setState({setOpen: false})
  }

  renderChapters = () => {
    // console.log(this.props)
    return this.props.currentChapter.story_modules.map(story =>{
      // console.log('session', story);
    return <SessionCard session={story} chapter={this.props.currentChapter} campaign={this.props.currentCampaign}/>
    })
  }

  componentDidMount(){
    if (!!this.props.currentChapter.title === false){
      const chaptID = this.props.match.params.chapter
      // console.log(chaptID)
    return  this.props.loadChapter(chaptID)
    }
    // return this.props.loadLocations()
    // this.props.campaignReducer.currentCampaign.chapters
  }

  componentWillMount(){
    this.props.loadLocations()
  }

  render () {
    // console.log('render state')

    return (
      <div>
        <SessionForm open={this.state.setOpen} chapter={this.props.currentChapter} campaign={this.props.currentCampaign} handleClose={this.handleClose}/>
        <div style={{backgroundColor: '#424242', padding: '1vh', maxHeight: '30vh'}}>
          <List dense>
            <ListItem button onClick={this.campaignClick}>
              <Typography variant='subheading'>{this.props.campaign.title}</Typography>
            </ListItem>
            <ListItem button onClick={this.chapterClick}>
              <Typography variant='display1'>{`${this.props.currentChapter.title}`}</Typography>
              <ListItemSecondaryAction>
                <Button color='primary' variant='extendedFab' onClick={() => this.setState({setOpen: true})}>
                  New Session
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <Typography align='justified' paragraph>{this.props.currentChapter.description}</Typography>
            </ListItem>
          </List>
        </div>
      <div style={{
        height: '75vh',
        overflow: 'auto',
        // position: 'fixed',
        // bottom: 0
      }}>
      <GridList style={{display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'}} cols={2}>
        {this.renderChapters()}
      </GridList>
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('in map state to props', state)
  return{
    currentUser: state.initReducer.currentUser,
    currentChapter: state.campaignReducer.currentChapter,
    currentCampaign: state.campaignReducer.currentCampaign,
    locations: state.campaignReducer.locations
  }
}

export default  withRouter(compose(
  connect(mapStateToProps, { setChapter, loadChapter, loadLocations }),
  withTheme(),
)(ChapterSplash))
