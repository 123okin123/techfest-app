import {authHeader, store} from "../helpers";
import {Challenge, API_URL} from "../constants";



export const challengeServices = {
    getChallenges,
    updateChallenge
};

function getChallenges() {
    let token = store.getState().authentication.token;
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(API_URL + '/challenges'+'?token=' + token, requestOptions).then(handleResponse);
}

function updateChallenge(id: string, challenge: Challenge) {
    let token = store.getState().authentication.token;
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(challenge)
    };
    return fetch(API_URL + '/challenges/' + id +'?token=' + token, requestOptions).then(handleResponse);
}

function handleResponse(response) :Promise<JSON> {
    if (!response.ok) {
        return Promise.reject('An error occurred.')
    }
    return response.json();
}
