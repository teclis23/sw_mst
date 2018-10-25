import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer} from "mobx-react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const styles = theme => ({
    grow: {
      flexGrow: 1,
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing.unit,
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 200,
        },
      },
    },
    button: {
      margin: theme.spacing.unit,
      paddingLeft:  theme.spacing.unit *2,
      paddingRight:  theme.spacing.unit *2,
    },
  });

@inject("appStore")
@observer
class ToolbarContent extends React.Component {
  constructor(props,context) {
    super(props,context);

    this.appStore = this.props.appStore;
    this.people = this.appStore.people;

  }

  addNewPerson = () => {
      console.log("add new person click");
      this.people.addPerson();
  }

    render() {
      const { classes } = this.props;
 

        return (
            [
            <div key="flex_grow" className={classes.grow} />,

            <div key="search_field" className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>

                <InputBase
                placeholder="Filter..."
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                />
            </div>,
            <Link key="add_btn" to={`/details`}>
              <Button  color="default" variant="contained" size="small" className={classes.button} onClick={this.addNewPerson}>
                Add person
              </Button>
            </Link>
            ]
        );
    }
}

ToolbarContent.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(ToolbarContent);