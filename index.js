import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';
import { ApolloProvider } from 'react-apollo'
import App from './src/App';

import configureStore from './src/application/data/store/configureStore';
import configureClient from './src/api/graphql/configureClient';

const store = configureStore();
const client = configureClient();

class RealNationalProblems extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <App />
        </Provider>
      </ApolloProvider>
    );
  }
}

AppRegistry.registerComponent('rnp', () => RealNationalProblems);
