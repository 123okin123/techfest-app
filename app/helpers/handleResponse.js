

export function handleResponse(response) :Promise<JSON> {
    if (!response.ok) {
        return response.json().then(
          json=> Promise.reject(json.error + ' ' + json.reason)
          , err => Promise.reject('An error occurred.'));
    }
    return response.json();
}