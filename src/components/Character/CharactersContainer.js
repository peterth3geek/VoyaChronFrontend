import React from 'react';
import { connect } from 'react-redux'
import compose from 'recompose/compose'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import CharacterCard from './CharacterCard'
import NoDataCard from '../NoDataCard'
import CharacterForm from './CharacterForm'


import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    width: '50vw',
    height: '89vh',
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


class CharactersContainer extends React.Component{
  state = {
    loading: true,
    setOpen: false,
  }

  mountCharacters = (style) => {
    if(this.props.characters.length > 0){
      return  this.props.characters.map(character => {
          return (
            <GridListTile style={{height: 375}} className={style}>
              <CharacterCard key={character.id} character={character} campaign={character.campaign} />
            </GridListTile>
          )
        })
    } else {
      return <NoDataCard type='Character' handleOpen={()=>this.setState({setOpen: true})}/>
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
            Characters
            <IconButton color='primary' onClick={() => this.setState({setOpen: true})}><AddIcon fontSize='small'/></IconButton>
          </Typography>
        </div>
        <CharacterForm open={this.state.setOpen} handleClose={() => this.setState({setOpen: false})}/>
        <div style={flexContainer}>
          <GridList className={classes.grid} cols={2}>
            {this.mountCharacters(classes.gridTile)}
          </GridList>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    characters: state.initReducer.currentUser.characters
  }
}

CharactersContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default compose(withStyles(styles), connect(mapStateToProps))(CharactersContainer)
