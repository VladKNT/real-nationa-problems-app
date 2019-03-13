import { combineReducers } from 'redux';

import userProfileReducer from './user/userReducer';
import eventReducer from './event/eventReducer';

import { IUserReducer } from '../../../constants/types/user';
import { IEventReducer } from '../../../constants/types/event';

export interface IReducerStates {
  userProfileReducer: IUserReducer,
  eventReducer: IEventReducer
}

export default combineReducers({
  userProfileReducer,
  eventReducer
})