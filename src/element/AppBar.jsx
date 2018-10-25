import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';


const styles = {
    root: {
      flexGrow: 1,
    },
  };

  function ApplicationBar(props) {
    const { classes, title, toolbarContent } = props;
  
    return (
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" color="inherit">
                {title}
            </Typography>
            {toolbarContent}
          </Toolbar>
          
        </AppBar>
      </div>
    );
  }
  
  ApplicationBar.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
  };
  
  export default withStyles(styles)(ApplicationBar);