import { AsyncStorage } from 'react-native';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { HttpLink} from 'apollo-link-http';
import URLS from '../../constants/urls';
import { WebSocketLink } from 'apollo-link-ws';
import { ApolloLink, split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import ApolloClient from 'apollo-client/ApolloClient';
import { onError } from 'apollo-link-error';

function configureClient() {
  const cache = new InMemoryCache();

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(async ({ message, locations, path, extensions }) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );

        if (extensions.code === 'UNAUTHENTICATED') {
          console.log(await AsyncStorage.getItem('@SessionStorage:accessToken'));
        }
      });

      if (networkError) console.log(`[Network error]: ${networkError}`);
    });

  const httpLink = new HttpLink({ uri: URLS.API_URL });

  const authLink = setContext(async () => {
    const token = await AsyncStorage.getItem('@SessionStorage:accessToken');

    let context = {};

    if (token) {
      context = {
        headers: {
          'x-token': token
        }
      };
    }

        return context;
    });

    const wsLink = new WebSocketLink({
      uri: URLS.WS_URL,
      options: {
        reconnect: true,
      },
    });

    const terminatingLink = split(
      ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
        return (
          kind === 'OperationDefinition' && operation === 'subscription'
        );
      },
      wsLink,
      authLink.concat(httpLink),
    );

    return new ApolloClient({
      cache,
      link: ApolloLink.from([
        errorLink,
        terminatingLink
      ])
    });
}

export default configureClient;
