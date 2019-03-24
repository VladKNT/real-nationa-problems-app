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
  query messages($chatId: ID!, $offset: Int, $limit: Int) {
    messages(chatId: $chatId, offset: $offset, limit: $limit) {
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
