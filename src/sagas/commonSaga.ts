import { put, call, select } from "redux-saga/effects";
import ACTION from '../actions/ActionTypes';
import nav from '../services/NavigationSecrvice';


export function* routeCurrentUser (action: any) {
    try {
        yield put({ type: ACTION.FETCH_USER_PROFILE });
        yield put({ type: ACTION.FETCH_USER_PROFILE_SUCCESS, userProfile: {name: 'Test'} });
        setTimeout(() => nav.navigate("LoginScreen"), 5000);
    } catch (error) {
        yield put({ type: ACTION.FETCH_USER_PROFILE_ERROR, error });
        console.warn("Error route current user " + error);
    }
}