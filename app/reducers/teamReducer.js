import type {Team, Action} from "../constants";
import {teamConstants} from "../constants";

export type TeamState = {
    +teams: Array<Team>,
    +savingState: {
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
    teams: [],
    savingState: {},
    fetchingState: {},
};


export function team(state: TeamState = initialState, action: Action):TeamState {
    switch (action.type) {
        case teamConstants.GET_TEAMS_REQUEST:
            return { ...state, fetchingState: {fetching: true } };
        case teamConstants.GET_TEAMS_SUCCESS:
            return { ...state, teams: action.teams, fetchingState: {fetchSuccess: true }};
        case teamConstants.GET_TEAMS_FAILURE:
            return { ...state, fetchingState: {fetchError: action.error}};

        case teamConstants.SAVE_TEAM_REQUEST:
            return { ...state, savingState: {saving: true } };
        case teamConstants.SAVE_TEAM_SUCCESS:
            return { ...state, teams: [...state.teams, action.team], savingState: {savingSuccess: true }};
        case teamConstants.SAVE_TEAM_FAILURE:
            return { ...state, savingState: {saveError: action.error}};





        case teamConstants.UPDATE_TEAM_REQUEST:
            return {
                ...state,
                teams: (state.teams || []).map(team =>
                  action.team._id === team._id
                    ? {...team, updating: true}
                    : team
                )
            };
        case teamConstants.UPDATE_TEAM_SUCCESS:
            return {
                ...state,
                teams: (state.teams || []).map(team =>
                  action.team._id === team._id
                    ? action.team
                    : team
                )
            };
        case teamConstants.UPDATE_TEAM_FAILURE:
            return {
                ...state,
                teams: (state.teams || []).map(team => {
                    if (team._id === action.team._id) {
                        const { updating, ...copy } = team;
                        return { ...copy, updateError: action.error };
                    }
                    return team;
                })
            };


        default:
            return state
    }
}