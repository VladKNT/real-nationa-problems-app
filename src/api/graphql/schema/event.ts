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
