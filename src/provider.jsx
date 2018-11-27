import React from 'react';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink, concat } from 'apollo-link';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';

export const createClient = (httpLink, fragmentData) => {
  const cache = { dataIdFromObject: object => object.id };
  if ( fragmentData ) {
    cache.fragmentMatcher = new IntrospectionFragmentMatcher({
      introspectionQueryResultData: fragmentData,
    });
  }

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
    cache: new InMemoryCache(cache),
    clientState: {

    }
  });
};

export const WPProvider = ({ fragmentData, link, children }) => {
  const client = createClient(link, fragmentData);
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
};