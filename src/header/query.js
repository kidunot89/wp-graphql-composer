import { gql } from 'apollo-boost';

export const HEADER_QUERY = gql`
  query HeaderQuery {
    allSettings {
      generalSettingsTitle
      generalSettingsDescription
      homeUrl
    }
  }
`;