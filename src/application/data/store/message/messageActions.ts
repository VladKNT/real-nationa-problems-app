import { GET_MESSAGES, SEND_MESSAGE } from "./messageActionTypes";

export const getMessages = () => {
  return {
    type: GET_MESSAGES
  }
};

export const sendMessage = () => {
  return {
    type: SEND_MESSAGE
  }
};
