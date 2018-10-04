/**
 * Post-Type Queries and Mutations
 */
import { gql } from 'apollo-boost';

/**
 * Queries
 */
export const ATTACHMENT_QUERY = gql`
  query AttachmentQuery($mediaItemId: Int) {
    mediaItemBy(mediaItemId: $mediaItemId){
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

export const POST_COMMENTS_QUERY = gql`
  query PostCommentsQuery($id: ID!) {
    viewer {
      id
      userId
      nicename
      firstName
    }
    post(id: $id) {
      id
      postId
      commentStatus
      comments{
        nodes {
          id
          commentId
          type
          content
          date
          author{
            ... on User {
              id
              userId
              nicename
            }
            ... on CommentAuthor {
              id
              name
            }
          }
        }
      }
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
      }
    }
  }
`;

/**
 * Mutations
 */
export const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteCommentMutation($clientId: String!, $id: ID!) {
    deleteComment(input: { id: $id, clientMutationId: $clientId }) {
      clientMutationId
      comment {
        id,
        commentId,
        type,
        content,
        date
        author {
          ... on CommentAuthor {
            id
            name
          },
          ... on User {
            id
            nicename
          }
        }
      }
    }
  }
`;

export const NEW_COMMENT_MUTATION = gql`
  mutation NewCommentMutation(
    $agent: String,
    $approved: String,
    $author: String,
    $authorEmail: String,
    $authorIp: String,
    $authorUrl: String,
    $type: String,
    $userId: Int,
    $parent: String,
    $postId: Int,
    $content: String!,
    $date: String!,
    $clientId: String!,
  ) {
    createComment(input: {
      agent: $agent,
      approved: $approved,
      author: $author,
      authorEmail: $authorEmail,
      authorIp: $authorIp,
      authorUrl: $authorUrl,
      type: $type,
      userId: $userId,
      parent: $parent,
      postId: $postId,
      content: $content,
      date: $date,
      clientMutationId: $clientId
    }) {
      clientMutationId
      comment {
        id,
        commentId,
        type,
        content,
        date
        author {
          ... on CommentAuthor {
            id
            name
          },
          ... on User {
            id
            nicename
          }
        }
      }
    }
  }
`;

export const UPDATE_COMMENT_MUTATION = gql`
  mutation UpdateCommentMutation(
    $agent: String,
    $approved: String,
    $author: String,
    $authorEmail: String,
    $authorIp: String,
    $authorUrl: String,
    $type: String,
    $userId: Int,
    $parent: String,
    $postId: Int,
    $id: ID!,
    $content: String!,
    $date: String!,
    $clientId: String!,
  ) {
    updateComment(input: {
      agent: $agent,
      approved: $approved,
      author: $author,
      authorEmail: $authorEmail,
      authorIp: $authorIp,
      authorUrl: $authorUrl,
      type: $type,
      userId: $userId,
      parent: $parent,
      postId: $postId,
      id: $id,
      content: $content,
      date: $date,
      clientMutationId: $clientId
    }) {
      clientMutationId
      comment {
        id,
        commentId,
        type,
        content,
        date
        author {
          ... on CommentAuthor {
            id
            name
          },
          ... on User {
            id
            nicename
          }
        }
      }
    }
  }
`;