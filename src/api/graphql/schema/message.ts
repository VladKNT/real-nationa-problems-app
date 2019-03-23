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

export const getMessages = gql `
  query messages($chatId: ID!) {
    messages(chatId: $chatId) {
      id
      message
      owner {
        id
        username
        userProfile {
          profilePhoto
        }
      }
      createdAt
      updatedAt
    }
  }
`;
