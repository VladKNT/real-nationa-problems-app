import _ from "lodash";
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

  SET_SAVE_EVENT_DATA,
  CLEAR_SAVE_EVENT_DATA,

  SUBSCRIBED_EVENT,
  SUBSCRIBED_FOLLOW_EVENT,

  FOLLOW_EVENT_REQUESTING,
  FOLLOW_EVENT_SUCCESS,
  FOLLOW_EVENT_ERROR
} from "./eventActionTypes";

import { AnyAction } from "redux";
import { IEvent, ISaveEvent, IEventReducer } from "../../../../constants/types/event";
import { initUser } from "../user/userReducer";

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
  events: [],
  saveEvent: saveEvent,

  loading: false,
  error: ''
};

export default function(state: IEventReducer = initialState, action: AnyAction) {
  switch (action.type) {
    case FETCH_EVENT_REQUESTING:
    case FETCH_EVENTS_REQUESTING:
    case FOLLOW_EVENT_REQUESTING:
    case CREATE_EVENT_REQUESTING: {
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

    case FETCH_EVENTS_SUCCESS: {
      return {
        ...state,
        events: action.events,
        loading: false,
      }
    }

    case FETCH_EVENT_ERROR:
    case FETCH_EVENTS_ERROR:
    case FOLLOW_EVENT_ERROR:
    case CREATE_EVENT_ERROR: {
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

    case CREATE_EVENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        events: [ action.event, ...state.events ]
      }
    }

    case SUBSCRIBED_EVENT: {
      return {
        ...state,
        events: [action.event, ...state.events]
      }
    }

    case FOLLOW_EVENT_SUCCESS:
    case SUBSCRIBED_FOLLOW_EVENT: {
      return {
        ...state,
        loading: false,
        event: action.event
      }
    }
  }

  return state;
}
