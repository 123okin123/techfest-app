//@flow

import { contactConstants, type Action } from '../constants';

export type ContactState = {
    +contacting?: boolean,
    +contactSuccess?: boolean,
}

export function contact(state: ContactState = {}, action: Action):ContactState {
    switch (action.type) {
        case contactConstants.CONTACT_REQUEST:
            return { contacting: true };
        case contactConstants.CONTACT_SUCCESS:
            return {contactSuccess: true};
        case contactConstants.CONTACT_FAILURE:
            return {contactSuccess: false};
        default:
            return state
    }
}