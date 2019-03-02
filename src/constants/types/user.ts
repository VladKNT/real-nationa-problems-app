import { ReactNativeFileOptions } from "extract-files";

export interface IUserProfile {
  firstName: string;
  lastName: string;
  profilePhoto: string | null;
  imageFile?: ReactNativeFileOptions;
  bio: string;
}

export interface IUser {
  email: string;
  id: string;
  userProfile: IUserProfile;
  username: string;
}

export interface IUserReducer {
  user: IUser;
  loading: boolean;
  error: string;
}

export interface IEditProfile {
  id: string
  username: string;
  firstName: string;
  lastName: string;
  profilePhoto: string | null;
  imageFile?: ReactNativeFileOptions;
  bio: string;
}
