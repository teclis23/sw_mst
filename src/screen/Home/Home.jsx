import React from "react";
import ReactDOM from "react-dom";
import { inject, observer} from "mobx-react";
import { Link } from 'react-router-dom';
import createDebug from "debug";
import {PaperSheet} from "../../element";
import PeopleTable from "../../component";
import {ApplicationBar} from "../../element";
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import {ToolbarContent} from "./element";

const debug = createDebug("SWAPI: Home");

@inject("appStore")
@observer
export default class Home extends React.Component {
    constructor(props,context){
        super(props,context);

        this.appStore = this.props.appStore;
        this.people = this.appStore.people;

      

    }

    render () {
        return (
            <div>
                <ApplicationBar title="Star Wars characters" toolbarContent={<ToolbarContent/>}/>
               
                <PaperSheet>
                    <PeopleTable isLoading={this.people.isLoading}/>
                </PaperSheet>
               
            
            </div>
        );
    }
};