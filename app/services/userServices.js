
import { authHeader, store } from '../helpers';
import {type User, API_URL} from "../constants";
import {AsyncStorage} from "react-native";


const userService = {
    login,
    logout,
    register,
    getById,
    getMe,
    getUsers,
    update,
    delete: _delete
};


function login(email: string, password: string) :Promise<User> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify({ email, password })
    };
    return fetch(API_URL + '/public/login', requestOptions)
        .then((response) => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return response.json();
        })
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                AsyncStorage.setItem("@TechfestStore:jwt", user.token)
                  .then(()=>AsyncStorage.setItem("@TechfestStore:role", user.role))
                  .then(()=> console.log("login success"))
                  .catch(err=>console.log(err))

            }
            return user;
        })
}

function logout() {
    AsyncStorage.multiRemove(["@TechfestStore:jwt", "@TechfestStore:role"])
      .then(()=>console.log('logout success'))
      .catch(err=>console.log(err));
}

function getUsers() :Promise<{users: Array<User>, current: number, pages: number}>{
    let token = store.getState().authentication.token;
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(API_URL+'/users?token=' + token + '&type=participants', requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(API_URL+'/users/' + id, requestOptions).then(handleResponse);
}

function getMe(): Promise<{}> {
    let token = store.getState().authentication.token;
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(API_URL+'/users/me?token=' + token , requestOptions).then(handleResponse);
}

function register(user: User) :Promise<{}> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(user)
    };
    return fetch(API_URL+'/public/register', requestOptions).then(handleResponse);
}

function update(user) {
    let token = store.getState().authentication.token;
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(user)
    };

    return fetch(API_URL+'/users/me?token=' + token, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(API_URL+'/users/' + id, requestOptions).then(handleResponse);
}

function handleResponse(response) :Promise<JSON> {
    if (!response.ok) {
        return Promise.reject('An error occurred.')
    }
    return response.json();
}


export default userService;