import { AnyAction } from "redux";
import _ from "lodash";
import { IMessage, IMessageReducer } from "../../../../constants/types/message"
import { initUser } from "../user/userReducer";

import {
  GET_MESSAGES_REQUESTING,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_ERROR,

  SEND_MESSAGE_REQUESTING,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_ERROR,

  SUBSCRIBED_MESSAGE,

  CLEAN_MESSAGES
} from "./messageActionTypes";


export const initMessage: IMessage = {
  id: "",
  message: "",
  chatId: "",
  ownerId: "",
  owner: initUser,
  deleted: false,
  deletedForAll: false,
  edited: false,
  createdAt: "",
  updatedAt: ""
};

export const initState = {
  message: initMessage,
  messages: [],
  loading: false,
  error: ''
};

export default function (state: IMessageReducer = initState, action: AnyAction) {
  switch (action.type) {
    case GET_MESSAGES_REQUESTING:
    case SEND_MESSAGE_REQUESTING: {
      return {
        ...state,
        loading: true
      }
    }

    case GET_MESSAGES_SUCCESS: {
      return {
        ...state,
        loading: false,
        messages: _.unionWith(state.messages, action.messages, (item1, item2) => {
          return item1.id === item2.id;
        })
      }
    }

    case SEND_MESSAGE_SUCCESS: {
      return {
        ...state,
        loading: false,
        messages: [ action.deliveredMessage, ...state.messages ]
      }
    }

    case SUBSCRIBED_MESSAGE: {
      return {
        ...state,
        messages: [action.message, ...state.messages]
      }
    }

    case CLEAN_MESSAGES: {
      return {
        ...state,
        messages: []
      }
    }

    case GET_MESSAGES_ERROR:
    case SEND_MESSAGE_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error
      }
    }
  }

  return state;
}
