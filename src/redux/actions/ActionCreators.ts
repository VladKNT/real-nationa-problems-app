import ACTION from './ActionTypes';
import { ISignUpParameters, ISignInParameters } from '../../constants/types';

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