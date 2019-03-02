import {ReactNativeFileOptions} from "extract-files";
import {IUser} from "./user";

export interface IEvent {
  id: string;
  name: string;
  description: string;
  photo: string;
  dateStart: string;
  dateEnd: string;
  longitude: number;
  latitude: number;
  participants: IUser[];
  creator: IUser;
}

export interface ISaveEvent {
  id: string;
  name: string;
  description: string;
  photo: string;
  imageFile?: ReactNativeFileOptions;
  dateStart: string;
  dateEnd: string;
}

export interface ISaveEventParams {
  id?: string;
  name?: string;
  description?: string;
  photo?: string;
  imageFile?: ReactNativeFileOptions;
  dateStart?: string;
  dateEnd?: string;
  longitude?: number;
  latitude?: number;
}

export interface IEventReducer {
  event: IEvent;
  events: IEvent[];
  saveEvent: ISaveEvent;
  loading: boolean;
  error: string;
}
