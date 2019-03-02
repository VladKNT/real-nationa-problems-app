import configureClient from '../configureClient';
import { getEvent, getEvents, createEvent } from '../schema/event';
import TokenService from '../../../application/data/services/TokenService';
import { ISaveEventParameters } from '../../../constants/types';

interface GetEventsQuery {
  allEvents: any
}
const client = configureClient();

export default class EventResolver {

  static async getEvent(id: string) {
    try {
      await TokenService.checkTokenExpired();
      const response = await client. query<GetEventsQuery>({
        variables: { id },
        query: getEvent
      });

      return response.data.event;
    } catch (error) {
      console.info(error);
      return null;
    }
  }

  static async getEvents() {
    try {
      await TokenService.checkTokenExpired();
      const response = await client. query<GetEventsQuery>({ query: getEvents });

      return response.data.allEvents;
    } catch (error) {
      console.info(error);
      return null;
    }
  }

  static async createEvent({ name, description, latitude, longitude, dateEnd, dateStart, imageFile, participants }: ISaveEventParameters) {
    try {
      await TokenService.checkTokenExpired();
      const response = await client.mutate({
        variables: { name, description, participants, imageFile, latitude, longitude, dateEnd, dateStart },
        mutation: createEvent
      });

      return response.data.createEvent;
    } catch (error) {
      console.info(error);
      return null;
    }
  }
}