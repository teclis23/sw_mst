import React from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import { Switch, Route, BrowserRouter, Router  } from "react-router-dom";
import { inject, observer} from "mobx-react";
import createDebug from "debug";


import Home from "./../screen/Home";
import Details from "./../screen/Details";
const debug = createDebug("SWAPI: App");

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
      },
    palette: {
      primary: { main: `#34495e`, light: `#7f8c8d`, dark: `#2c3e50` },
      secondary: { main: '#1abc9c', dark: `#16a085` },
      warning: { main: `#e74c3c`, dark: `#c0392b`, light: `#e67e22`},
    },
});

@inject("appStore")
@observer
export default class App extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.appStore = props.appStore;
    }

    render () {
        return (
            <MuiThemeProvider theme={theme}>
                <BrowserRouter>
                        <Switch>
                            <Route path='/details' component={Details}/>
                            <Route exact path='/' component={Home}/>
                        </Switch>
                </BrowserRouter>                 
            </MuiThemeProvider>   
        );
    }
}

