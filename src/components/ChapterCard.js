import React from 'react';
import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import compose from 'recompose/compose'
import { withTheme } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Collapse from '@material-ui/core/Collapse';

import { setChapter } from '../actions'

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
  card: {
    margin:'2vw',
    minWidth: 400,
    maxWidth: '30vw',
    height: 510,
    backgroundColor: '#616161',
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

    console.log(chapter)
    this.props.setChapter(chapter)
    this.props.history.push(`/campaign/${campaign.id}/${chapter.id}`)
  }

  renderCard = () => {
    const { classes } = this.props;
    const { chapter } = this.props;
  return  (
    <div>
      <Card className={classes.card}>
      <CardActionArea onClick={this.chapterClick} style={{backgroundColor: 'primary'}}>
        <CardHeader title={chapter.title} titleTypographyProps={{variant: 'display1', backgroundColor: 'primary'}} subheader='Dungeons and Dragons 5e (Non-Fetched)' />
          <CardContent >
            <Typography className={classes.pos} component="p">
              {chapter.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardContent>
          <Typography variant='title'>
            Sessions
          </Typography>
          <List style={{display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around'}}
            cols={2}>
            {chapter.story_modules.map(story =>{
              // console.log(story);
              return(
                // <GridListTile>
                  // {/* <Button width={75} height={75}> */}
                  <ListItem button>
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


ChapterCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(compose(connect(null, { setChapter }), withStyles(styles), withTheme())(ChapterCard));
