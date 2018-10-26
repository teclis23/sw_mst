import React from "react";
import ReactDOM from "react-dom";
import { Link } from 'react-router-dom';
import { inject, observer, computed} from "mobx-react";
import {ApplicationBar} from "../../element";
import {PaperSheet} from "../../element";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import createDebug from "debug";

const debug = createDebug("SWAPI: Details");


@inject("appStore")
@observer
export default class Details extends React.Component {
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

        return (
            <div>
                <ApplicationBar title="Star Wars character editor" toolbarContent={<ToolbarContent/>}/>
                <h1>Details page</h1>
                <Link to={`/`}>Home</Link>

                <PaperSheet>
                    
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
                            <Button color="secondary" variant="contained" size="small" onClick={this.deletePerson}>
                                Delete
                            </Button>
                        </Link>
                </PaperSheet>
            </div>
            
        );
    }
}

class ToolbarContent extends React.Component {

    render() {
        return (
        <div></div>
        );
    }
}