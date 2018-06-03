//@flow


import {authHeader, store} from "../helpers";
import {type Job, API_URL} from '../constants'

const jobServices = {
    fetchJobs,
    saveJob,
    updateJob,
    deleteJob
};

function fetchJobs() :Promise<Array<Job>> {
    let token = store.getState().authentication.token;
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(API_URL + '/jobs/?token=' + token, requestOptions)
      .then(handleResponse)
      .then(response=>Promise.resolve(response.jobs));
}

function saveJob(job: Job) :Promise<Job> {
    let token = store.getState().authentication.token;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(job)
    };
    return fetch(API_URL + '/jobs/?token=' + token, requestOptions)
      .then(handleResponse).then(response=>Promise.resolve(response.job));
}

function updateJob(id: string, job: Job): Promise<Job> {
    let token = store.getState().authentication.token;
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(job)
    };
    return fetch(API_URL + '/jobs/'+ id +'?token=' + token, requestOptions)
      .then(handleResponse).then(response=>Promise.resolve(response.job));
}

function deleteJob(id: string): Promise<JSON> {
    let token = store.getState().authentication.token;
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(API_URL + '/jobs/' + id + '?token=' + token, requestOptions).then(handleResponse);
}


function handleResponse(response) :Promise<JSON> {
    if (!response.ok) {
        return response.json().then(
          json=> Promise.reject(json.error + ' ' + json.reason)
        , err => Promise.reject('An error occurred.'));
    }
    return response.json();
}


export default jobServices;