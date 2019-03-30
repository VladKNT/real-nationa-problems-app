import { GET_MESSAGES, SEND_MESSAGE, SUBSCRIBED_MESSAGE, CLEAN_MESSAGES } from "./messageActionTypes";
import { IMessage } from "../../../../constants/types/message";

export const getMessages = () => {
  return {
    type: GET_MESSAGES
  }
};

export const sendMessage = (message: string) => {
  return {
    type: SEND_MESSAGE,
    message
  }
};

export const cleanMessages = () => {
  return {
    type: CLEAN_MESSAGES
  }
};

export const subscribedMessage = (message: IMessage) => {
  return {
    type: SUBSCRIBED_MESSAGE,
    message
  }
};
