import { gql } from 'apollo-boost';

export const LOOP_QUERY = gql`
  query LoopQuery {
    allSettings {
      pageForPosts{
        id
        slug
      }
      pageOnFront
      permalinkStructure
      readingSettingsPostsPerPage
    }
  }
`;