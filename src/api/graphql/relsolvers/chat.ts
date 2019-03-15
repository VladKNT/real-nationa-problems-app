import configureClient from "../configureClient";
import TokenService from "../../../application/data/services/TokenService";
import {createPrivateChat} from "../schema/chat";

const client = configureClient();

export default class ChatResolvar {
  static async createPrivateChat(recipientId: string) {
    try {
      await TokenService.checkTokenExpired();
      const response = await client.mutate({
        variables: {recipientId},
        mutation: createPrivateChat
      });

      return response.data.createPrivateChat;
    } catch (error) {
      console.info(error);
      return null;
    }
  }
}
