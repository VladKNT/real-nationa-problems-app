import gql from 'graphql-tag';

export const messageSent = gql `
  subscription messageSent($chatId: ID!) {
    messageSent(chatId: $chatId) {
      id
      message
      read
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

export const updateChat = gql `
  subscription {
    updateChat {
      id
      private,
      unreadMessages
      lastMessage {
        message
        createdAt
        owner {
          username,
          userProfile {
            profilePhoto
            firstName
            lastName
          }
        }
      }
      members {
        id
        username
        userProfile {
          profilePhoto
          firstName
          lastName
        }
      }
    }
  }
`;

export const getMessages = gql `
  query messages($chatId: ID!, $offset: Int, $limit: Int) {
    messages(chatId: $chatId, offset: $offset, limit: $limit) {
      id
      message
      read
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
      read
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

export const readMessages = gql `
  mutation readMessages($messagesId: [ID]!) {
    readMessages(messagesId: $messagesId) {
      id
      message
    }
  }
`;
