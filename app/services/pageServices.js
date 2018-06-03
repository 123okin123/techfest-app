//@flow

import {authHeader} from "../helpers";
import {API_URL} from '../constants';


const pageServices = {
    fetchPage
};

function fetchPage(id: string): Promise<{}> {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(API_URL + `/public/wp-api/pages/${id}`, requestOptions)
        .then(handleResponse);
}


function handleResponse(response) :Promise<JSON> {
    if (!response.ok) {
        return response.json().then(body => {
            let errorDescription = body.reason || response.statusText;
            return Promise.reject(errorDescription)});
    }
    return response.json();
}


export default pageServices;