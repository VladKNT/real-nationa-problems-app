import gql from 'graphql-tag';

export const messageSent = gql `
  subscription {
    messageSent {
      id
      chatId
      message
    }
  }
`;
