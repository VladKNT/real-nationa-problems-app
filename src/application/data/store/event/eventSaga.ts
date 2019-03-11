import { put, call, select } from 'redux-saga/effects';
import {
  FETCH_EVENT_REQUESTING,
  FETCH_EVENT_SUCCESS,
  FETCH_EVENT_ERROR,

  FETCH_EVENTS_REQUESTING,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_ERROR,

  CREATE_EVENT_REQUESTING,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_ERROR,

  CLEAR_SAVE_EVENT_DATA,

  FOLLOW_EVENT_REQUESTING,
  FOLLOW_EVENT_SUCCESS,
  FOLLOW_EVENT_ERROR
} from "./eventActionTypes";

import EventResolver from '../../../../api/graphql/relsolvers/event';
import nav from '../../services/NavigationSecrvice';

export function* getEvent(action: any) {
  try {
    yield put({ type: FETCH_EVENT_REQUESTING });
    const event =  yield call(EventResolver.getEvent, action.id);

    if (event){
      yield put({ type: FETCH_EVENT_SUCCESS, event });
      return event;
    }

    return null;
  } catch (error) {
    yield put({ type: FETCH_EVENT_ERROR, error });
    console.warn('Error getting event: ' + error);
  }
}


export function* getEvents() {
  try {
    yield put({ type: FETCH_EVENTS_REQUESTING });
    const events =  yield call(EventResolver.getEvents);

    if (events){
      yield put({ type: FETCH_EVENTS_SUCCESS, events });
      return events;
    }

    return null;
  } catch (error) {
    yield put({ type: FETCH_EVENTS_ERROR, error });
    console.warn('Error getting events: ' + error);
  }
}

export function* createEvent() {
  try {
    yield put({ type: CREATE_EVENT_REQUESTING });
    const store = yield select();
    const { name, description, latitude, longitude, dateEnd, dateStart, imageFile } = store.eventReducer.saveEvent;
    const event = yield call(EventResolver.createEvent, { name, description, latitude, longitude, dateEnd, dateStart, imageFile });

    if (event) {
      yield put({ type: CREATE_EVENT_SUCCESS });
      yield put({ type: CLEAR_SAVE_EVENT_DATA });
      nav.navigate('FeedScreen');
    }

  } catch (error) {
    yield put({ type: CREATE_EVENT_ERROR, error });
    console.warn('Error create event: ' + error);
  }
}

export function* followEvent(action: any) {
  try {
    yield put({ type: FOLLOW_EVENT_REQUESTING });
    const { id } = action;
    const event = yield call(EventResolver.follow, { id });

    if (event) {
      yield put({ type: FOLLOW_EVENT_SUCCESS });
      nav.navigate('FeedScreen');
    }

  } catch (error) {
    yield put({ type: FOLLOW_EVENT_ERROR, error });
    console.warn('Error create event: ' + error);
  }
}
