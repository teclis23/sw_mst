import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import {Provider, inject, observer} from "mobx-react";
import {AppStore} from "./store/AppStore";
import css from "./static/style/css/base.css";

import App from "./app";

const initialState = {}

let appStore = AppStore.create();

function renderApp(store) {
  try {
    ReactDOM.render(
        <Provider appStore={store}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
        </Provider>,
        document.getElementById("root")
    );
  } catch (e) {
      console.error({e});
  }
}

renderApp(appStore);
window.appStore = () => appStore;