/**
 * Login Queries and Mutations
 */
import { gql } from 'apollo-boost';

export const VIEWER_QUERY = gql`
query GetViewer {
  viewer {
    id
    userId
    nicename
    firstName
  }
}
`;

export const LOGIN_MUTATION = gql`
mutation LoginMutation( $clientId: String!, $username: String!, $password: String! ) {
  login( input: { clientMutationId: $clientId, username: $username, password: $password } ) {
    authToken
  }
}
`;