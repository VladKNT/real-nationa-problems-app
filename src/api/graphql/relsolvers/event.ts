import configureClient from '../configureClient';
import { getEvent, getEvents, createEvent, follow, eventCreated } from '../schema/event';
import TokenService from '../../../application/data/services/TokenService';
import { ISaveEventParams } from '../../../constants/types/event';

interface IGetEventsQuery {
  allEvents: any;
}

interface IGetEventQuery {
  event: any;
}

const client = configureClient();

export default class EventResolver {

  static async getEvent(id: string) {
    try {
      await TokenService.checkTokenExpired();
      const response = await client.query<IGetEventQuery>({
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
      const response = await client.query<IGetEventsQuery>({ query: getEvents });

      return response.data.allEvents;
    } catch (error) {
      console.info(error);
      return null;
    }
  }

  static async createEvent({ name, description, latitude, longitude, dateEnd, dateStart, imageFile, participants = [] }: ISaveEventParams) {
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

  static async follow({ id }: { id: string }) {
    try {
      await TokenService.checkTokenExpired();
      const response = await client.mutate({
        variables: { id },
        mutation: follow
      });

      return response.data.createEvent;
    } catch (error) {
      console.info(error);
      return null;
    }
  }

  static async eventCreated(updater: any) {
    try {
      return client.subscribe({
        query: eventCreated
      })
        .subscribe({
          next(response: any): void {
            updater(response.data.eventCreated);
          }
        });
    } catch (error) {
      console.info(error);
    }
  }
}