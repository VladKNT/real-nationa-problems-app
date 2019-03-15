import { CREATE_PRIVATE_CHAT } from "./chatActionTypes";

export const createPrivateChat = (recipientId: string) => {
  return {
    type: CREATE_PRIVATE_CHAT,
    recipientId
  }
};
