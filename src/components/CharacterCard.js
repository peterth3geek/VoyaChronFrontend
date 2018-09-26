import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';


const styles = {
  card: {
    marginLeft: '2vw',
    marginRight: '2vw',
    width: 350
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class CharacterCard extends React.Component{

  render () {
    // console.log(this.props.campaign)
    const { classes } = this.props;
    return (
      <div >
        <Card className={classes.card}>
          <CardActionArea>
          <CardContent>
            <Typography className={classes.title} color="textSecondary">
              Dungeons and Dragons 5e (Non-Fetched)
            </Typography>
            <Typography variant="headline" component="h2">
              {this.props.character.name}
            </Typography>
            <Typography className={classes.pos} component="p">
              {this.props.character.biography}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Typography className={classes.pos}>
            <Button size='small' color='secondary'>Campaign: {this.props.campaign.title}</Button>
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

export default withStyles(styles)(CharacterCard);
