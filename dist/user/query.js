import _taggedTemplateLiteral from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral";

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\nmutation LoginMutation( $clientId: String!, $username: String!, $password: String! ) {\n  login( input: { clientMutationId: $clientId, username: $username, password: $password } ) {\n    authToken\n  }\n}\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\nquery GetViewer {\n  viewer {\n    id\n    userId\n    nicename\n    firstName\n  }\n}\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

/**
 * Login Queries and Mutations
 */
import { gql } from 'apollo-boost';
export var VIEWER_QUERY = gql(_templateObject());
export var LOGIN_MUTATION = gql(_templateObject2());