import React from 'react';
import { withRouter } from 'react-router-dom'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';


const styles = {
  card: {
    margin: '2vw',
    minWidth: 370,
    maxWidth: '30vw',
    height: 325,
    backgroundColor: '#616161',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
    overflow: 'hidden',
    align: 'center',
    height: 145,
  },
};

class CharacterCard extends React.Component{

  render () {
    // console.log(this.props.campaign)
    const { character } = this.props
    const { classes } = this.props;
    return (
      <div >
        <Card className={classes.card}>
          <CardActionArea style={{minWidth: 370, maxWidth: '30vw',}}>
            <CardHeader
              title={character.name}
              subheader='Dungeons and Dragons Non-Fetched' />
          <CardContent>
            <Typography className={classes.pos} component="p">
              {character.biography}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Typography className={classes.pos}>
            <Button size='small' color='secondary' onClick={()=>this.props.history.push(`/campaign/${character.campaign.id}`)}>Campaign: {this.props.campaign.title}</Button>
          </Typography>
        </CardActions>
        </Card>
      </div>
    )
  }
}



CharacterCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(CharacterCard));
