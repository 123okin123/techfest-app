import {teamConstants, type User, type Team, type Dispatch} from '../constants'
import {teamServices} from "../services/teamServices";

export const teamActions = {
    getTeamOfParticipant,
    getTeamsOfPartner,
    saveTeam,
    updateTeam
};

function getTeamOfParticipant(user: User): ()=>Promise<Array<Team>> {
    return (dispatch: Dispatch) => {
        dispatch(request());
        return teamServices.fetchTeamsWithFilter({userId: user._id, challengeId: (user.participantsFields || {}).challengeId})
          .then(
            teams => {
                dispatch(success(teams));
                return Promise.resolve(teams);
            },
            error => {
                dispatch(failure(error));
                return Promise.reject(error);
            })
    };
    function request() {return {type: teamConstants.GET_TEAMS_REQUEST }}
    function success(teams: Array<Team>) {return {type: teamConstants.GET_TEAMS_SUCCESS, teams}}
    function failure(error) {return {type: teamConstants.GET_TEAMS_FAILURE, error}}
}

function getTeamsOfPartner(user: User): ()=>Promise<Array<Team>> {
    return (dispatch: Dispatch) => {
        dispatch(request());
        return teamServices.fetchTeamsWithFilter({challengeId: (user.partnerFields || {}).challengeId})
          .then(
            teams => {
                dispatch(success(teams));
                return Promise.resolve(teams);
            },
            error => {
                dispatch(failure(error));
                return Promise.reject(error);
            })
    };
    function request() {return {type: teamConstants.GET_TEAMS_REQUEST }}
    function success(teams: Array<Team>) {return {type: teamConstants.GET_TEAMS_SUCCESS, teams}}
    function failure(error) {return {type: teamConstants.GET_TEAMS_FAILURE, error}}
}

function saveTeam(team: Team): ()=>Promise<Team> {
    return (dispatch: Dispatch) => {
        dispatch(request());
        return teamServices.saveTeam(team)
          .then(
            team => {
                dispatch(success(team));
                return Promise.resolve(team);
            },
            error => {
                dispatch(failure(error));
                return Promise.reject(error);
            })
    };
    function request() {return {type: teamConstants.SAVE_TEAM_REQUEST }}
    function success(team: Team) {return {type: teamConstants.SAVE_TEAM_SUCCESS, team}}
    function failure(error) {return {type: teamConstants.SAVE_TEAM_FAILURE, error}}
}

function updateTeam(team: Team): ()=>Promise<Team> {
    return (dispatch: Dispatch) => {
        dispatch(request(team));
        return teamServices.updateTeam(team._id ,team)
          .then(
            team => {
                dispatch(success(team));
                return Promise.resolve(team);
            },
            error => {
                dispatch(failure(team, error));
                return Promise.reject(error);
            })
    };
    function request(team) {return {type: teamConstants.UPDATE_TEAM_REQUEST, team }}
    function success(team: Team) {return {type: teamConstants.UPDATE_TEAM_SUCCESS, team}}
    function failure(team, error) {return {type: teamConstants.UPDATE_TEAM_FAILURE, team, error}}
}