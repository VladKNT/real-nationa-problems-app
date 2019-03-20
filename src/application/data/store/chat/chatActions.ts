import { CREATE_PRIVATE_CHAT, GET_CHAT } from "./chatActionTypes";

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
