//@flow

import {type Action, mentorConstants, type Mentor} from '../constants';

export type MentorsState = {
    +items: Array<Mentor>,
    +savingState?: {
        +saveError?: string,
        +saving?: boolean,
        +savingSuccess?: boolean
    },
    +fetchingState: {
        +fetching?: boolean,
        +fetchError?: string,
        +fetchSuccess?: boolean
    },
}
const initialState = {
    items: [],
    savingState: {},
    fetchingState: {},
};

export function mentors(state: MentorsState = initialState, action: Action):MentorsState {
    switch (action.type) {
        case mentorConstants.GET_MENTORS_REQUEST:
            return {
                ...state,
                fetchingState: {fetching: true}
            };
        case mentorConstants.GET_MENTORS_SUCCESS:
            return {
                ...state,
                fetchingState: {fetchSuccess: true},
                items: action.mentors
            };
        case mentorConstants.GET_MENTORS_FAILURE:
            return {
                ...state,
                fetchingState: {fetchError: action.error}
            };
        case mentorConstants.SAVE_MENTOR_REQUEST:
            return {
                ...state,
                savingState: {saving: true}
            };
        case mentorConstants.SAVE_MENTOR_SUCCESS:
            return {
                ...state,
                savingState: {savingSuccess: true},
                items: [...(state.items || []), action.mentor]
            };
        case mentorConstants.SAVE_MENTOR_FAILURE:
            return {
                ...state,
                savingState: {saveError: action.error},
            };
        case mentorConstants.DELETE_MENTOR_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: (state.items || []).map(mentor =>
                  mentor._id === action.id
                    ? { ...mentor, deleting: true }
                    : mentor
                )
            };
        case mentorConstants.DELETE_MENTOR_SUCCESS:
            // remove deleted user from state
            return {
                ...state,
                items: (state.items || []).filter(mentor => mentor._id !== action.id)
            };
        case mentorConstants.DELETE_MENTOR_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user
            return {
                ...state,
                items: (state.items || []).map(mentor => {
                    if (mentor._id === action.id) {
                        // make copy of user without 'deleting:true' property
                        const { deleting, ...userCopy } = mentor;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...userCopy, deleteError: action.error };
                    }
                    return mentor;
                })
            };
        case mentorConstants.UPDATE_MENTOR_REQUEST:
            return {
                ...state,
                items: (state.items || []).map(mentor =>
                  action.mentor._id === mentor._id
                    ? {...mentor, updating: true}
                    : mentor
                )
            };
        case mentorConstants.UPDATE_MENTOR_SUCCESS:
            return {
                ...state,
                items: (state.items || []).map(mentor =>
                  action.mentor._id === mentor._id
                    ? action.mentor
                    : mentor
                )
            };
        case mentorConstants.UPDATE_MENTOR_FAILURE:
            return {
                ...state,
                items: (state.items || []).map(mentor => {
                    if (mentor._id === action.mentor._id) {
                        // make copy of user without 'deleting:true' property
                        const { updating, ...copy } = mentor;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...copy, updateError: action.error };
                    }
                    return mentor;
                })
            };
        default:
            return state
    }
}