//@flow

export const contactConstants = {
    CONTACT_REQUEST : 'CONTACT_REQUEST',
    CONTACT_SUCCESS : 'CONTACT_SUCCESS',
    CONTACT_FAILURE : 'CONTACT_FAILURE'
};

export type ContactAction =
 {type: 'CONTACT_REQUEST'}
| {type: 'CONTACT_SUCCESS'}
| {type: 'CONTACT_FAILURE', error: string}

