import { combineReducers } from 'redux';

import userProfileReducer, { IUserProfileReducer } from './userProfileReducer';

export interface IReducerStates {
    userProfileReducer: IUserProfileReducer
}

export default combineReducers({
    userProfileReducer
})