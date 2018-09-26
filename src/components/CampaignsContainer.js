import React from 'react';
import { connect } from 'react-redux'
import compose from 'recompose/compose'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import CampaignCard from './CampaignCard'
import NoDataCard from './NoDataCard'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    marginLeft: '2vw',
    marginRight: '2vw',
    marginBottom: '2vh',
    backgroundColor: 'inherit'
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class CampaignsContainer extends React.Component{
  state = {
    loading: true
  }

  mountCampaigns = () => {
    if(this.props.campaigns.length > 0){
      return  this.props.campaigns.map(campaign => {
          return <CampaignCard key={campaign.id} campaign={campaign} />
        })
    } else {
      return <NoDataCard type='Campaign'/>
    }

  }

  componentDidMount(){
    this.setState({loading: false})
  }

  render () {
    const { classes } = this.props;

    const flexContainer = {
      display: 'flex',
      flexDirection: 'row',
      padding: '0.5vw',
      overflow: 'scroll'
    }

    return (
      <div>
        <Card className={classes.card}>
        <div>
          <Typography variant='headline' component='h1'>
            Campaigns:
          </Typography>
        </div>
        <CardContent style={flexContainer}>
          {this.mountCampaigns()}
        </CardContent>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    campaigns: state.initReducer.currentUser.campaigns,
  }
}

CampaignsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default compose(withStyles(styles), connect(mapStateToProps))(CampaignsContainer)
