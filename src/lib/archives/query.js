/**
 * Archive Queries
 */
import { gql } from 'apollo-boost';

export const ARCHIVE_QUERY = gql`
  query ArchiveQuery(
      $first: Int,
      $category: String,
      $tag: String,
      $month: Int,
      $year: Int,
      $author: String,
      $search: String
    ) {
    posts(
      first: $first,
      where: {
        categoryName: $category,
        tag: $tag,
        authorName: $author,
        dateQuery: { month: $month, year: $year },
        search: $search
      }
    ) {
      nodes {
        id
        postId
        excerpt
        date
        modified
        title
        featuredImage {
          id
          mediaItemId
          title
          altText
          sourceUrl
        }
        tags {
          nodes {
            id
            name
          }
        }
        categories {
          nodes {
            id
            name
          }
        }
        author {
          id
          userId
          nicename
          avatar {
            url
            foundAvatar
          }
        }
      }
    }
  }
`;