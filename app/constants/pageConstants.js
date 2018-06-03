//@flow

 export const pageConstants = {
     PAGE_REQUEST : 'PAGE_REQUEST',
     PAGE_SUCCESS : 'PAGE_SUCCESS',
     PAGE_FAILURE : 'PAGE_FAILURE'
};

export type PageAction =
   { type: 'PAGE_REQUEST', id: string }
  | { type: 'PAGE_SUCCESS', id: string, response: string }
  | { type: 'PAGE_FAILURE', id: string, error: string }



