import ACTION from './ActionTypes';
import { SignUpParameters, SignInParameters } from '../../constants/types';

export const routeCurrentUser = () => {
  return {
    type: ACTION.ROUTE_CURRENT_USER
  }
};

export const signUp = ({ email, password, firstName, lastName, username }: SignUpParameters) => {
  return {
    type: ACTION.CREATE_USER_PROFILE,
    email,
    password,
    firstName,
    lastName,
    username
  }
};

export const signIn = ({ login, password }: SignInParameters) => {
  return {
    type: ACTION.LOGIN_USER_PROFILE,
    login,
    password
  }
};