import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import compose from 'recompose/compose'

import { withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import ChapterCard from '../Chapter/ChapterCard';
import ChapterForm from '../Chapter/ChapterForm'


class ChapterSplash extends React.Component{

  state = {
    setOpen: false
  }

  renderChapters = () => {
    if(this.props.campaign.chapters){
      return this.props.campaign.chapters.map(c =>{
        console.log(c);
      return <ChapterCard chapter={c}/>
      })
    }
  }

  handleClose = () => {
    this.setState({setOpen: false})
  }

  render () {
    console.log('campaign splash render', this.props.campaign)
    return (
      <div>
        <ChapterForm open={this.state.setOpen} campaign={this.props.campaign} handleClose={this.handleClose}/>
        <div style={{backgroundColor: '#424242', padding: '1vh'}}>
          <List dense>
            <ListItem>
              <Typography variant='display1'>{`${this.props.campaign.title}`}</Typography>
              <ListItemSecondaryAction>
                <Button color='primary' variant='extendedFab' onClick={() => this.setState({setOpen: true})}>
                  New Chapter
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <Typography align='justified' paragraph>{this.props.campaign.description}</Typography>
            </ListItem>
          </List>
        </div>
      <div style={{overflow: 'auto', height: '75vh', minWidth: '70vw'}}>
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
    campaign: state.campaignReducer.currentCampaign
  }
}

export default  withRouter(compose(
  connect(mapStateToProps),
  )(ChapterSplash))

  // withStyles(styles)
