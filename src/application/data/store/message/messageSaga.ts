import { put, call, select } from 'redux-saga/effects';
import MessageResolver from "../../../../api/graphql/relsolvers/message";
import {
  GET_MESSAGES_REQUESTING,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_ERROR,

  SEND_MESSAGE_REQUESTING,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_ERROR,

  READ_MESSAGES_REQUESTING,
  READ_MESSAGES_SUCCESS,
  READ_MESSAGES_ERROR
} from "./messageActionTypes";

export function* getMessages() {
  try {
    const store = yield select();
    const { id: chatId } = store.chatReducer.chat;
    const messagesLength = store.messageReducer.messages.length;
    const page = Math.trunc(messagesLength / 20) + 1;

    yield put({ type: GET_MESSAGES_REQUESTING });
    const messages = yield call(MessageResolver.getMessages, chatId, page);

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

export function* sendMessage(action: any) {
  try {
    const store = yield select();
    const { id: chatId } = store.chatReducer.chat;
    const { message } = action;
    yield put({ type: SEND_MESSAGE_REQUESTING });
    const deliveredMessage = yield call(MessageResolver.sendMessage, message, chatId);

    if (deliveredMessage) {
      yield put({ type: SEND_MESSAGE_SUCCESS, deliveredMessage });
      return deliveredMessage;
    }

    return null;
  } catch (error) {
    yield put({ type: SEND_MESSAGE_ERROR, error });
    console.warn('Error send message', error);
  }
}

export function* readMessages(action: any) {
  try {
    const { messagesId } = action;

    yield put({ type: READ_MESSAGES_REQUESTING });
    const readMessages = yield call(MessageResolver.readMessages, messagesId);

    if (readMessages) {
      yield put({ type: READ_MESSAGES_SUCCESS, messagesId });
      return readMessages;
    }

    return null;
  } catch (error) {
    yield put({ type: READ_MESSAGES_ERROR, error });
    console.warn('Error read messages', error);
  }
}
