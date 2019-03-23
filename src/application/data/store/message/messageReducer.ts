import { AnyAction } from "redux";
import { IMessage, IMessageReducer } from "../../../../constants/types/message"
import { initUser } from "../user/userReducer";

import {
  GET_MESSAGES_REQUESTING,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_ERROR
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
  messages: [initMessage],
  loading: false,
  error: ''
};

export default function (state: IMessageReducer = initState, action: AnyAction) {
  switch (action.type) {
    case GET_MESSAGES_REQUESTING: {
      return {
        ...state,
        loading: true
      }
    }

    case GET_MESSAGES_SUCCESS: {
      return {
        ...state,
        loading: false,
        messages: action.messages
      }
    }

    case GET_MESSAGES_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error
      }
    }
  }

  return state;
}
