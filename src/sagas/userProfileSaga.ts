import { put, call, select } from "redux-saga/effects";
import { AsyncStorage } from 'react-native';
import ACTION from '../redux/actions/ActionTypes';
import UserResolver from '../api/graphql/relsolvers/user';
import { routeCurrentUser } from './commonSaga';


export function* getUser() {
  yield put({ type: ACTION.FETCH_USER_PROFILE_REQUESTING });
  const accessToken = yield call([AsyncStorage, "getItem"], "@SessionStorage:accessToken");
  if (accessToken) {
    try {
      const userProfile =  yield call(UserResolver.getUser);
      if (userProfile){
        yield put({ type: ACTION.FETCH_USER_PROFILE_SUCCESS, userProfile });
        return userProfile;
      }

      return null;
    } catch (error) {
      yield put({ type: ACTION.FETCH_USER_PROFILE_ERROR, error });
      console.warn("Error getting user: " + error);
    }
  }
}

export function* signUp(action: any) {
  try {
    const { email, password, firstName, lastName, username } = action;
    yield put({ type: ACTION.CREATE_USER_PROFILE_REQUESTING });

    const tokenPair =  yield call(UserResolver.signUp, { email, password, firstName, lastName, username });

    if (tokenPair) {
      yield AsyncStorage.setItem("@SessionStorage:accessToken", tokenPair.accessToken);
      yield AsyncStorage.setItem("@SessionStorage:refreshToken", tokenPair.refreshToken);
      yield call(routeCurrentUser);

      yield put({ type: ACTION.CREATE_USER_PROFILE_SUCCESS, userProfile: {name: 'Test'} });
    }
  } catch (error) {
    yield put({ type: ACTION.CREATE_USER_PROFILE_ERROR, error });
    console.warn("Sign up error " + error);
  }
}

export function* signIn(action: any) {
  try {
    const { login, password } = action;
    yield put({ type: ACTION.LOGIN_USER_PROFILE_REQUESTING });

    const tokenPair =  yield call(UserResolver.signIn, { login, password });

    if (tokenPair) {
      yield AsyncStorage.setItem("@SessionStorage:accessToken", tokenPair.accessToken);
      yield AsyncStorage.setItem("@SessionStorage:refreshToken", tokenPair.refreshToken);

      yield call(routeCurrentUser);
      yield put({ type: ACTION.LOGIN_USER_PROFILE_SUCCESS });
    }
  } catch (error) {
    yield put({ type: ACTION.LOGIN_USER_PROFILE_ERROR, error });
    console.warn("Sign in error " + error);
  }
}