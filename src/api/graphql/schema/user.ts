import gql from 'graphql-tag';

export const signUp = gql `
  mutation signUp($email: String!, $username: String!, $password: String!, $firstName: String!, $lastName: String!) {
    signUp(email: $email, username: $username, password: $password, firstName: $firstName, lastName: $lastName) {
      accessToken
      refreshToken
    }
  }
`;

export const signIn = gql `
  mutation signIn($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      accessToken
      refreshToken
    }
  }
`;

export const refreshToken = gql `
  mutation refreshToken($token: String!) {
    refreshToken(token: $token) {
      accessToken
      refreshToken
    }
  }
`;

export const getUser = gql `
  query {
    getUser {
      id
      username
      email
      userProfile {
        firstName
        lastName
        profilePhoto
        bio
      }
      chats {
        id
        lastMessage {
          message
        }
        members {
          id
        }
      }
    }
  }
`;

export const getUserById = gql `
  query getUserById($id: ID!) {
    getUserById(id: $id) {
      id
      username
      email
      userProfile {
        firstName
        lastName
        profilePhoto
        bio
      }
      chats {
        id
        lastMessage {
          message
        }
        members {
          id
        }
      }
    }
  }
`;

export const updateUser = gql `
  mutation updateUser($id: ID!, $username: String, $firstName: String, $lastName: String, $imageFile: Upload, $bio: String) {
    updateUser(id: $id, username: $username, firstName: $firstName, lastName: $lastName, imageFile: $imageFile, bio: $bio) {
      id
      username
      email
      userProfile {
        firstName
        lastName
        profilePhoto
        bio
      }
      chats {
        id
        lastMessage {
          message
        }
        members {
          id
        }
      }
    }
  }
`;