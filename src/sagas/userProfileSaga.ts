import { put, call, select } from "redux-saga/effects";
import ACTION from '../actions/ActionTypes';
import nav from '../services/NavigationSecrvice';


export function* createUserProfile (action: any) {
    try {
        yield put({ type: ACTION.CREATE_USER_PROFILE_REQUESTING });
        yield put({ type: ACTION.CREATE_USER_PROFILE_SUCCESS, userProfile: {name: 'Test'} });

    } catch (error) {
        yield put({ type: ACTION.CREATE_USER_PROFILE_ERROR, error });
        console.warn("Error route current user " + error);
    }
}

export function* loginUserProfile (action: any) {
    try {
        yield put({ type: ACTION.LOGIN_USER_PROFILE_REQUESTING });
        yield put({ type: ACTION.LOGIN_USER_PROFILE_SUCCESS, userProfile: {name: 'Test'} });

    } catch (error) {
        yield put({ type: ACTION.LOGIN_USER_PROFILE_ERROR, error });
        console.warn("Error route current user " + error);
    }
}