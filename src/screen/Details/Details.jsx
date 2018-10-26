import React from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { inject, observer, computed} from "mobx-react";
import {ApplicationBar} from "../../element";
import { withStyles } from '@material-ui/core/styles';
import {PaperSheet} from "../../element";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import createDebug from "debug";

const debug = createDebug("SWAPI: Details");


const styles = theme => ({
    deleteBtn: {
        backgroundColor: theme.palette.warning.dark,
        color: `#ffffff`,
        '&:hover': {
          backgroundColor: theme.palette.warning.main ,
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
export class Details extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.appStore =  this.props.appStore;
        this.selectedPerson = this.appStore.people.selectedPerson;


        this.state = {
            nameError: false,
            name: this.selectedPerson ? this.selectedPerson.name : "",
            height: this.selectedPerson ? this.selectedPerson.height : 0,
            mass: this.selectedPerson ? this.selectedPerson.mass : 0,
        }

    }


    handleChange = name => event => {
        let value = event.target.value;
        this.setState({
          [name]: value,
          nameError: (name == 'name' && value == "") ? true : false,
        });
      };


    savePerson = () => {
        let data = {
            name: this.state.name,
            height: parseInt(this.state.height),
            mass: parseInt(this.state.mass),
        }
        this.appStore.people.savePerson(data);
    }  

    deletePerson = () => {
        console.log("AR",this.props.appStore.people.selectedPerson);
        this.appStore.people.deletePerson(this.props.appStore.people.selectedPerson);
    }

    render () {

        const { classes } = this.props;

        return (
            <div>
                <ApplicationBar title="Star Wars character editor" toolbarContent={<ToolbarContent/>}/>
                <h1>Details page</h1>
                <Link to={`/`}>Home</Link>

                <PaperSheet>
                    <div>
                        <TextField
                            label="Name"
                            required
                            error={this.state.name == ""}
                            value={this.state.name}
                            onChange={this.handleChange('name')}
                            margin="normal"
                            />
                        <TextField
                            label="Height"
                            value={this.state.height}
                            onChange={this.handleChange('height')}
                            margin="normal"
                            />
                        <TextField
                            label="Mass"
                            value={this.state.mass}
                            onChange={this.handleChange('mass')}
                            margin="normal"
                            />
                        
                        <Link to={`/`}>
                            <Button disabled={this.state.name == ""} color="primary" variant="contained" size="small" onClick={this.savePerson}>
                                Save
                            </Button>
                        </Link>
                        <Link to={`/`}>
                            <Button className={classes.button + ' ' + classes.deleteBtn} variant="contained" size="small" onClick={this.deletePerson}>
                                Delete
                            </Button>
                        </Link>
                    </div>
                </PaperSheet>
            </div>
            
        );
    }
}


Details.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(Details);

class ToolbarContent extends React.Component {

    render() {
        return (
        <div></div>
        );
    }
}