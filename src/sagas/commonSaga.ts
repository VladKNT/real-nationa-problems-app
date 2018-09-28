import { put, call, select } from "redux-saga/effects";
import ACTION from '../actions/ActionTypes';
import nav from '../services/NavigationSecrvice';
import SplashScreen from 'react-native-splash-screen';


export function* routeCurrentUser (action: any) {
    try {
        yield put({ type: ACTION.FETCH_USER_PROFILE_REQUESTING });
        yield put({ type: ACTION.FETCH_USER_PROFILE_SUCCESS, userProfile: {name: 'Test'} });
        yield setTimeout(() => nav.navigate("LoginScreen"), 5000);
        SplashScreen.hide();

    } catch (error) {
        yield put({ type: ACTION.FETCH_USER_PROFILE_ERROR, error });
        console.warn("Error route current user " + error);
    }
}