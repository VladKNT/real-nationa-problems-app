import {
  FETCH_EVENT_REQUESTING,
  FETCH_EVENT_SUCCESS,
  FETCH_EVENT_ERROR,

  FETCH_EVENTS_REQUESTING,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_ERROR,

  SET_SAVE_EVENT_DATA,
  CLEAR_SAVE_EVENT_DATA
} from "./eventActionTypes";

import { AnyAction } from 'redux';
import { IEvent, ISaveEvent, IEventReducer } from "../../../../constants/types/event";
import { initUser } from '../user/userReducer';

const event: IEvent = {
  id: '',
  name: '',
  description: '',
  photo: '',
  dateStart: '',
  dateEnd: '',
  longitude: 0,
  latitude: 0,
  participants: [initUser],
  creator: initUser
};

const saveEvent: ISaveEvent = {
  id: '',
  name: '',
  description: '',
  photo: '',
  dateStart: '',
  dateEnd: '',
  longitude: 0,
  latitude: 0
};

const initialState = {
  event: event,
  events: [event],
  saveEvent: saveEvent,

  loading: false,
  error: ''
};

export default function(state: IEventReducer = initialState, action: AnyAction) {
  switch (action.type) {
    case FETCH_EVENT_REQUESTING: {
      return {
        ...state,
        loading: true
      };
    }

    case FETCH_EVENT_SUCCESS: {
      return {
        ...state,
        event: action.event,
        loading: false,
      }
    }

    case FETCH_EVENT_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false
      }
    }

    case FETCH_EVENTS_REQUESTING: {
      return {
        ...state,
        loading: true
      };
    }

    case FETCH_EVENTS_SUCCESS: {
      return {
        ...state,
        events: action.events,
        loading: false,
      }
    }

    case FETCH_EVENTS_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false
      }
    }

    case SET_SAVE_EVENT_DATA: {
      return {
        ...state,
        saveEvent: { ...state.saveEvent, ...action.saveEvent }
      }
    }

    case CLEAR_SAVE_EVENT_DATA: {
      return {
        ...state,
        saveEvent: initialState.saveEvent
      }
    }
  }

  return state;
}
