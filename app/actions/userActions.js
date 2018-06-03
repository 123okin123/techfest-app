//@flow
import {userConstants, type User} from '../constants';
import userService from '../services/userServices';
import { uploadActions} from './uploadActions';
import type {Dispatch} from "../constants";
import type {UserState} from "../reducers/userReducer";
import type {State} from '../reducers'
import {AsyncStorage} from "react-native";


export const userActions = {
    register,
    uploadFileAndRegister,
    login,
    logout,
    update,
    getInfo,
    fetchInfoIfNeeded,
    getUsers,
    getUsersIfNeeded,
    tokenAndRoleFromDefaults
};


function register(user: User) {
    return (dispatch: Dispatch) => {
        dispatch(request());
        return userService.register(user)
            .then( r => {
                dispatch(success());
                return Promise.resolve();
              },
                error => {
                dispatch(failure(error));
                return Promise.reject(error);
                }
            );
    };
    function request() { return { type: userConstants.REGISTER_REQUEST } }
    function success() { return { type: userConstants.REGISTER_SUCCESS } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function uploadFileAndRegister(user: User, uploadFiles: Array<any>) {
    return (dispatch: Dispatch, getState: ()=>State) => {
        return dispatch(uploadActions.uploadMulti(uploadFiles)).then(()=>{
            const keys = getState().upload.keys.map((e, i)=> {
                return {[`upload-${i}`]: e}
            });
            const newUser = {
                ...user,
                    keys
            };
            return dispatch(register(newUser))
        })
    };
}

function tokenAndRoleFromDefaults() {
    return (dispatch: any) => {
        dispatch(request());
        return  Promise.all([AsyncStorage.getItem("@TechfestStore:jwt"), AsyncStorage.getItem("@TechfestStore:role")])
          .then(
            values => {
                if (values.includes((value)=>value === null)) {
                    dispatch(failure('value is null'));
                    return Promise.reject(error);
                } else {
                    dispatch(success(...values));
                    return Promise.resolve();
                }
            },
            error => {
                dispatch(failure(error));
                return Promise.reject(error);
            }
          );
    };

    function request() { return { type: userConstants.GET_FROM_DEFAULTS_REQUEST } }
    function success(token, role) { return { type: userConstants.GET_FROM_DEFAULTS_SUCCESS, token, role } }
    function failure(error) { return { type: userConstants.GET_FROM_DEFAULTS_FAILURE, error } }
}


function login(email: string, password: string) {
    return (dispatch: any) => {
        dispatch(request());
        return userService.login(email, password)
            .then(
                user => {
                    dispatch(success(user));
                    return Promise.resolve();
                },
                error => {
                    dispatch(failure(error));
                    return Promise.reject(error);
                }
            );
    };

    function request() { return { type: userConstants.LOGIN_REQUEST } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}


function update(user: {}) {
    return (dispatch: any) => {
        dispatch(request({ user }));
        return userService.update(user)
          .then(
            user => {
                dispatch(success(user));
                return Promise.resolve();
            },
            error => {
                dispatch(failure(error));
                return Promise.reject(error);
            }
          );
    };

    function request(user) { return { type: userConstants.UPDATE_INFO_REQUEST, user } }
    function success(user) { return { type: userConstants.UPDATE_INFO_SUCCESS, user } }
    function failure(error) { return { type: userConstants.UPDATE_INFO_FAILURE, error } }
}

function fetchInfoIfNeeded() {
    return (dispatch: Dispatch, getState: () => State): Promise<void> => {
        if (shouldFetchInfo(getState().user)) {
            return dispatch(getInfo())
        } else {
            return Promise.resolve();
        }
    }
}
function shouldFetchInfo(state: UserState) :boolean {
    const user = state.data;
    if (!user) {
        return true
    } else if (state.fetchingState.fetching) {
        return false
    } else {
        return false
    }
}

function getInfo() : ()=>Promise<void> {
    return (dispatch: any) => {
        dispatch(request());
        return userService.getMe()
          .then(
            user => {
                dispatch(success(user));
                return Promise.resolve();
            },
            error => {
                dispatch(failure(error));
                return Promise.reject(error);
            }
          );
    };

    function request() { return { type: userConstants.GET_INFO_REQUEST } }
    function success(user) { return { type: userConstants.GET_INFO_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GET_INFO_FAILURE, error } }
}



function getUsers(page: number = 1) :()=>Promise<Array<User>> {
    return (dispatch: any) => {
        dispatch(request());
        return userService.getUsers(page)
          .then(
            (result: {users: Array<User>, current: number, pages: number}) => {
                dispatch(success(result.users));
                return Promise.resolve(result.users)
            },
            error => {
                dispatch(failure(error));
                return Promise.reject(error)
            }
          );
    };

    function request() { return { type: userConstants.GET_USERS_REQUEST } }
    function success(users: Array<User>) { return { type: userConstants.GET_USERS_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GET_USERS_FAILURE, error } }
}


function getUsersIfNeeded() {
    return (dispatch: any, getState: ()=>{user: UserState}) => {
        if (shouldFetchUsersChallenges(getState())) {
            dispatch(getUsers());
        }
        //$FlowFixMe
        return Promise.resolve();
    }
}

function shouldFetchUsersChallenges(state) :boolean {
    if (!state.user.users) {
        return true
    } else if (state.user.fetchingState.fetching) {
        return false
    } else {
        return false
    }
}