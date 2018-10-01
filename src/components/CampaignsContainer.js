import React from 'react';
import { connect } from 'react-redux'
import compose from 'recompose/compose'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import CampaignCard from './CampaignCard'
import NoDataCard from './NoDataCard'

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    width: '50vw',
    height: '55vh',
    overflow: 'auto',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '2vh',
    backgroundColor: 'inherit',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridTile: {
    minWidth: 400,
    maxWidth: '30vw',
    height: 350,
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

  mountCampaigns = (style) => {
    if(this.props.campaigns.length > 0){
      return  this.props.campaigns.map(campaign => {
        return (<GridListTile style={{height: 375}} className={style}>
        <CampaignCard key={campaign.id} campaign={campaign} />
      </GridListTile>)
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
      padding: '0.5vw',
      overflow: 'scroll',
      alignItems: 'center',
    }

    return (
      <div className={classes.card}>
        <div>
          <Typography variant='display2' component='h1'>
            Campaigns:
          </Typography>
        </div>
        <div  style={flexContainer}>
          <GridList className={classes.grid} cols={2}>
          {this.mountCampaigns(classes.gridTile)}
        </GridList>
        </div>
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
