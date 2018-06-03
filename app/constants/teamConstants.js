//@flow

export const teamConstants = {
    GET_TEAMS_REQUEST : 'GET_TEAMS_REQUEST',
    GET_TEAMS_SUCCESS : 'GET_TEAMS_SUCCESS',
    GET_TEAMS_FAILURE : 'GET_TEAMS_FAILURE',

    SAVE_TEAM_REQUEST : 'SAVE_TEAM_REQUEST',
    SAVE_TEAM_SUCCESS : 'SAVE_TEAM_SUCCESS',
    SAVE_TEAM_FAILURE : 'SAVE_TEAM_FAILURE',

    UPDATE_TEAM_REQUEST : 'UPDATE_TEAM_REQUEST',
    UPDATE_TEAM_SUCCESS : 'UPDATE_TEAM_SUCCESS',
    UPDATE_TEAM_FAILURE : 'UPDATE_TEAM_FAILURE',

    DELETE_TEAM_REQUEST : 'DELETE_TEAM_REQUEST',
    DELETE_TEAM_SUCCESS : 'DELETE_TEAM_SUCCESS',
    DELETE_TEAM_FAILURE : 'DELETE_TEAM_FAILURE'
};

export type Team = {
    +_id?: string,
    +updating?: ?boolean,
    +deleting?: ?boolean,

    +name: string,
    +created_at: Date,
    +updated_at: Date,
    +participantIds: Array<string>,
    +LPDParticipantIds?: Array<string>,
    +challengeId: string,

    +imageURL?: string
}

export type TeamFilter = {
    userId?: string,
    challengeId?: string
}

export type TeamAction =
  { type: 'GET_TEAMS_REQUEST' }
  | { type: 'GET_TEAMS_SUCCESS', teams: Array<Team> }
  | { type: 'GET_TEAMS_FAILURE', error: string }

  | { type: 'SAVE_TEAM_REQUEST' }
  | { type: 'SAVE_TEAM_SUCCESS', team: Team }
  | { type: 'SAVE_TEAM_FAILURE', error: string }

  | { type: 'UPDATE_TEAM_REQUEST', team: Team }
  | { type: 'UPDATE_TEAM_SUCCESS', team: Team }
  | { type: 'UPDATE_TEAM_FAILURE', team: Team, error: string }

  | { type: 'DELETE_TEAM_REQUEST', id: string }
  | { type: 'DELETE_TEAM_SUCCESS', id: string }
  | { type: 'DELETE_TEAM_FAILURE', id: string, error: string }



