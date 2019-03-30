import { takeLatest } from "redux-saga/effects";
import {
  ROUTE_CURRENT_USER,
  CREATE_USER_PROFILE,
  LOGIN_USER_PROFILE,
  LOGOUT_USER,
  UPDATE_USER_PROFILE,
  GET_USER_BY_ID
} from "./user/userActionTypes";

import {
  FETCH_EVENT,
  FETCH_EVENTS,
  CREATE_EVENT,
  FOLLOW_EVENT
} from "./event/eventActionTypes";

import {
  CREATE_PRIVATE_CHAT,
  GET_CHAT,
  USER_CHATS
} from "./chat/chatActionTypes";

import {
  GET_MESSAGES,
  SEND_MESSAGE
} from "./message/messageActionTypes";

import * as userProfileSaga from './user/userSaga';
import * as eventSaga from "./event/eventSaga";
import * as chatSaga from "./chat/chatSaga";
import * as messageSaga from "./message/messageSaga";


function* rootSaga() {
  yield takeLatest(ROUTE_CURRENT_USER, userProfileSaga.routeCurrentUser);
  yield takeLatest(CREATE_USER_PROFILE, userProfileSaga.signUp);
  yield takeLatest(LOGIN_USER_PROFILE, userProfileSaga.signIn);
  yield takeLatest(LOGOUT_USER, userProfileSaga.signOut);
  yield takeLatest(UPDATE_USER_PROFILE, userProfileSaga.updateUserProfile);
  yield takeLatest(GET_USER_BY_ID, userProfileSaga.getUserById);

  yield takeLatest(FETCH_EVENT, eventSaga.getEvent);
  yield takeLatest(FETCH_EVENTS, eventSaga.getEvents);
  yield takeLatest(CREATE_EVENT, eventSaga.createEvent);
  yield takeLatest(FOLLOW_EVENT, eventSaga.followEvent);

  yield takeLatest(CREATE_PRIVATE_CHAT, chatSaga.createPrivateChat);
  yield takeLatest(GET_CHAT, chatSaga.getChat);
  yield takeLatest(USER_CHATS, chatSaga.userChats);

  yield takeLatest(GET_MESSAGES, messageSaga.getMessages);
  yield takeLatest(SEND_MESSAGE, messageSaga.sendMessage);
}

export default rootSaga;
