import { AnyAction } from "redux";
import { IChat, IChatReducer } from "../../../../constants/types/chat";
import {
  CREATE_PRIVATE_CHAT_REQUESTING,
  CREATE_PRIVATE_CHAT_SUCCESS,
  CREATE_PRIVATE_CHAT_ERROR
} from "./chatActionTypes";
import { initUser } from "../user/userReducer";
import { initMessage } from "../message/messageReducer";

const initChat: IChat = {
  id: '',
  name: '',
  description: '',
  icon: '',
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
    case CREATE_PRIVATE_CHAT_REQUESTING: {
      return {
        ...state,
        loading: true
      }
    }

    case CREATE_PRIVATE_CHAT_SUCCESS: {
      return {
        ...state,
        chat: action.chat,
        loading: false
      }
    }

    case CREATE_PRIVATE_CHAT_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false
      }
    }
  }
}
