import { CREATE_PRIVATE_CHAT, GET_CHAT, USER_CHATS, CLEAN_CHAT, SUBSCRIBED_CHAT } from "./chatActionTypes";
import { IChat } from "../../../../constants/types/chat";

export const createPrivateChat = (recipientId: string) => {
  return {
    type: CREATE_PRIVATE_CHAT,
    recipientId
  }
};

export const getChat = (id: string) => {
  return {
    type: GET_CHAT,
    id
  }
};

export const userChats = () => {
  return {
    type: USER_CHATS
  }
};


export const cleanChat = () => {
  return {
    type: CLEAN_CHAT
  }
};

export const subscribedChat = (chat: IChat) => {
  return {
    type: SUBSCRIBED_CHAT,
    chat
  }
};
