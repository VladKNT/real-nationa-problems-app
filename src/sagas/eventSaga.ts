import { put, call, select } from 'redux-saga/effects';
import ACTION from '../redux/actions/ActionTypes';
import EventResolver from '../api/graphql/relsolvers/event';
import nav from '../services/NavigationSecrvice';


export function* getEvents() {
  try {
    yield put({ type: ACTION.FETCH_EVENTS_REQUESTING });
    const events =  yield call(EventResolver.getEvents);

    if (events){
      yield put({ type: ACTION.FETCH_EVENTS_SUCCESS, events });
      return events;
    }

    return null;
  } catch (error) {
    yield put({ type: ACTION.FETCH_EVENTS_ERROR, error });
    console.warn('Error getting events: ' + error);
  }
}

export function* createEvent() {
  try {
    yield put({ type: ACTION.CREATE_EVENT_REQUESTING });
    const store = yield select();
    const { name, description, latitude, longitude, dateEnd, dateStart, photo, imageFile } = store.eventReducer.saveEvent;
    const participants: [] = [];
    const event = yield call(EventResolver.createEvent, { name, description, latitude, longitude, dateEnd, dateStart, imageFile, participants });

    if (event) {
      yield put({ type: ACTION.CREATE_EVENT_SUCCESS });
      yield put({ type: ACTION.CLEAR_SAVE_EVENT_DATA });
      nav.navigate('FeedScreen');
    }

  } catch (error) {
    yield put({ type: ACTION.CREATE_EVENT_ERROR, error });
    console.warn('Error create event: ' + error);
  }
}
