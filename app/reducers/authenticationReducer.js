//@flow

import {userConstants, type Action} from '../constants';


// let user = (typeof localStorage === 'undefined') ? undefined : JSON.parse(localStorage.getItem('user'));
// const initialState = user ? { loggedIn: true, user } : {};

export type AuthState = {
    loggingIn?: boolean,
    role?: string,
    loginFailure?: boolean,
    token?: string,
    gettingFromDefaults?: boolean
}

export function authentication(state: AuthState = {gettingFromDefaults: true}, action: Action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                role: action.user.role,
                token: action.user.token
            };
        case userConstants.LOGIN_FAILURE:
            return {loginFailure: true};
        case userConstants.LOGOUT:
            return {};

        case userConstants.GET_FROM_DEFAULTS_REQUEST:
            return {
                gettingFromDefaults: true
            };
        case userConstants.GET_FROM_DEFAULTS_SUCCESS:
            return {
                loggedIn: true,
                role: action.role,
                token: action.token
            };
        case userConstants.GET_FROM_DEFAULTS_FAILURE:
            return {};
        default:
            return state
    }
}