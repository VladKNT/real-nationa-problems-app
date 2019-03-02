import { combineReducers } from 'redux';

import userProfileReducer, { IUserProfileReducer } from './user/userReducer';
import eventReducer, { IEventReducer } from './event/eventReducer';

export interface IReducerStates {
  userProfileReducer: IUserProfileReducer,
  eventReducer: IEventReducer
}

export default combineReducers({
  userProfileReducer,
  eventReducer
})