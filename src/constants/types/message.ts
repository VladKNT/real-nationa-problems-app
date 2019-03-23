import {IUser} from "./user";

export interface IMessage {
  id: string;
  message: string;
  chatId: string;
  ownerId: string;
  owner: IUser;
  deleted: boolean
  deletedForAll: boolean;
  edited: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IMessageReducer {
  message: IMessage,
  messages: IMessage[],
  loading: boolean,
  error: string
}
