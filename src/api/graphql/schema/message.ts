import gql from 'graphql-tag';

export const messageSent = gql `
  subscription messageSent($chatId: ID!) {
    messageSent(chatId: $chatId) {
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

export const sendMessage = gql `
  mutation sendMessage($message: String!, $chatId: ID!) {
    sendMessage(message: $message, chatId: $chatId) {
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
