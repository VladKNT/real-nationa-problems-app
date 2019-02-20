import configureClient from '../configureClient';
import { getEvents } from '../schema/event';
import TokenService from '../../../services/TokenService';

interface GetEventsQuery {
  allEvents: any
}
const client = configureClient();

export default class EventResolver {

  static async getEvents() {
    try {
      await TokenService.checkTokenExpired();
      const response = await client.query<GetEventsQuery>({ query: getEvents });
      return response.data.allEvents;
    } catch (error) {
      console.info(error);
      return null;
    }
  }
}