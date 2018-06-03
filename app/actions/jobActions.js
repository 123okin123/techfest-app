//@flow

import {type Dispatch, jobConstants, type Job} from "../constants";
import {type JobsState} from "../reducers/jobsReducer";
import jobServices from '../services/jobServices';
import {type State} from '../reducers'

export const jobActions = {
    fetchJobsIfNeeded,
    saveJob,
    updateJob,
    deleteJob
};

function fetchJobsIfNeeded() {
    return (dispatch: Dispatch, getState: () => State): Promise<void> => {
        if (shouldFetchJobs(getState().jobs)) {
            return dispatch(fetchJobs())
        } else {
            return Promise.resolve();
        }
    }
}

function fetchJobs()  {
    return (dispatch: Dispatch) => {
        dispatch(request());
        return jobServices.fetchJobs()
          .then(
            jobs => {
                dispatch(success(jobs));
                return Promise.resolve();
            },
            error => {
                dispatch(failure(error));
                return Promise.reject(error);
            })
    };
    function request() {return {type: jobConstants.GET_JOBS_REQUEST }}
    function success(jobs) {return {type: jobConstants.GET_JOBS_SUCCESS, jobs}}
    function failure(error) {return {type: jobConstants.GET_JOBS_FAILURE, error}}
}

function shouldFetchJobs(state: JobsState) :boolean {
    const jobs = state.items;
    if (!jobs) {
        return true
    } else if (state.fetching) {
        return false
    } else {
        return false
    }
}


function saveJob(job: Job) {
    return (dispatch: Dispatch) => {
        dispatch(request());
        return jobServices.saveJob(job)
          .then(
            (newJob: Job) => {
                dispatch(success(newJob));
                return Promise.resolve(newJob);
            },
            error => {
                dispatch(failure(error));
                return Promise.reject(error);
            })
    };
    function request() {return {type: jobConstants.SAVE_JOB_REQUEST }}
    function success(job) {return {type: jobConstants.SAVE_JOB_SUCCESS, job }}
    function failure(error) {return {type: jobConstants.SAVE_JOB_FAILURE, error}}
}

function updateJob(job: Job) {
    return (dispatch: Dispatch) => {
        dispatch(request(job));
        return jobServices.updateJob(job._id, job)
          .then(
            (job) => {
                dispatch(success(job));
                return Promise.resolve(job);
            },
            error => {
                dispatch(failure(job, error));
                return Promise.reject(error);
            })
    };
    function request(job) {return {type: jobConstants.UPDATE_JOB_REQUEST, job }}
    function success(job) {return {type: jobConstants.UPDATE_JOB_SUCCESS, job }}
    function failure(job,error) {return {type: jobConstants.UPDATE_JOB_FAILURE, job, error}}
}

function deleteJob(id: string) {
    return (dispatch: Dispatch) => {
        dispatch(request(id));
        return jobServices.deleteJob(id)
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
    function request(id) {return {type: jobConstants.DELETE_JOB_REQUEST, id }}
    function success(id) {return {type: jobConstants.DELETE_JOB_SUCCESS, id }}
    function failure(id, error) {return {type: jobConstants.DELETE_JOB_FAILURE, id, error}}
}

