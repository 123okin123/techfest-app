//@flow

import {store} from "./index";
import {TECHFEST_API_KEY} from '../constants'



export function authHeader() {
    // return authorization header with jwt token
    //let user = JSON.parse(localStorage.getItem('user'));


    let token = store.getState().authentication.token;
    if (token) {
        return {
            'x-access-token': 'Bearer ' + token,
            'x-access-apikey': TECHFEST_API_KEY
        };
    } else {
        return {
            'x-access-apikey': TECHFEST_API_KEY
        };
    }
}