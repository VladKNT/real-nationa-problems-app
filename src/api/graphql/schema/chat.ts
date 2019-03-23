import  gql from 'graphql-tag';

export const createPrivateChat = gql `
  mutation createPrivateChat($recipientId: ID!) {
    createPrivateChat(recipientId: $recipientId) {
      id
      private
      lastMessage {
        message
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

export const getChat = gql `
  query chat($id: ID!) {
    chat(id: $id) {
      id
      private,
      lastMessage {
        message
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