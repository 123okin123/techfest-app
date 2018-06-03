//@flow

export const jobConstants = {
    GET_JOBS_REQUEST : 'GET_JOBS_REQUEST',
    GET_JOBS_SUCCESS : 'GET_JOBS_SUCCESS',
    GET_JOBS_FAILURE : 'GET_JOBS_FAILURE',

    SAVE_JOB_REQUEST : 'SAVE_JOB_REQUEST',
    SAVE_JOB_SUCCESS : 'SAVE_JOB_SUCCESS',
    SAVE_JOB_FAILURE : 'SAVE_JOB_FAILURE',

    UPDATE_JOB_REQUEST : 'UPDATE_JOB_REQUEST',
    UPDATE_JOB_SUCCESS : 'UPDATE_JOB_SUCCESS',
    UPDATE_JOB_FAILURE : 'UPDATE_JOB_FAILURE',

    DELETE_JOB_REQUEST : 'DELETE_JOB_REQUEST',
    DELETE_JOB_SUCCESS : 'DELETE_JOB_SUCCESS',
    DELETE_JOB_FAILURE : 'DELETE_JOB_FAILURE'
};

export type Job = {
    +_id: string,
    +updating?: ?boolean,
    +deleting?: ?boolean,
    +company: string,
}

export type JobAction =
   { type: 'GET_JOBS_REQUEST' }
  | { type: 'GET_JOBS_SUCCESS', jobs: Array<Job> }
  | { type: 'GET_JOBS_FAILURE', error: string }
  | { type: 'SAVE_JOB_REQUEST' }
  | { type: 'SAVE_JOB_SUCCESS', job: Job }
  | { type: 'SAVE_JOB_FAILURE', error: string }
  | { type: 'UPDATE_JOB_REQUEST', job: Job }
  | { type: 'UPDATE_JOB_SUCCESS', job: Job }
  | { type: 'UPDATE_JOB_FAILURE', job: Job, error: string }
  | { type: 'DELETE_JOB_REQUEST', id: string }
  | { type: 'DELETE_JOB_SUCCESS', id: string }
  | { type: 'DELETE_JOB_FAILURE', id: string, error: string }



