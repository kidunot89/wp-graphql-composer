import { gql } from 'apollo-boost';

export const LOOP_QUERY = gql`
  query LoopQuery {
    allSettings {
      readingSettingsPageForPosts
      readingSettingsPageOnFront
      readingSettingsPostsPerPage
      permalinkSettingsStructure
      permalinkSettingsTagBase
      permalinkSettingsCategoryBase
    }
  }
`;