var _templateObject = _taggedTemplateLiteral(['\nquery GetViewer {\n  viewer {\n    id\n    userId\n    nicename\n    firstName\n  }\n}\n'], ['\nquery GetViewer {\n  viewer {\n    id\n    userId\n    nicename\n    firstName\n  }\n}\n']),
    _templateObject2 = _taggedTemplateLiteral(['\nmutation LoginMutation( $clientId: String!, $username: String!, $password: String! ) {\n  login( input: { clientMutationId: $clientId, username: $username, password: $password } ) {\n    authToken\n  }\n}\n'], ['\nmutation LoginMutation( $clientId: String!, $username: String!, $password: String! ) {\n  login( input: { clientMutationId: $clientId, username: $username, password: $password } ) {\n    authToken\n  }\n}\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/**
 * Login Queries and Mutations
 */
import { gql } from 'apollo-boost';

export var VIEWER_QUERY = gql(_templateObject);

export var LOGIN_MUTATION = gql(_templateObject2);