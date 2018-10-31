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
      }
    }
  }
`;