//@flow


import contactServices from '../services/contactServices'
import {contactConstants} from '../constants'



export const contactActions = {
    contact
};



function contact(message: JSON) {
    return (dispatch: any) => {
        dispatch(request());
        return contactServices.contact(message)
            .then(dispatch(success()),
                error => dispatch(failure(error)))
    };
    function request() {return {type: contactConstants.CONTACT_REQUEST}}
    function success() {return {type: contactConstants.CONTACT_SUCCESS}}
    function failure(error) {return {type: contactConstants.CONTACT_FAILURE, error}}
}



