//@flow

export const mentorConstants = {
    GET_MENTORS_REQUEST : 'GET_MENTORS_REQUEST',
    GET_MENTORS_SUCCESS : 'GET_MENTORS_SUCCESS',
    GET_MENTORS_FAILURE : 'GET_MENTORS_FAILURE',

    SAVE_MENTOR_REQUEST : 'SAVE_MENTOR_REQUEST',
    SAVE_MENTOR_SUCCESS : 'SAVE_MENTOR_SUCCESS',
    SAVE_MENTOR_FAILURE : 'SAVE_MENTOR_FAILURE',

    UPDATE_MENTOR_REQUEST : 'UPDATE_MENTOR_REQUEST',
    UPDATE_MENTOR_SUCCESS : 'UPDATE_MENTOR_SUCCESS',
    UPDATE_MENTOR_FAILURE : 'UPDATE_MENTOR_FAILURE',

    DELETE_MENTOR_REQUEST : 'DELETE_MENTOR_REQUEST',
    DELETE_MENTOR_SUCCESS : 'DELETE_MENTOR_SUCCESS',
    DELETE_MENTOR_FAILURE : 'DELETE_MENTOR_FAILURE'
};

export type Mentor = {
    +_id: string,
    +updating?: ?boolean,
    +deleting?: ?boolean,

    +created_at: Date,
    +updated_at: Date,
    +firstName: string,
    +lastName: string,
    +email?: string,
    +skills: Array<string>,
    +description?: string,
    +company?: string,
    +imageURL: string
}

export type MentorAction =
   { type: 'GET_MENTORS_REQUEST' }
  | { type: 'GET_MENTORS_SUCCESS', mentors: Array<Mentor> }
  | { type: 'GET_MENTORS_FAILURE', error: string }
  | { type: 'SAVE_MENTOR_REQUEST' }
  | { type: 'SAVE_MENTOR_SUCCESS', mentor: Mentor }
  | { type: 'SAVE_MENTOR_FAILURE', error: string }
  | { type: 'UPDATE_MENTOR_REQUEST', mentor: Mentor }
  | { type: 'UPDATE_MENTOR_SUCCESS', mentor: Mentor }
  | { type: 'UPDATE_MENTOR_FAILURE', mentor: Mentor, error: string }
  | { type: 'DELETE_MENTOR_REQUEST', id: string }
  | { type: 'DELETE_MENTOR_SUCCESS', id: string }
  | { type: 'DELETE_MENTOR_FAILURE', id: string, error: string }



