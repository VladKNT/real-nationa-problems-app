import { takeLatest } from "redux-saga/effects";
import { ROUTE_CURRENT_USER, CREATE_USER_PROFILE, LOGIN_USER_PROFILE, UPDATE_USER_PROFILE } from "./user/userActionTypes";
import { FETCH_EVENT, FETCH_EVENTS, CREATE_EVENT, FOLLOW_EVENT } from "./event/eventActionTypes";
import * as userProfileSaga from './user/userSaga';
import * as eventSaga from './event/eventSaga';


function* rootSaga() {
  yield takeLatest(ROUTE_CURRENT_USER, userProfileSaga.routeCurrentUser);
  yield takeLatest(CREATE_USER_PROFILE, userProfileSaga.signUp);
  yield takeLatest(LOGIN_USER_PROFILE, userProfileSaga.signIn);
  yield takeLatest(UPDATE_USER_PROFILE, userProfileSaga.updateUserProfile);
  
  yield takeLatest(FETCH_EVENT, eventSaga.getEvent);
  yield takeLatest(FETCH_EVENTS, eventSaga.getEvents);
  yield takeLatest(CREATE_EVENT, eventSaga.createEvent);
  yield takeLatest(FOLLOW_EVENT, eventSaga.followEvent);
}

export default rootSaga;
