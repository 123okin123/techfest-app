//@flow
import {pageConstants, type Action} from '../constants'

export type Pages = {
    +[string]: {
        +isFetching: false,
        +id: string,
        +response: string,
        fetchingState: {
            fetching?: boolean,
            success?: boolean,
            error?: boolean
        }
    }
}


export function pages(state: Pages = {fetchingState: {}}, action: Action) :Pages {
    switch (action.type) {
        case pageConstants.PAGE_REQUEST:
            return {
                ...state,
                [action.id]:{
                    fetchingState: {fetching: true}
                }
            };
        case pageConstants.PAGE_SUCCESS:
            return {
                ...state,
                [action.id]: {
                    fetchingState: {success: true},
                    response: action.response
                }
            };
        case pageConstants.PAGE_FAILURE:
            return {
                ...state,
                [action.id]: {
                    fetchingState: {error: action.error},
                    response: action.error
                }
            };
        default:
            return state
    }
}

