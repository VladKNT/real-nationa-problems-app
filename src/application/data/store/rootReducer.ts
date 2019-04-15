import { combineReducers } from "redux";

import messageReducer from "./message/messageReducer";
import userProfileReducer from "./user/userReducer";
import eventReducer from "./event/eventReducer";
import chatReducer from "./chat/chatReducer";

import { IUserReducer } from "../../../constants/types/user";
import { IEventReducer } from "../../../constants/types/event";
import { IChatReducer } from "../../../constants/types/chat";
import { IMessageReducer } from "../../../constants/types/message";

export interface IReducerStates {
  userProfileReducer: IUserReducer,
  messageReducer: IMessageReducer,
  eventReducer: IEventReducer,
  chatReducer: IChatReducer,
}

export default combineReducers({
  userProfileReducer,
  messageReducer,
  eventReducer,
  chatReducer
})
