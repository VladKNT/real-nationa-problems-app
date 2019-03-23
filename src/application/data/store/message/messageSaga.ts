import { put, call, select } from 'redux-saga/effects';
import MessageResolver from "../../../../api/graphql/relsolvers/message";
import {
  GET_MESSAGES_REQUESTING,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_ERROR,

  SEND_MESSAGE_REQUESTING,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_ERROR
} from "./messageActionTypes";

export function* getMessages() {
  try {
    const store = yield select();
    const { id: chatId } = store.chatReducer.chat;

    yield put({ type: GET_MESSAGES_REQUESTING });
    const messages = yield call(MessageResolver.getMessages, chatId);

    if (messages) {
      yield put({ type: GET_MESSAGES_SUCCESS, messages });
      return messages;
    }

    return null;
  } catch (error) {
    yield put({ type: GET_MESSAGES_ERROR, error });
    console.warn('Error get messages', error);
  }
}

export function* sendMessage() {
  try {
    const store = yield select();
    const { id: chatId } = store.chatReducer.chat;

    yield put({ type: SEND_MESSAGE_REQUESTING });
    const messages = yield call(MessageResolver.getMessages, chatId);

    if (messages) {
      yield put({ type: SEND_MESSAGE_SUCCESS, messages });
      return messages;
    }

    return null;
  } catch (error) {
    yield put({ type: SEND_MESSAGE_ERROR, error });
    console.warn('Error send message', error);
  }
}
