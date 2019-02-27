import gql from 'graphql-tag';

export const getEvents = gql `
  query {
    allEvents {
      id
      name
      description
      photo
      dateStart
      dateEnd
      participants {
        username
        userProfile {
          firstName
          lastName
          profilePhoto
        }
      }
      creator {
        username
          userProfile {
            firstName
            lastName
            profilePhoto
        }
      }
    }
  }
`;

export const createEvent = gql `
  mutation createEvent($name: String!, $description: String!, $participants: [ID], $photo: String!, 
                       $latitude: Float!, $longitude: Float!, $dateStart: String! $dateEnd: String!) {
    createEvent(name: $name, description: $description, participants: $participants, photo: $photo, 
                latitude: $latitude, longitude: $longitude, dateStart: $dateStart, dateEnd: $dateEnd) {
      id
      name
      description
      photo
      dateStart
      dateEnd
      participants {
        username
        userProfile {
          firstName
          lastName
          profilePhoto
        }
      }
      creator {
        username
          userProfile {
            firstName
            lastName
            profilePhoto
        }
      }
    }
   }
`;
