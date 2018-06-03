//@flow

import {type Action, jobConstants, type Job} from '../constants';

export type JobsState = {
    +fetching?: boolean,
    +items?: Array<Job>,
    +savingState?: {
        +saveError?: string,
        +saving?: boolean,
        +savingSuccess?: boolean
    },
    +fetchError?: string,
    +deleteError?: string,
    +updateError?: string,
}

export function jobs(state: JobsState = {fetching: false, savingState: {}}, action: Action):JobsState {
    switch (action.type) {
        case jobConstants.GET_JOBS_REQUEST:
            return {
                ...state,
                fetching: true
            };
        case jobConstants.GET_JOBS_SUCCESS:
            return {
                ...state,
                fetching: false,
                items: action.jobs
            };
        case jobConstants.GET_JOBS_FAILURE:
            return {
                ...state,
                fetching: false,
                fetchError: action.error
            };
        case jobConstants.SAVE_JOB_REQUEST:
            return {
                ...state,
                savingState: {saving: true}
            };
        case jobConstants.SAVE_JOB_SUCCESS:
            return {
                ...state,
                savingState: {savingSuccess: true},
                items: [...(state.items || []), action.job]
            };
        case jobConstants.SAVE_JOB_FAILURE:
            return {
                ...state,
                savingState: {saveError: action.error},
            };
        case jobConstants.DELETE_JOB_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: (state.items || []).map(job =>
                  job._id === action.id
                    ? { ...job, deleting: true }
                    : job
                )
            };
        case jobConstants.DELETE_JOB_SUCCESS:
            // remove deleted user from state
            return {
              ...state,
                items: (state.items || []).filter(job => job._id !== action.id)
            };
        case jobConstants.DELETE_JOB_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user
            return {
                ...state,
                items: (state.items || []).map(job => {
                    if (job._id === action.id) {
                        // make copy of user without 'deleting:true' property
                        const { deleting, ...userCopy } = job;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...userCopy, deleteError: action.error };
                    }
                    return job;
                })
            };
        case jobConstants.UPDATE_JOB_REQUEST:
            return {
                ...state,
                items: (state.items || []).map(job =>
                  action.job._id === job._id
                    ? {...job, updating: true}
                    : job
                )
            };
        case jobConstants.UPDATE_JOB_SUCCESS:
            return {
                ...state,
                items: (state.items || []).map(job =>
                  action.job._id === job._id
                    ? action.job
                    : job
                )
            };
        case jobConstants.UPDATE_JOB_FAILURE:
            return {
                ...state,
                items: (state.items || []).map(job => {
                    if (job._id === action.job._id) {
                        // make copy of user without 'deleting:true' property
                        const { updating, ...copy } = job;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...copy, updateError: action.error };
                    }
                    return job;
                })
            };
        default:
            return state
    }
}