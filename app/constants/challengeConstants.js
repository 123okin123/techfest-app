

//@flow

export const challengeConstants = {
    GET_CHALLENGES_REQUEST : 'GET_CHALLENGES_REQUEST',
    GET_CHALLENGES_SUCCESS : 'GET_CHALLENGES_SUCCESS',
    GET_CHALLENGES_FAILURE : 'GET_CHALLENGES_FAILURE',

    UPDATE_CHALLENGE_REQUEST : 'UPDATE_CHALLENGE_REQUEST',
    UPDATE_CHALLENGE_SUCCESS : 'UPDATE_CHALLENGE_SUCCESS',
    UPDATE_CHALLENGE_FAILURE : 'UPDATE_CHALLENGE_FAILURE',
};

export type Challenge = {
    +_id: string,
    +name: string,
    +track: string,
    +description: string,
    +uploads?: Array<{url: string, name: string}>,
    +text?: string,
    +supervisors?: Array<{
        firstName: string,
        lastName: string,
        imageURL?: string
    }>,
    company: string,

    updating?: boolean,
    updateError?: string


}


export type ChallengeAction =
  { type: 'GET_CHALLENGES_REQUEST' }
  | { type: 'GET_CHALLENGES_SUCCESS', challenges: Array<Challenge> }
  | { type: 'GET_CHALLENGES_FAILURE', error: string }
  | { type: 'UPDATE_CHALLENGE_REQUEST', challenge: Challenge }
  | { type: 'UPDATE_CHALLENGE_SUCCESS', challenge: Challenge }
  | { type: 'UPDATE_CHALLENGE_FAILURE', challenge: Challenge, error: string }




