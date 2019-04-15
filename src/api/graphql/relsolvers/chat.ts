import configureClient from "../configureClient";
import TokenService from "../../../application/data/services/TokenService";
import { createPrivateChat, getChat, userChats } from "../schema/chat";

const client = configureClient();

interface GetChatQuery {
  chat: any
}

interface UserChatsQuery {
  userChats: any
}

export default class ChatResolver {
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

  static async getChat(id: string) {
    try {
      await TokenService.checkTokenExpired();
      const response = await client.query<GetChatQuery>({
        variables: { id },
        query: getChat
      });
      return response.data.chat;
    } catch (error) {
      console.info(error);
      return null;
    }
  }

  static async userChats() {
    try {
      await TokenService.checkTokenExpired();
      const response = await client.query<UserChatsQuery>({
        query: userChats
      });
      return response.data.userChats;
    } catch (error) {
      console.info(error);
      return null;
    }
  }
}
