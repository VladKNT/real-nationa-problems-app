import moment from 'moment';

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
  bio: string
}

export interface ISaveEventParameters {
  id?: string,
  name: string,
  description: string,
  photo: string,
  dateStart: moment.Moment | null,
  dateEnd: moment.Moment | null
}
