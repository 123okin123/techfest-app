//@flow

import {API_URL} from '../constants'


export const uploadServices = {
    uploadToS3,
    uploadMultiToS3
};

type SignedRequest = {
    signedRequestURL: string,
    url: string,
    key: string
};

function uploadMultiToS3(files: Array<{}>): Promise<Array<string>> {
    let uploads = files.map(file=>uploadToS3(file));
    return Promise.all(uploads)
}


function uploadToS3(file: any) :Promise<string> {
    return getSignedRequest(file)
        .then((signedRequest: SignedRequest) :Promise<SignedRequest> =>  {
            return uploadFile(file, signedRequest)})
        .then((signedRequest: SignedRequest) :string => {
            return signedRequest.key;
        })
        .catch(err => {
            console.error(err);
            return Promise.reject(err);
        });
}

function getSignedRequest(file: any) :Promise<SignedRequest>  {
    const fileName = generateUUID();
    return fetch(API_URL + `/public/sign-s3-upload?file-name=${fileName}&file-type='${file.type}'&file-size=${file.size}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`${response.status}: ${response.statusText}`);
            }
            return response.json();
        });
}


function uploadFile(file: any, signedRequest: SignedRequest) :Promise<SignedRequest> {
    return new Promise((resolve, reject)=> {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', signedRequest.signedRequestURL, true);
        xhr.onload =  () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(signedRequest);
            } else {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror =  () => {
            reject({
                status: xhr.status,
                statusText: xhr.statusText
            });
        };
        xhr.send(file);
    })
}




function generateUUID() { // Public Domain/MIT
    let d = new Date().getTime();
    //$FlowFixMe
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : ((r & 0x3) | 0x8)).toString(16);
    });
}


export default uploadServices;
