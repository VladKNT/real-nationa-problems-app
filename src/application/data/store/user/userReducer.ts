import { AnyAction } from "redux";
import {
  FETCH_USER_PROFILE_REQUESTING,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_ERROR,

  UPDATE_USER_PROFILE_REQUESTING,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_ERROR,

  GET_USER_BY_ID_REQUESTING,
  GET_USER_BY_ID_SUCCESS,
  GET_USER_BY_ID_ERROR
} from "./userActionTypes";
import { IUser, IUserProfile, IUserReducer } from "../../../../constants/types/user";

export const initUserProfile: IUserProfile = {
  firstName: '',
  lastName: '',
  profilePhoto: '',
  bio: ''
};

export const initUser: IUser = {
  id: '',
  username: '',
  email: '',
  userProfile: initUserProfile
};

const initialState = {
  user: initUser,
  selectedUser: initUser,
  loading: false,
  error: ''
};

export default function(state: IUserReducer = initialState, action: AnyAction) {
  switch (action.type) {
    case FETCH_USER_PROFILE_REQUESTING:
    case GET_USER_BY_ID_REQUESTING:
    case UPDATE_USER_PROFILE_REQUESTING: {
      return {
        ...state,
        loading: true
      };
    }

    case FETCH_USER_PROFILE_SUCCESS:
    case UPDATE_USER_PROFILE_SUCCESS: {
      return {
        ...state,
        user: action.user,
        loading: false,
      }
    }

    case FETCH_USER_PROFILE_ERROR:
    case GET_USER_BY_ID_ERROR:
    case UPDATE_USER_PROFILE_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false
      }
    }

    case GET_USER_BY_ID_SUCCESS: {
      return {
        ...state,
        selectedUser: action.user,
        loading: false
      }
    }
  }

  return state;
}