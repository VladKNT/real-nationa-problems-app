import configureClient from '../configureClient';
import { messageSent, getMessages } from '../schema/message';
import TokenService from '../../../application/data/services/TokenService';

interface IGetMessages {
  messages: any;
}

const client = configureClient();

export default class MessageResolver {
  static messageSent(chatId: string) {
    try {
      client.subscribe({
        query: messageSent,
        variables: { chatId }
      })
        .subscribe({
          next(value: any): void {
            console.info(value);
          }
        });

    } catch (error) {
      console.info(error);
    }
  }

  static async getMessages(chatId: string) {
    try {
      await TokenService.checkTokenExpired();
      const response = await client.query<IGetMessages>({
        query: getMessages,
        variables: { chatId }
      });

      return response.data.messages;
    } catch (error) {
      console.info(error);
    }
  }
}