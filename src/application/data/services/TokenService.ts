import jwtDecode, {  } from 'jwt-decode';
import { AsyncStorage } from 'react-native';
import moment from 'moment';
import UserResolver from '../../../api/graphql/relsolvers/user';

interface TokenDTO {
  exp: string;
}

export default class TokenService {
  static async checkTokenExpired() {
    const accessToken = await AsyncStorage.getItem('@SessionStorage:accessToken');
    const refreshToken = await AsyncStorage.getItem('@SessionStorage:refreshToken');

    if (accessToken && refreshToken) {
      const decoded = await jwtDecode<TokenDTO>(accessToken);
      const currentData = moment().valueOf();

      if (parseInt(decoded.exp) < currentData / 1000) {
        await AsyncStorage.removeItem('@SessionStorage:accessToken');

        const tokenPair = await UserResolver.refreshToken(refreshToken);

        if (tokenPair) {
          await AsyncStorage.setItem('@SessionStorage:accessToken', tokenPair.accessToken);
          await AsyncStorage.setItem('@SessionStorage:refreshToken', tokenPair.refreshToken);
        }
      }
    }
  }
}