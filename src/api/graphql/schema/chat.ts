import  gql from 'graphql-tag';

export const createPrivateChat = gql `
  mutation createPrivateChat($recipientId: ID!) {
    createPrivateChat(recipientId: $recipientId) {
      id
      private,
      lastMessage {
        message,
        owner {
          username,
          userProfile {
            profilePhoto
          }
        }
      }
    }
  }
`;