//@flow
import type {Team, TeamFilter, API_URL} from "../constants";
import {authHeader, handleResponse, store} from "../helpers";

export const teamServices  = {
    fetchTeamsWithFilter,
    saveTeam,
    updateTeam
};



function fetchTeamsWithFilter(filter: TeamFilter): Promise<Array<Team>> {
    let token = store.getState().authentication.token;
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(API_URL + `/teams?userId=${filter.userId || ''}&challengeId=${filter.challengeId || ''}&token=` + token, requestOptions)
      .then(handleResponse)
      .then(response=>Promise.resolve(response.teams));
}

function saveTeam(team: Team) :Promise<Team> {
    let token = store.getState().authentication.token;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(team)
    };
    return fetch(API_URL + '/teams?token=' + token, requestOptions)
      .then(handleResponse).then(response=>Promise.resolve(response.team));
}

function updateTeam(id: string, team: Team) :Promise<Team> {
    let token = store.getState().authentication.token;
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(team)
    };
    return fetch(API_URL + '/teams/'+ id +'?token=' + token, requestOptions)
      .then(handleResponse).then(response=>Promise.resolve(response.team));
}