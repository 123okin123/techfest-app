//@flow

import {uploadConstants, type Action } from "../constants";
import uploadServices from "../services/uploadServices";


export const uploadActions = {
    upload,
    uploadMulti
};

function uploadMulti(files: Array<{}>) {
    return (dispatch: any) => {
        dispatch(request());
        return uploadServices.uploadMultiToS3(files)
          .then(
            keys => {
                dispatch(success(keys))
            },
            error => {
                dispatch(failure(error));
                throw error
            }
          );
    };
    function request() :Action { return { type: uploadConstants.UPLOAD_REQUEST } }
    function success(keys) :Action { return { type: uploadConstants.UPLOAD_SUCCESS , keys} }
    function failure(error) :Action { return { type: uploadConstants.UPLOAD_FAILURE, error } }
}

function upload(file: any) {
    return (dispatch: any) => {
        if (file === null || (Object.keys(file).length === 0 && file.constructor === Object)) {
             dispatch(failure('no file.'));
             return
        }
        dispatch(request());
        return uploadServices.uploadToS3(file)
            .then(
                key => {
                    dispatch(success(key))},
                error => {
                    dispatch(failure(error));
                    throw error}
            );
    };

    function request() :Action { return { type: uploadConstants.UPLOAD_REQUEST } }
    function success(key) :Action { return { type: uploadConstants.UPLOAD_SUCCESS , key} }
    function failure(error) :Action { return { type: uploadConstants.UPLOAD_FAILURE, error } }
}

