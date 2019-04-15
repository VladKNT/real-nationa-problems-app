import {
  ROUTE_CURRENT_USER,
  CREATE_USER_PROFILE,
  UPDATE_USER_PROFILE,
  GET_USER_BY_ID,
  LOGIN_USER_PROFILE,
  LOGOUT_USER,
  CLEAN_SELECTED_USER
} from "./userActionTypes";

import { IEditProfile } from "../../../../constants/types/user";
import { ISignInParameters, ISignUpParameters} from "../../../../constants/types/auth";

export const routeCurrentUser = () => {
  return {
    type: ROUTE_CURRENT_USER
  }
};

export const signUp = ({ email, password, firstName, lastName, username }: ISignUpParameters) => {
  return {
    type: CREATE_USER_PROFILE,
    email,
    password,
    firstName,
    lastName,
    username
  }
};

export const signIn = ({ login, password }: ISignInParameters) => {
  return {
    type: LOGIN_USER_PROFILE,
    login,
    password
  }
};

export const signOut = () => {
  return {
    type: LOGOUT_USER
  }
};

export const updateUserProfile = ({ id, username, firstName, lastName, imageFile, bio }: IEditProfile) => {
  return {
    type: UPDATE_USER_PROFILE,
    id,
    username,
    firstName,
    lastName,
    imageFile,
    bio
  }
};

export const getUserById = (id: string) => {
  return {
    type: GET_USER_BY_ID,
    id
  }
};

export const cleanSelectedUser = () => {
  return {
    type: CLEAN_SELECTED_USER
  }
};
