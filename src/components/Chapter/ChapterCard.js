import React from 'react';
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import { withRouter } from 'react-router-dom'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { withTheme } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { setChapter, loadSession } from '../../actions'

import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    margin:'2vw',
    minWidth: 400,
    maxWidth: '30vw',
    minHeight: 510,
    // maxHeight: '35vh',
    backgroundColor: '#616161',
    // overflow: 'scroll'
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
    overflow: 'scroll',
    align: 'center',
    height: 125,
  },
  pos2: {
    marginBottom: 12,
    overflow: 'scroll',
    align: 'center',
    height: 175,
  },
};

class ChapterCard extends React.Component{

  state ={
    expanded: false
  }

  chapterClick = (e) => {
    const { chapter } = this.props;
    const { campaign } = this.props;

    // console.log(chapter)
    this.props.setChapter(chapter)
    this.props.history.push(`/campaign/${campaign.id}/${chapter.id}`)
  }

  sessionZoom = (storyID) => {
    const { chapter } = this.props;
    const { campaign } = this.props;

    console.log('chapter', chapter, 'campaign', campaign, 'story', storyID)
    this.props.loadSession(storyID)
    this.props.history.push(`/campaign/${campaign.id}/${chapter.id}/${storyID}`)

  }

  renderCard = () => {
    const { classes } = this.props;
    const { chapter } = this.props;
  return  (
    <div>
      <Card className={classes.card}>
      <CardActionArea onClick={this.chapterClick} style={{minWidth: 400, maxWidth: '30vw',}}>
        <CardHeader title={chapter.title} titleTypographyProps={{variant: 'display1', backgroundColor: 'primary', color: 'textPrimary'}}/>
          <CardContent>
            <Typography className={classes.pos} component="p">
              {chapter.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardContent >
          <Typography variant='title'>
            Sessions
          </Typography>
          <List style={{display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'scroll'}}
            cols={2}>
            {chapter.story_modules.map(story =>{
              // console.log(story);
              return(
                // <GridListTile>
                  // {/* <Button width={75} height={75}> */}
                  <ListItem button onClick={() => this.sessionZoom(story.id)}>
                    <ListItemText
                      primary={story.title} >
                    </ListItemText>
                  </ListItem>
                  // {/* </Button> */}
                // </GridListTile>
                )
            })}
          </List>
        </CardContent>
      </Card>
  </div>
  )
}

  render () {
    console.log(this.props)
    return (
      <div>
        {this.renderCard()}
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


ChapterCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(
  compose(
    connect(mapStateToProps, { setChapter, loadSession }),
    withStyles(styles), )(ChapterCard));
