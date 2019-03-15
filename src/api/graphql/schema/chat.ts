import  gql from 'graphql-tag';

export const createPrivateChat = gql `
  mutation createPrivateChat($recipientId: ID!) {
    createPrivateChat(recipientId: $recipientId) {
      id
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