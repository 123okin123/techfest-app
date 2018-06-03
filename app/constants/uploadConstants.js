//@flow

export const uploadConstants = {
    UPLOAD_REQUEST: 'UPLOAD_REQUEST',
    UPLOAD_SUCCESS: 'UPLOAD_SUCCESS',
    UPLOAD_FAILURE: 'UPLOAD_FAILURE',
};

export type UploadAction =
   { type: 'UPLOAD_REQUEST' }
  | { type: 'UPLOAD_SUCCESS', keys: Array<string> }
  | { type: 'UPLOAD_FAILURE', error: string }
