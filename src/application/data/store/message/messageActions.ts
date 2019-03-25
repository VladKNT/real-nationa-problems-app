import { GET_MESSAGES, SEND_MESSAGE, SUBSCRIBED_MESSAGE } from "./messageActionTypes";
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

export const subscribedMessage = (message: IMessage) => {
  return {
    type: SUBSCRIBED_MESSAGE,
    message
  }
};
