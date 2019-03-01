/**
 * Post-Type Queries and Mutations
 */
import { gql } from 'apollo-boost';

/**
 * Queries
 */
export const CUSTOM_LOGO_QUERY = gql`
  query CustomLogoQuery {
    themeMods {
      customLogo {
        id
        altText
        mediaType
        sourceUrl
        mediaDetails{
          sizes {
            width
            height
            sourceUrl
          }
        }
      }
    }
  }
`;

export const ATTACHMENT_QUERY = gql`
  query AttachmentQuery($id: String, $mediaItemId: ID, $slug: String, $uri: String) {
    mediaItemBy(id: $id, mediaItemId: $mediaItemId, slug: $slug, uri: $uri){
      id
      altText
      mediaType
      sourceUrl
      mediaDetails{
        sizes {
          width
          height
          sourceUrl
        }
      }
    }
  }
`;

export const PAGE_QUERY = gql`
  query PageQuery($id: ID!) {
    page(id: $id){
      id
      uri
      pageId
      title
      content
      date
      modified
    }
  }
`;

export const PAGE_BY_QUERY = gql`
  query PageByQuery($uri: String, $pageId: Int) {
    pageBy(uri: $uri, pageId: $pageId) {
      id
      uri
      pageId
      title
      content
      date
      modified
    }
  }
`;

export const POST_QUERY = gql`
  query PostQuery($id: ID!) {
    post(id: $id) {
      id
      postId
      slug
      uri
      content
      date
      modified
      title
      permalink
      author {
        id
        userId
        nicename
        avatar {
          url
          foundAvatar
        }
      }
      categories {
        nodes {
          id
          name
        }
      }
      tags {
        nodes {
          id
          name
        }
      }
      featuredImage {
        id
        mediaItemId
        title
        altText
        sourceUrl
      }
    }
  }
`;

export const POST_BY_QUERY = gql`
  query PostQuery($postId: Int, $slug: String, $uri: String) {
    postBy(postId: $postId, slug: $slug, uri: $uri) {
      id
      postId
      slug
      uri
      content
      date
      modified
      title
      permalink
      author {
        id
        userId
        nicename
        avatar {
          url
          foundAvatar
        }
      }
      categories {
        nodes {
          id
          name
        }
      }
      tags {
        nodes {
          id
          name
        }
      }
      featuredImage {
        id
        mediaItemId
        title
        altText
        sourceUrl
      }
    }
  }
`;

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