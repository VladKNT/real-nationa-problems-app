import { takeLatest } from "redux-saga/effects";
import ACTION from '../actions/ActionTypes';
import * as commonSaga from './commonSaga';
import * as userProfileSaga from './userProfileSaga';


function* rootSaga() {
    yield takeLatest(ACTION.ROUTE_CURRENT_USER, commonSaga.routeCurrentUser);
    yield takeLatest(ACTION.CREATE_USER_PROFILE, userProfileSaga.createUserProfile);
    yield takeLatest(ACTION.LOGIN_USER_PROFILE, userProfileSaga.loginUserProfile);
}

export default rootSaga;
