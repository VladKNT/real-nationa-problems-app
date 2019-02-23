import ACTION from '../actions/ActionTypes';
import { AnyAction } from 'redux';
import { IUser, initUser } from './userProfileReducer';
import moment from 'moment';

export interface IEvent {
  id?: string,
  name: string,
  description: string,
  photo: string,
  dateStart: moment.Moment | null,
  dateEnd: moment.Moment | null,
  longitude: number | null,
  latitude: number | null,
  participants: IUser[],
  creator: IUser
}

export interface IEventReducer {
  event: IEvent,
  saveEvent: IEvent,
  loading: boolean,
  error: string
}

const event = {
  id: '',
  name: '',
  description: '',
  photo: '',
  dateStart: null,
  dateEnd: null,
  longitude: null,
  latitude: null,
  participants: [initUser],
  creator: initUser
};

const initialState = {
  event: event,
  saveEvent: event,

  loading: false,
  error: ''
};

export default function(state: IEventReducer = initialState, action: AnyAction) {
  switch (action.type) {
    case ACTION.FETCH_EVENTS_REQUESTING: {
      return {
        ...state,
        loading: true
      };
    }

    case ACTION.FETCH_EVENTS_SUCCESS: {
      return {
        ...state,
        event: action.event,
        loading: false,
      }
    }

    case ACTION.FETCH_EVENTS_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false
      }
    }

    case ACTION.SET_SAVE_EVENT_DATA: {
      return {
        ...state,
        saveEvent: { ...state.saveEvent, ...action.saveEvent }
      }
    }

    case ACTION.CLEAR_SAVE_EVENT_DATA: {
      return {
        ...state,
        saveEvent: initialState.saveEvent
      }
    }
  }

  return state;
}
