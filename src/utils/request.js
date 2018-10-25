import axios from "axios";
import _ from "lodash";

import createDebug from "debug";

const debug = createDebug("WCP:request");

// import {getUrl, isProduction} from "./constants";

const errorCbDefault = (error) => {
    debug('uncaught error', error);
    throw error;
};
const responseCbDefault = (data, status) => {
    debug('default response', data, status);
    return data;
};

let host = '//' + location.host;


export const formUrl = (path) => {
    if (!false) {
        path += '?XDEBUG_SESSION_START=PHPSTORM';
    }
    return _.trimStart(path, '/');
};

export const request = ({
    path,
    method = "GET",
    data = null,
    responseCb,
    errorCb,
    dataType = 'json',
    cancelToken
}) => {
    if (errorCb === undefined) {
        errorCb = errorCbDefault;
    }
    if (responseCb === undefined) {
        responseCb = responseCbDefault;
    }
    let notation = {
        url: path,
        method: method,
        // dataType: dataType,
    };
    if (cancelToken !== undefined) {
        notation.cancelToken = cancelToken;
    }
    if (data) {
        switch (method) {
            case "GET":
                notation.params = data;
                break;
            default:
                notation.data = data;
        }
    }
    notation.headers = {
        'X-Requested-With': 'XMLHttpRequest'
    };
    return axios(notation)
        .then((response) => {
            debug(response);
            return responseCb(response.data, response.status)
        }, (error) => {
            if (error.message === "Request failed with status code 403") {
                window.location.reload();
            }
            return errorCb(error);
        });
};

export default request;