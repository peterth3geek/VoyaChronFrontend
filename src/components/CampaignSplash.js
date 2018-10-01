import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import compose from 'recompose/compose'

import { withStyles } from '@material-ui/core/styles';
import { withTheme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import Typography from '@material-ui/core/Typography';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import Button from '@material-ui/core/Button';
import { createEvent } from '../actions';
import ChapterCard from './ChapterCard';

class ChapterSplash extends React.Component{

  renderChapters = () => {
    return this.props.campaign.chapters.map(c =>{
      console.log(c);
    return <ChapterCard campaign={this.props.campaign} chapter={c}/>
    })
  }

  // chapterClick = (e) => {
  //   const { campaign } = this.props;
  //   this.props.history.push(`/campaigns/${campaign.id}`)
  // }

  render () {
    return (
      <div>
        <div style={{backgroundColor: '#424242', padding: '1vh'}}>
          <Typography align='center' variant='display3'>{this.props.currentCampaign.title}</Typography>
          <Typography align='center' paragraph>
            {this.props.currentCampaign.description}
          </Typography>
        </div>
      <div>
        <Typography align='center' variant='display3'>
          Chapters:
        </Typography>
      </div>
      <div style={{overflow: 'auto', height: '75vh',}}>
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
  // console.log('in map state to props', state)
  return{
    currentUser: state.initReducer.currentUser,
    currentCampaign: state.campaignReducer.currentCampaign
  }
}

export default  withRouter(compose(
  connect(mapStateToProps),
  withTheme(),
  )(ChapterSplash))

  // withStyles(styles)
