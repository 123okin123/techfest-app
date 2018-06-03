//@flow

import {type Challenge, type Action, challengeConstants, teamConstants} from '../constants'


export type ChallengeState = {
    challenges: Array<Challenge>,
    fetchingState: {
        fetching?: boolean,
        error?: string,
        success?: boolean
    }
}

const initialState :ChallengeState = {
    challenges: [],
    fetchingState: {}
};

export function challenge(state: ChallengeState = initialState, action: Action) :ChallengeState{
    switch (action.type) {
        case challengeConstants.GET_CHALLENGES_REQUEST:
            return {fetchingState: {fetching: true}, challenges: []};
        case challengeConstants.GET_CHALLENGES_SUCCESS:
            return {fetchingState: {success: true}, challenges: action.challenges};
        case challengeConstants.GET_CHALLENGES_FAILURE:
            return {fetchingState: {error: action.error}, challenges: []};

        case challengeConstants.UPDATE_CHALLENGE_REQUEST:
            return {
                ...state,
                challenges: (state.challenges || []).map(challenge =>
                  //$FlowFixMe
                  action.challenge._id === challenge._id
                    ? {...challenge, updating: true}
                    : challenge
                )
            };
        case challengeConstants.UPDATE_CHALLENGE_SUCCESS:
            return {
                ...state,
                challenges: (state.challenges || []).map(challenge =>
                  //$FlowFixMe
                  action.challenge._id === challenge._id
                    ? action.challenge
                    : challenge
                )
            };
        case challengeConstants.UPDATE_CHALLENGE_FAILURE:
            return {
                ...state,
                challenges: (state.challenges || []).map(challenges => {
                    //$FlowFixMe
                    if (challenges._id === action.challenge._id) {
                        const { updating, ...copy } = challenges;
                        //$FlowFixMe
                        return { ...copy, updateError: action.error };
                    }
                    return challenges;
                })
            };
        default:
            return state
    }
}