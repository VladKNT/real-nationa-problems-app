import { AnyAction } from "redux";
import { IChat, IChatReducer } from "../../../../constants/types/chat";
import {
  CREATE_PRIVATE_CHAT_REQUESTING,
  CREATE_PRIVATE_CHAT_SUCCESS,
  CREATE_PRIVATE_CHAT_ERROR,

  GET_CHAT_REQUESTING,
  GET_CHAT_SUCCESS,
  GET_CHAT_ERROR
} from "./chatActionTypes";
import { initUser } from "../user/userReducer";
import { initMessage } from "../message/messageReducer";

export const initChat: IChat = {
  id: '',
  name: '',
  description: '',
  icon: '',
  private: true,
  lastMessage: initMessage,
  members: [initUser],
  creatorId: ''
};

const initState: IChatReducer = {
  chat: initChat,
  loading: false,
  error: ''
};

export default function (state: IChatReducer = initState, action: AnyAction) {
  switch (action.type) {
    case GET_CHAT_REQUESTING:
    case CREATE_PRIVATE_CHAT_REQUESTING: {
      return {
        ...state,
        loading: true
      }
    }

    case GET_CHAT_SUCCESS:
    case CREATE_PRIVATE_CHAT_SUCCESS: {
      return {
        ...state,
        chat: action.chat,
        loading: false
      }
    }

    case GET_CHAT_ERROR:
    case CREATE_PRIVATE_CHAT_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false
      }
    }
  }

  return state;
}
