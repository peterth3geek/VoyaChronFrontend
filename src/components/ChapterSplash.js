import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles';
import { withTheme } from '@material-ui/core/styles';
import { setChapter, setCampaign, loadChapter, loadLocations } from '../actions'
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import Button from '@material-ui/core/Button';
import SessionCard from './SessionCard';
import SessionForm from './SessionForm'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';


class ChapterSplash extends React.Component{

  state = {
    setOpen: false
  }

  handleClose = () => {
    this.setState({setOpen: false})
  }

  renderChapters = () => {

    if(this.props.chapter.story_modules){
      return this.props.chapter.story_modules.map(story =>{
        return <SessionCard session={story} chapter={this.props.chapter} campaign={this.props.campaign}/>
      })
    }
  }

  campaignClick = () => {
    this.props.setCampaign(this.props.campaign)
    this.props.history.push(`/campaign/${this.props.campaign.id}`)
  }

  componentDidMount(){
    if (!!this.props.chapter.title === false){
      const chaptID = this.props.match.params.chapter
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
        <SessionForm open={this.state.setOpen} chapter={this.props.chapter} campaign={this.props.campaign} handleClose={this.handleClose}/>
        <div style={{backgroundColor: '#424242', padding: '1vh', maxHeight: '30vh', minWidth: '70vw'}}>
          <List dense>
            <ListItem button onClick={this.campaignClick}>
              <Typography variant='subheading'>{this.props.campaign.title}</Typography>
            </ListItem>
            <ListItem>
              <Typography variant='display1'>{`${this.props.chapter.title}`}</Typography>
              <ListItemSecondaryAction>
                <Button color='primary' variant='extendedFab' onClick={() => this.setState({setOpen: true})}>
                  New Session
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <Typography align='justify' paragraph>{this.props.chapter.description}</Typography>
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
  // console.log('in map state to props', state)
  return{
    currentUser: state.initReducer.currentUser,
    chapter: state.campaignReducer.currentChapter,
    campaign: state.campaignReducer.currentCampaign,
    locations: state.campaignReducer.locations
  }
}

export default  withRouter(compose(
  connect(mapStateToProps, { setChapter, loadChapter, setCampaign, loadLocations }),
  withTheme(),
)(ChapterSplash))
