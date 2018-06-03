//@flow

import type {Dispatch, Challenge} from '../constants'
import {challengeServices} from "../services/challengeServices";
import {challengeConstants} from "../constants";
import {type ChallengeState} from '../reducers/challengeReducer';

export const challengeActions = {
    getChallenges,
    getChallengesIfNeeded,
    updateChallenge
};

function getChallengesIfNeeded() {
    return (dispatch: any, getState: ()=>{challenge: ChallengeState}) => {
        if (shouldFetchChallenges(getState())) {
            dispatch(getChallenges());
        }
        //$FlowFixMe
        return Promise.resolve();
    }
}

function shouldFetchChallenges(state) :boolean {
    if (state.challenge.challenges.length === 0) {
        return true
    } else if (state.challenge.fetchingState.fetching) {
        return false
    } else {
        return false
    }
}

function getChallenges(): (Dispatch)=>Promise<Array<Challenge>> {
    return (dispatch: Dispatch) => {
        dispatch(request());
        return challengeServices.getChallenges()
          .then(
            response => {
                dispatch(success(response.challenges));
                return Promise.resolve(response.challenges);
            },
            error => {
                dispatch(failure(error));
                return Promise.reject(error);
            })
    };
    function request() {return {type: challengeConstants.GET_CHALLENGES_REQUEST }}
    function success(challenges: Array<Challenge>) {return {type: challengeConstants.GET_CHALLENGES_SUCCESS, challenges}}
    function failure(error) {return {type: challengeConstants.GET_CHALLENGES_FAILURE, error}}
}

function updateChallenge(challenge: Challenge): (Dispatch)=>Promise<Challenge> {
    return (dispatch: Dispatch) => {
        dispatch(request(challenge));
        return challengeServices.updateChallenge(challenge._id ,challenge)
          .then(
            response => {
                dispatch(success(response.challenge));
                return Promise.resolve(response.challenge);
            },
            error => {
                dispatch(failure(challenge, error));
                return Promise.reject(error);
            })
    };
    function request(challenge: Challenge) {return {type: challengeConstants.UPDATE_CHALLENGE_REQUEST, challenge }}
    function success(challenge: Challenge) {return {type: challengeConstants.UPDATE_CHALLENGE_SUCCESS, challenge}}
    function failure(challenge: Challenge, error: string) {return {type: challengeConstants.UPDATE_CHALLENGE_FAILURE, challenge, error}}
}