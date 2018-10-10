import React from 'react';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink, concat } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';

export var createClient = function createClient(httpLink) {
  // Add the authorization to the headers
  var authMiddleware = new ApolloLink(function (operation, forward) {
    operation.setContext({
      headers: {
        authorization: localStorage.getItem('user-token') || null
      }
    });

    return forward(operation);
  });

  return new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache({
      dataIdFromObject: function dataIdFromObject(object) {
        return object.id || null;
      }
    }),
    clientState: {}
  });
};

export var WPProvider = function WPProvider(_ref) {
  var link = _ref.link,
      children = _ref.children;

  var client = createClient(link);
  return React.createElement(
    ApolloProvider,
    { client: client },
    children
  );
};