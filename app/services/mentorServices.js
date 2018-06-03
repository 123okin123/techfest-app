//@flow


import {authHeader, store, handleResponse} from "../helpers";
import {type Mentor, API_URL} from '../constants';

const mentorServices = {
    fetchMentors,
    saveMentor,
    updateMentor,
    deleteMentor
};

function fetchMentors(): Promise<Array<Mentor>> {
    let token = store.getState().authentication.token;
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(API_URL + '/mentors/?token=' + token, requestOptions)
      .then(handleResponse)
      .then(response=>Promise.resolve(response.mentors));
}

function saveMentor(mentor: {}) :Promise<Mentor> {
    let token = store.getState().authentication.token;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(mentor)
    };
    return fetch(API_URL + '/mentors/?token=' + token, requestOptions)
      .then(handleResponse).then(response=>Promise.resolve(response.mentor));
}

function updateMentor(id: string, mentor: Mentor) :Promise<Mentor> {
    let token = store.getState().authentication.token;
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(mentor)
    };
    return fetch(API_URL + '/mentors/'+ id +'?token=' + token, requestOptions)
      .then(handleResponse).then(response=>Promise.resolve(response.mentor));
}

function deleteMentor(id: string): Promise<JSON> {
    let token = store.getState().authentication.token;
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(API_URL + '/mentors/' + id + '?token=' + token, requestOptions).then(handleResponse);
}


export default mentorServices;