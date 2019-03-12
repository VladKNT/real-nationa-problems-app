import configureClient from '../configureClient';
import { ISignUpParameters, ISignInParameters } from '../../../constants/types/auth';
import { IEditProfile } from '../../../constants/types/user';
import { signUp, signIn, refreshToken, getUser, updateUser, getUserById } from '../schema/user';
import TokenService from '../../../application/data/services/TokenService';

interface GetUserQuery {
  getUser: any
}

interface GetUserByIdQuery {
  getUserById: any
}
const client = configureClient();

export default class UserResolver {
  static async signUp({ email, password, firstName, lastName, username }: ISignUpParameters) {
    try {
      const response = await client.mutate({
        variables: { email, password, firstName, lastName, username },
        mutation: signUp
      });

      return response.data.signUp;
    } catch (error) {
      console.info(error);
      return null;
    }
  }

  static async signIn({ login, password }: ISignInParameters) {
    try {
      const response = await client.mutate({
        variables: { login, password },
        mutation: signIn
      });

      return response.data.signIn;
    } catch (error) {
        console.info(error);
        return null;
    }
  }

  static async refreshToken(token: string) {
    try {
      const response = await client.mutate({
        variables: { token },
        mutation: refreshToken
      });

      return response.data.refreshToken;
    } catch (error) {
      console.info(error);
      return null;
    }
  }

  static async getUser() {
    try {
      await TokenService.checkTokenExpired();
      const response = await client.query<GetUserQuery>({ query: getUser });
      return response.data.getUser;
    } catch (error) {
      console.info(error);
      return null;
    }
  }

  static async getUserById(id: string) {
    try {
      await TokenService.checkTokenExpired();
      const response = await client.query<GetUserByIdQuery>({
        variables: { id },
        query: getUserById
      });
      return response.data.getUserById;
    } catch (error) {
      console.info(error);
      return null;
    }
  }

  static async updateUser({ id, username, firstName, lastName, imageFile, bio }: IEditProfile) {
    try {
      await TokenService.checkTokenExpired();
      const response = await client.mutate({
        variables: { id, username, firstName, lastName, imageFile, bio  },
        mutation: updateUser
      });

      return response.data.updateUser;
    } catch (error) {
      console.info(error);
      return null;
    }
  }
}