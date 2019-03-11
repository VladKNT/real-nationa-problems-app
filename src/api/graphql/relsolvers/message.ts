import configureClient from '../configureClient';
import { messageSent } from '../schema/message';
import TokenService from '../../../application/data/services/TokenService';
import { ISaveEventParams } from '../../../constants/types/event';

interface IGetMessageSentSubscription {
  messageSent: any;
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
}