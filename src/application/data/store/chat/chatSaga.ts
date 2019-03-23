import { put, call } from 'redux-saga/effects';
import {
  CREATE_PRIVATE_CHAT_REQUESTING,
  CREATE_PRIVATE_CHAT_SUCCESS,
  CREATE_PRIVATE_CHAT_ERROR,

  GET_CHAT_REQUESTING,
  GET_CHAT_SUCCESS,
  GET_CHAT_ERROR
} from "./chatActionTypes";
import { GET_MESSAGES } from "../message/messageActionTypes";
import ChatResolver from '../../../../api/graphql/relsolvers/chat';
import nav from "../../services/NavigationSecrvice";

export function* createPrivateChat(action: any) {
  try {
    const { recipientId } = action;

    yield put({ type: CREATE_PRIVATE_CHAT_REQUESTING });
    const chat = yield call(ChatResolver.createPrivateChat, recipientId);

    if (chat) {
      yield put({ type: CREATE_PRIVATE_CHAT_SUCCESS, chat });
      yield put({ type: GET_MESSAGES });
      nav.navigate('ChatScreen');
      return chat;
    }


    return null;

  } catch (error) {
    yield put({ type: CREATE_PRIVATE_CHAT_ERROR, error });
    console.warn('Error create private chat', error);
  }
}

export function* getChat(action: any) {
  try {
    const { id } = action;

    yield put({ type: GET_CHAT_REQUESTING });
    const chat = yield call(ChatResolver.getChat, id);

    if (chat) {
      yield put({ type: GET_CHAT_SUCCESS, chat });
      yield put({ type: GET_MESSAGES });

      return chat;
    }

    return null;

  } catch (error) {
    yield put({ type: GET_CHAT_ERROR, error });
    console.warn('Error get chat', error);
  }
}
