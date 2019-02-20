import { put, call, select } from 'redux-saga/effects';
import ACTION from '../redux/actions/ActionTypes';
import EventResolver from '../api/graphql/relsolvers/event';


export function* getEvents() {
  try {
    yield put({ type: ACTION.FETCH_EVENTS_REQUESTING });
    const events =  yield call(EventResolver.getEvents);
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
