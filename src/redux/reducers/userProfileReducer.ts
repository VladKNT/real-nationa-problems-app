import ACTION from '../actions/ActionTypes';
import { AnyAction } from 'redux';

const initialState = {
  user: null,

  loading: false,
  error: ''
};

export interface IUserProfileReducer {
  user: any,
  loading: boolean,
  error: string
}

export default function(state: IUserProfileReducer = initialState, action: AnyAction) {
  switch (action.type) {
    case ACTION.FETCH_USER_PROFILE_REQUESTING: {
      return {
        ...state,
        loading: true
      };
    }

    case ACTION.FETCH_USER_PROFILE_SUCCESS: {
      return {
        ...state,
        user: action.user,
        loading: false,
      }
    }

    case ACTION.FETCH_USER_PROFILE_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false
      }
    }
  }

  return state
}