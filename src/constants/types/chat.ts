import { IUser } from "./user";
import { IMessage } from "./message";

export interface IChat {
  id: string;
  name?: string;
  description?: string;
  icon?: string;
  private: boolean;
  lastMessage: IMessage;
  members: IUser[];
  creatorId: string;
}

export interface IChatReducer {
  chat: IChat;
  userChats: IChat[];
  loading: boolean;
  error: string;
}
