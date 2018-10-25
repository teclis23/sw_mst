import React from "react";
import ReactDOM from "react-dom";
import { Switch, Route, BrowserRouter, Router  } from "react-router-dom";
import { inject, observer} from "mobx-react";
import createDebug from "debug";


import Home from "./../screen/Home";
import Details from "./../screen/Details";
const debug = createDebug("SWAPI: App");

@inject("appStore")
@observer
export default class App extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.appStore = props.appStore;
    }

    render () {
        return (
                <BrowserRouter>
                        <Switch>
                            <Route path='/details' component={Details}/>
                            <Route exact path='/' component={Home}/>
                        </Switch>
                </BrowserRouter>                    
        );
    }
}

