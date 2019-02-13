import { takeLatest } from "redux-saga/effects";
import ACTION from '../redux/actions/ActionTypes';
import * as commonSaga from './commonSaga';
import * as userProfileSaga from './userProfileSaga';


function* rootSaga() {
  yield takeLatest(ACTION.ROUTE_CURRENT_USER, commonSaga.routeCurrentUser);
  yield takeLatest(ACTION.CREATE_USER_PROFILE, userProfileSaga.signUp);
  yield takeLatest(ACTION.LOGIN_USER_PROFILE, userProfileSaga.signIn);
  yield takeLatest(ACTION.UPDATE_USER_PROFILE, userProfileSaga.updateUserProfile);
}

export default rootSaga;
