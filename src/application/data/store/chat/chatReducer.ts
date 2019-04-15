import { AnyAction } from "redux";
import _ from "lodash";
import { IChat, IChatReducer } from "../../../../constants/types/chat";
import {
  CREATE_PRIVATE_CHAT_REQUESTING,
  CREATE_PRIVATE_CHAT_SUCCESS,
  CREATE_PRIVATE_CHAT_ERROR,

  GET_CHAT_REQUESTING,
  GET_CHAT_SUCCESS,
  GET_CHAT_ERROR,

  USER_CHATS_REQUESTING,
  USER_CHATS_SUCCESS,
  USER_CHATS_ERROR,

  CLEAN_CHAT,

  SUBSCRIBED_CHAT
} from "./chatActionTypes";
import { initUser } from "../user/userReducer";
import { initMessage } from "../message/messageReducer";

export const initChat: IChat = {
  id: '',
  name: '',
  description: '',
  icon: '',
  private: true,
  unreadMessages: '0',
  lastMessage: initMessage,
  members: [initUser],
  creatorId: ''
};

const initState: IChatReducer = {
  chat: initChat,
  userChats: [],
  loading: false,
  error: ''
};

export default function (state: IChatReducer = initState, action: AnyAction) {
  switch (action.type) {
    case GET_CHAT_REQUESTING:
    case USER_CHATS_REQUESTING:
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

    case USER_CHATS_SUCCESS: {
      return {
        ...state,
        userChats:  _.orderBy(action.userChats, ( chat ) => (chat.lastMessage ? chat.lastMessage.createdAt : ""), 'desc'),
        loading: false
      }
    }

    case CLEAN_CHAT: {
      return {
        ...state,
       chat: []
      }
    }

    case SUBSCRIBED_CHAT: {
      const chats = state.userChats;
      const index = _.findIndex(chats, { id: action.chat.id });

      if (index === -1) {
        chats.push(action.chat);
      } else {
        chats[index] = action.chat;
      }

      return {
        ...state,
        userChats:  _.orderBy(chats, ( chat ) => (chat.lastMessage ? chat.lastMessage.createdAt : ""), 'desc'),
      }
    }

    case GET_CHAT_ERROR:
    case USER_CHATS_ERROR:
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
