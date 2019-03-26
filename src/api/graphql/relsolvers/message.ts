import configureClient from '../configureClient';
import { messageSent, getMessages, sendMessage } from '../schema/message';
import TokenService from '../../../application/data/services/TokenService';

interface IGetMessages {
  messages: any;
}

const client = configureClient();

export default class MessageResolver {
  static subscribeMessages(chatId: string, updater: any) {
    try {
      return client.subscribe({
        query: messageSent,
        variables: { chatId }
      })
        .subscribe({
          next(response: any): void {
            updater(response.data.messageSent);
          }
        });

    } catch (error) {
      console.info(error);
    }
  }

  static async getMessages(chatId: string, page: number = 1) {
    try {
      await TokenService.checkTokenExpired();
      const response = await client.query<IGetMessages>({
        query: getMessages,
        variables: { chatId, offset: 20 * (page - 1), limit: 20 }
      });

      return response.data.messages;
    } catch (error) {
      console.info(error);
    }
  }

  static async sendMessage(message: string, chatId: string) {
    try {
      await TokenService.checkTokenExpired();
      const response = await client.mutate({
        mutation: sendMessage,
        variables: { message, chatId },
      });

      return response.data.sendMessage;
    } catch (error) {
      console.info(error);
    }
  }
}
