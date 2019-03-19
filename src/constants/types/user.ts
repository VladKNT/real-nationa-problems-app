import { ReactNativeFileOptions } from "extract-files";
import { IChat } from "./chat";

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
  chats: IChat[];
}

export interface IUserReducer {
  user: IUser;
  selectedUser: IUser;
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
