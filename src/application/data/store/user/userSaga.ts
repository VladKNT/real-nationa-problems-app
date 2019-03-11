import { put, call } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import {
  FETCH_USER_PROFILE_REQUESTING,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_ERROR,

  CREATE_USER_PROFILE_REQUESTING,
  CREATE_USER_PROFILE_SUCCESS,
  CREATE_USER_PROFILE_ERROR,

  LOGIN_USER_PROFILE_REQUESTING,
  LOGIN_USER_PROFILE_SUCCESS,
  LOGIN_USER_PROFILE_ERROR,

  UPDATE_USER_PROFILE_REQUESTING,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_ERROR
} from "./userActionTypes";

import UserResolver from '../../../../api/graphql/relsolvers/user';
import nav from "../../services/NavigationSecrvice";
import SplashScreen from "react-native-splash-screen";

export function* getUser() {
  yield put({ type: FETCH_USER_PROFILE_REQUESTING });
  const accessToken = yield call([AsyncStorage, 'getItem'], '@SessionStorage:accessToken');
  if (accessToken) {
    try {
      const user =  yield call(UserResolver.getUser);
      if (user){
        yield put({ type: FETCH_USER_PROFILE_SUCCESS, user });
        return user;
      }

      return null;
    } catch (error) {
      yield put({ type: FETCH_USER_PROFILE_ERROR, error });
      console.warn('Error getting user: ' + error);
    }
  } else {
    yield put({ type: FETCH_USER_PROFILE_ERROR, error: 'Unauthorized' });
    console.warn('Error getting user: Unauthorized');
  }
}

export function* routeCurrentUser() {
  try {
    const user = yield getUser();

    if (user) {
      nav.navigate('FeedScreen');
      SplashScreen.hide();
    } else {
      nav.navigate('SignInScreen');
      SplashScreen.hide();
    }
  } catch (error) {
    console.warn('Error route current user ' + error);
  }
}

export function* signUp(action: any) {
  try {
    const { email, password, firstName, lastName, username } = action;
    yield put({ type: CREATE_USER_PROFILE_REQUESTING });

    const tokenPair =  yield call(UserResolver.signUp, { email, password, firstName, lastName, username });

    if (tokenPair) {
      yield AsyncStorage.setItem('@SessionStorage:accessToken', tokenPair.accessToken);
      yield AsyncStorage.setItem('@SessionStorage:refreshToken', tokenPair.refreshToken);
      yield put({ type: CREATE_USER_PROFILE_SUCCESS });
      yield call(routeCurrentUser);
    }
  } catch (error) {
    yield put({ type: CREATE_USER_PROFILE_ERROR, error });
    console.warn('Sign up error ' + error);
  }
}

export function* signIn(action: any) {
  try {
    const { login, password } = action;
    yield put({ type: LOGIN_USER_PROFILE_REQUESTING });

    const tokenPair =  yield call(UserResolver.signIn, { login, password });

    if (tokenPair) {
      yield AsyncStorage.setItem('@SessionStorage:accessToken', tokenPair.accessToken);
      yield AsyncStorage.setItem('@SessionStorage:refreshToken', tokenPair.refreshToken);

      yield call(routeCurrentUser);
      yield put({ type: LOGIN_USER_PROFILE_SUCCESS });
    }
  } catch (error) {
    yield put({ type: LOGIN_USER_PROFILE_ERROR, error });
    console.warn('Sign in error ' + error);
  }
}

export function* signOut() {
  try {
    yield AsyncStorage.removeItem('@SessionStorage:accessToken');
    yield AsyncStorage.removeItem('@SessionStorage:refreshToken');

    nav.navigate('SignInScreen');
  } catch (error) {
    console.warn('Sign out error ' + error);
  }
}

export function* updateUserProfile(action: any) {
  try {
  const { id, username, firstName, lastName, imageFile, bio } = action;
  yield put({  type:  UPDATE_USER_PROFILE_REQUESTING });

  const user = yield call(UserResolver.updateUser, { id, username, firstName, lastName, imageFile, bio });

  if (user){
    yield put({ type: UPDATE_USER_PROFILE_SUCCESS, user });
    return user;
  }

  return null;
  } catch (error) {
    yield put({ type: UPDATE_USER_PROFILE_ERROR, error });
    console.warn('Update user profile error ' + error);
  }
}