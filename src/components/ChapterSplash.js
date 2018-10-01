import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import compose from 'recompose/compose'

import { withStyles } from '@material-ui/core/styles';
import { withTheme } from '@material-ui/core/styles';
import { setChapter, loadChapter } from '../actions'

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import Typography from '@material-ui/core/Typography';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import Button from '@material-ui/core/Button';
import { createEvent } from '../actions';
import SessionCard from './SessionCard';

class ChapterSplash extends React.Component{

  renderChapters = () => {
    // console.log(this.props)
    return this.props.currentChapter.story_modules.map(story =>{
      console.log('session', story);
    return <SessionCard session={story} chapter={this.props.currentChapter} campaign={this.props.currentCampaign}/>
    })
  }

  // chapterClick = (e) => {
  //   const { campaign } = this.props;
  //   this.props.history.push(`/campaigns/${campaign.id}`)
  // }

  componentDidMount(){
    if (!!this.props.currentChapter.title === false){
      const chaptID = this.props.match.params.chapter
      console.log(chaptID)
    return  this.props.loadChapter(chaptID)
    }
    // this.props.campaignReducer.currentCampaign.chapters
  }

  render () {
    // console.log('CHAPTER CARD', this.props)

    return (
      <div style={{
        height: '75vh',
        overflow: 'auto',
        // position: 'fixed',
        // bottom: 0
      }}>
      <div>
        <Typography align='center' variant='display3'>
          Sessions:
        </Typography>
      </div>
      <GridList style={{display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'}} cols={2}>
        {this.renderChapters()}
      </GridList>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('in map state to props', state)
  return{
    currentUser: state.initReducer.currentUser,
    currentChapter: state.campaignReducer.currentChapter,
    currentCampaign: state.campaignReducer.currentCampaign
  }
}

export default  withRouter(compose(
  connect(mapStateToProps, { setChapter, loadChapter }),
  withTheme(),
)(ChapterSplash))
