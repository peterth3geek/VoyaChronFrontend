import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
  card: {
    marginLeft: '2vw',
    marginRight: '2vw',
    maxWidth: '20vw',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class CampaignCard extends React.Component{

  render () {
    const { classes } = this.props;
    return (
      <div >
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="headline" component="h2">
              No {this.props.type}s to display
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color='secondary' onClick={this.props.handleOpen}>Create a {this.props.type}</Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}



CampaignCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CampaignCard);
