import ACTION from '../actions/ActionTypes';
import { AnyAction } from 'redux';
import { IUser } from './userProfileReducer';

const initialState = {
  event: null,

  loading: false,
  error: ''
};

export interface IEvent {
  name: string,
  description: string,
  photo: string,
  dateStart: string,
  dateEnd: string,
  participants: [IUser],
  creator: IUser
}

export interface IEventReducer {
    event: IEvent | null,
    loading: boolean,
    error: string
}

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
        user: action.user,
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
  }

  return state;
}
