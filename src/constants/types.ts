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
