import { put, call } from 'redux-saga/effects';
import {
  CREATE_PRIVATE_CHAT_REQUESTING,
  CREATE_PRIVATE_CHAT_SUCCESS,
  CREATE_PRIVATE_CHAT_ERROR,

  GET_CHAT_REQUESTING,
  GET_CHAT_SUCCESS,
  GET_CHAT_ERROR
} from "./chatActionTypes";
import ChatResolver from '../../../../api/graphql/relsolvers/chat';

export function* createPrivateChat(action: any) {
  try {
    const { recipientId } = action;

    yield put({ type: CREATE_PRIVATE_CHAT_REQUESTING });
    const chat = yield call(ChatResolver.createPrivateChat, recipientId);

    if (chat){
      yield put({ type: CREATE_PRIVATE_CHAT_SUCCESS, chat });
      return chat;
    }

    return null;

  } catch (error) {
    yield put({ type: CREATE_PRIVATE_CHAT_ERROR, error });
    console.warn('Error create private chat: Unauthorized');
  }
}

export function* getChat(action: any) {
  try {
    const { id } = action;

    yield put({ type: GET_CHAT_REQUESTING });
    const chat = yield call(ChatResolver.getChat, id);

    if (chat){
      yield put({ type: GET_CHAT_SUCCESS, chat });
      return chat;
    }

    return null;

  } catch (error) {
    yield put({ type: GET_CHAT_ERROR, error });
    console.warn('Error get chat: Unauthorized');
  }
}
