import { put, call, select } from 'redux-saga/effects';
import ACTION from '../redux/actions/ActionTypes';
import nav from '../services/NavigationSecrvice';
import SplashScreen from 'react-native-splash-screen';
import { getUser } from './userProfileSaga';


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
