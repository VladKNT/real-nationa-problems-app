import { combineReducers } from 'redux';

import userProfileReducer, { IUserProfileReducer } from './userProfileReducer';
import eventReducer, { IEventReducer } from './event';

export interface IReducerStates {
  userProfileReducer: IUserProfileReducer,
  eventReducer: IEventReducer
}

export default combineReducers({
  userProfileReducer,
  eventReducer
})