import { gql } from 'apollo-boost';

export const LOOP_QUERY = gql`
  query LoopQuery {
    allSettings {
      pageForPosts
      pageOnFront
      permalinkStructure
      readingSettingsPostsPerPage
    }
  }
`;