import React from 'react';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink, concat } from 'apollo-link';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from './fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

export const createClient = httpLink => {
  // Add the authorization to the headers
  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        authorization: localStorage.getItem('user-token') || null,
      } 
    });

    return forward(operation);
  });

  return new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache({
      dataIdFromObject: object => object.id,
      fragmentMatcher,
    }),
    clientState: {

    }
  });
}

export const WPProvider = ({ link, children }) => {
  const client = createClient(link);
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}