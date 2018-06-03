//@flow

import { userConstants, type Action } from '../constants';
import {type User} from "../constants/userConstants";

export type UserState = {
    +data?: User,
    +users?: Array<User>,
    +fetchingState: {
        +fetching?: boolean,
        +fetchError?: string,
        +fetchSuccess?: boolean
    },
    +updatingState: {
        +updateError?: string,
        +updating?: boolean,
        +updateSuccess?: boolean
    },
    +usersFetchingState: {
        +fetching?: boolean,
        +fetchError?: string,
        +fetchSuccess?: boolean
    }
}

const initialState = {
    fetchingState: {}, updatingState: {}, usersFetchingState: {}
};

export function user(state: UserState = initialState, action: Action):UserState {
    switch (action.type) {
        case userConstants.GET_INFO_REQUEST:
            return { ...state, fetchingState: {fetching: true } };
        case userConstants.GET_INFO_SUCCESS:
            return { ...state, data: action.user, fetchingState: {fetchSuccess: true }};
        case userConstants.GET_INFO_FAILURE:
            return { ...state, fetchingState: {fetchError: action.error}};

        case userConstants.UPDATE_INFO_REQUEST:
            return {...state, updatingState: { updating: true }};
        case userConstants.UPDATE_INFO_SUCCESS:
            return {...state, data: action.user, updatingState: { updateSuccess: true }};
        case userConstants.UPDATE_INFO_FAILURE:
            return {...state, updatingState: { updateError: action.error }};

        case userConstants.GET_USERS_REQUEST:
            return {...state, usersFetchingState: {fetching: true}};
        case userConstants.GET_USERS_SUCCESS:
            return {...state, users: action.users, usersFetchingState: { fetchSuccess: true }};
        case userConstants.GET_USERS_FAILURE:
            return {...state, usersFetchingState: { fetchError: action.error }};

        case userConstants.LOGOUT:
            return initialState;
        default:
            return state
    }
}