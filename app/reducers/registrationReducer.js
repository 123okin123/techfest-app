//@flow

import { userConstants, type Action } from '../constants';

type State = {
    +registering?: boolean,
    +registrationSuccess?: boolean,
    +error?: string
}

export function registration(state: State = {}, action: Action):State {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return { registering: true };
        case userConstants.REGISTER_SUCCESS:
            return {registrationSuccess: true};
        case userConstants.REGISTER_FAILURE:
            return {registrationSuccess: false, error: action.error};
        default:
            return state
    }
}