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

  CLEAN_MESSAGES,

  READ_MESSAGES_SUCCESS,
  READ_MESSAGES_ERROR
} from "./messageActionTypes";
import message from "../../../../api/graphql/relsolvers/message";


export const initMessage: IMessage = {
  id: "",
  message: "",
  chatId: "",
  ownerId: "",
  owner: initUser,
  deleted: false,
  deletedForAll: false,
  edited: false,
  read: false,
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
      const index = _.findIndex(state.messages, { id: action.deliveredMessage.id });

      if (index === -1) {
        return {
          ...state,
          loading: false,
          messages: [ action.deliveredMessage, ...state.messages ]
        }
      }

      return {
        ...state,
        loading: false
      }
    }

    case SUBSCRIBED_MESSAGE: {
      const index = _.findIndex(state.messages, { id: action.message.id });

      if (index === -1) {
        return {
          ...state,
          messages: [action.message, ...state.messages]
        }
      }

      return { ...state }
    }

    case CLEAN_MESSAGES: {
      return {
        ...state,
        messages: []
      }
    }

    case READ_MESSAGES_SUCCESS: {
      return {
        ...state,
        messages: _.map(state.messages, (message) => {
          if (_.includes(action.messagesId, message.id)) {
            return { ...message, read: true }
          }

          return message;
        })
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
