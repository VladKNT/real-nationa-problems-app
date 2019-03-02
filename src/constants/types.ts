import moment from 'moment';
import { ReactNativeFileOptions } from 'extract-files';

export interface ISignUpParameters {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  username: string
}

export interface ISignInParameters {
  login: string,
  password: string
}

export interface IEditProfileParameters {
  id: string
  username: string,
  firstName: string,
  lastName: string,
  profilePhoto: string | null,
  imageFile: ReactNativeFileOptions | null,
  bio: string
}

export interface ISaveEventParameters {
  id?: string,
  name: string,
  description: string,
  photo: string,
  imageFile: ReactNativeFileOptions | null,
  dateStart: moment.Moment | null,
  dateEnd: moment.Moment | null,
  participants?: [],
  longitude?: number,
  latitude?: number
}
