import { combineReducers } from "redux";

import userProfileReducer from "./user/userReducer";
import eventReducer from "./event/eventReducer";
import chatReducer from "./chat/chatReducer";

import { IUserReducer } from "../../../constants/types/user";
import { IEventReducer } from "../../../constants/types/event";
import { IChatReducer } from "../../../constants/types/chat";

export interface IReducerStates {
  userProfileReducer: IUserReducer,
  eventReducer: IEventReducer,
  chatReducer: IChatReducer
}

export default combineReducers({
  userProfileReducer,
  eventReducer,
  chatReducer
})
