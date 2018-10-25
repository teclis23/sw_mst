import request from "../utils/request";

const baseURL = "https://swapi.co/api/";


export const getPeople = (cb, errorCb) => {
    return request({
        path: baseURL + 'people',
        responseCb: cb,
        errorCb: errorCb,
    });
};