//@flow

import {type Dispatch, mentorConstants, type Mentor} from "../constants";
import {type MentorsState} from "../reducers/mentorsReducer";
import mentorServices from '../services/mentorServices';
import {type State} from '../reducers'

export const mentorActions = {
    fetchMentorsIfNeeded,
    saveMentor,
    updateMentor,
    deleteMentor
};

function fetchMentorsIfNeeded() {
    return (dispatch: Dispatch, getState: () => State): Promise<void> => {
        if (shouldFetchMentors(getState().mentors)) {
            return dispatch(fetchMentors())
        } else {
            return Promise.resolve();
        }
    }
}

function fetchMentors() {
    return (dispatch: Dispatch) => {
        dispatch(request());
        return mentorServices.fetchMentors()
          .then(
            mentors => {
                dispatch(success(mentors));
                return Promise.resolve();
            },
            error => {
                dispatch(failure(error));
                return Promise.reject(error);
            })
    };
    function request() {return {type: mentorConstants.GET_MENTORS_REQUEST }}
    function success(mentors) {return {type: mentorConstants.GET_MENTORS_SUCCESS, mentors}}
    function failure(error) {return {type: mentorConstants.GET_MENTORS_FAILURE, error}}
}

function shouldFetchMentors(state: MentorsState) :boolean {
    const mentors = state.items;
    if (state.fetchingState.fetching) {
        return false
    } else if (!mentors || mentors.length === 0) {
        return true
    } else {
        return false
    }
}


function saveMentor(mentor: Mentor) {
    return (dispatch: Dispatch) => {
        dispatch(request());
        return mentorServices.saveMentor(mentor)
          .then(
            (newMentor: Mentor) => {
                dispatch(success(newMentor));
                return Promise.resolve(newMentor);
            },
            error => {
                dispatch(failure(error));
                return Promise.reject(error);
            })
    };
    function request() {return {type: mentorConstants.SAVE_MENTOR_REQUEST }}
    function success(mentor) {return {type: mentorConstants.SAVE_MENTOR_SUCCESS, mentor }}
    function failure(error) {return {type: mentorConstants.SAVE_MENTOR_FAILURE, error}}
}

function updateMentor(mentor: Mentor) {
    return (dispatch: Dispatch) => {
        dispatch(request(mentor));
        return mentorServices.updateMentor(mentor._id, mentor)
          .then(
            (mentor) => {
                dispatch(success(mentor));
                return Promise.resolve(mentor);
            },
            error => {
                dispatch(failure(mentor, error));
                return Promise.reject(error);
            })
    };
    function request(mentor: Mentor) {return {type: mentorConstants.UPDATE_MENTOR_REQUEST, mentor }}
    function success(mentor: Mentor) {return {type: mentorConstants.UPDATE_MENTOR_SUCCESS, mentor }}
    function failure(mentor,error) {return {type: mentorConstants.UPDATE_MENTOR_FAILURE, mentor, error}}
}

function deleteMentor(id: string) {
    return (dispatch: Dispatch) => {
        dispatch(request(id));
        return mentorServices.deleteMentor(id)
          .then(
            () => {
                dispatch(success(id));
                return Promise.resolve(id);
            },
            error => {
                dispatch(failure(id, error));
                return Promise.reject(error);
            })
    };
    function request(id) {return {type: mentorConstants.DELETE_MENTOR_REQUEST, id }}
    function success(id) {return {type: mentorConstants.DELETE_MENTOR_SUCCESS, id }}
    function failure(id, error) {return {type: mentorConstants.DELETE_MENTOR_FAILURE, id, error}}
}

