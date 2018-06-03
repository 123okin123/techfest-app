//@flow


import {authHeader} from "../helpers";
import {API_URL} from '../constants'

const contactServices = {
    contact
};

function contact(message: JSON): Promise<void> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(message)
    };
    return fetch(API_URL + `/public/contact`, requestOptions)
}

export default contactServices;