/**
 * Archive Queries
 */
import { gql } from 'apollo-boost';

export const ARCHIVE_QUERY = gql`
  query ArchiveQuery(
      $first: Int,
      $category: String,
      $tag: String,
      $year: Int,
      $month: Int,
      $day: Int,
      $author: String,
      $search: String
    ) {
    posts(
      first: $first,
      where: {
        categoryName: $category,
        tag: $tag,
        authorName: $author,
        dateQuery: { year: $year, month: $month, day: $day },
        search: $search
      }
    ) {
      nodes {
        id
        postId
        excerpt
        content
        date
        modified
        title
        permalink
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
            slug
          }
        }
        categories {
          nodes {
            id
            name
            slug
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