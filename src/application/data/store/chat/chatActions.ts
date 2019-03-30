import { CREATE_PRIVATE_CHAT, GET_CHAT, USER_CHATS } from "./chatActionTypes";

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
