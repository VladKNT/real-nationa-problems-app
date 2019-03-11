import {
  FETCH_EVENT,
  FETCH_EVENTS,
  SET_SAVE_EVENT_DATA,
  CLEAR_SAVE_EVENT_DATA,
  CREATE_EVENT,
  FOLLOW_EVENT
} from "./eventActionTypes";
import { ISaveEventParams } from "../../../../constants/types/event";

export const getEvent = (id: string) => {
  return {
    type: FETCH_EVENT,
    id
  }
};

export const getEvents = () => {
  return {
    type: FETCH_EVENTS
  }
};

export const setSaveEventData = (saveEvent: ISaveEventParams) => {
  return {
    type: SET_SAVE_EVENT_DATA,
    saveEvent
  }
};


export const clearSaveEventData = () => {
  return {
    type: CLEAR_SAVE_EVENT_DATA,
  }
};

export const createEvent = () => {
  return {
    type: CREATE_EVENT
  }
};

export const followEvent = (id: string) => {
  return {
    type: FOLLOW_EVENT,
    id
  }
};