import ACTION from './ActionTypes';
import {
  ISignUpParameters,
  ISignInParameters,
  IEditProfileParameters,
  ISaveEventParameters
} from '../../constants/types';

export const routeCurrentUser = () => {
  return {
    type: ACTION.ROUTE_CURRENT_USER
  }
};

export const signUp = ({ email, password, firstName, lastName, username }: ISignUpParameters) => {
  return {
    type: ACTION.CREATE_USER_PROFILE,
    email,
    password,
    firstName,
    lastName,
    username
  }
};

export const signIn = ({ login, password }: ISignInParameters) => {
  return {
    type: ACTION.LOGIN_USER_PROFILE,
    login,
    password
  }
};

export const updateUserProfile = ({ id, username, firstName, lastName, imageFile, bio }: IEditProfileParameters) => {
  return {
    type: ACTION.UPDATE_USER_PROFILE,
    id,
    username,
    firstName,
    lastName,
    imageFile,
    bio
  }
};

export const getEvent = (id: string) => {
  return {
    type: ACTION.FETCH_EVENT,
    id
  }
};

export const getEvents = () => {
  return {
    type: ACTION.FETCH_EVENTS
  }
};

export const setSaveEventData = (saveEvent: ISaveEventParameters) => {
  return {
    type: ACTION.SET_SAVE_EVENT_DATA,
    saveEvent
  }
};


export const clearSaveEventData = () => {
  return {
    type: ACTION.CLEAR_SAVE_EVENT_DATA,
  }
};

export const createEvent = () => {
  return{
    type: ACTION.CREATE_EVENT
  }
};
