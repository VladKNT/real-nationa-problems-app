import gql from 'graphql-tag';

export const getEvent = gql `
  query event($id: ID!) {
    event(id: $id) {
      id
      name
      description
      photo
      dateStart
      dateEnd
      longitude,
      latitude,
      participants {
        id
        username
        userProfile {
          firstName
          lastName
          profilePhoto
        }
      }
      creator {
        id
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

export const getEvents = gql `
  query {
    allEvents {
      id
      name
      description
      photo
      dateStart
      dateEnd
      creator {
        username
        userProfile {
          profilePhoto
        }
      }
    }
  }
`;

export const createEvent = gql `
  mutation createEvent($name: String!, $description: String!, $participants: [ID], $imageFile: Upload!, 
                       $latitude: Float!, $longitude: Float!, $dateStart: String! $dateEnd: String!) {
    createEvent(name: $name, description: $description, participants: $participants, imageFile: $imageFile, 
                latitude: $latitude, longitude: $longitude, dateStart: $dateStart, dateEnd: $dateEnd) {
      id
      name
      description
      photo
      dateStart
      dateEnd
      participants {
        id
        username
        userProfile {
          firstName
          lastName
          profilePhoto
        }
      }
      creator {
        id
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

export const follow = gql `
  mutation follow($id: ID!) {
    follow(id: $id) {
      id
    }
  }
`;