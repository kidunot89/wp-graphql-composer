import _taggedTemplateLiteral from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral";

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n  mutation UpdateCommentMutation(\n    $type: String,\n    $id: ID!,\n    $content: String!,\n    $date: String!,\n    $clientId: String!,\n  ) {\n    updateComment(input: {\n      type: $type,\n      id: $id,\n      content: $content,\n      date: $date,\n      clientMutationId: $clientId\n    }) {\n      clientMutationId\n      comment {\n        id,\n        commentId,\n        type,\n        content,\n        date\n        author {\n          ... on CommentAuthor {\n            id\n            name\n          },\n          ... on User {\n            id\n            nicename\n          }\n        }\n      }\n    }\n  }\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  mutation NewCommentMutation(\n    $author: String,\n    $authorEmail: String,\n    $authorUrl: String,\n    $type: String,\n    $userId: Int,\n    $parent: String,\n    $postId: Int,\n    $content: String!,\n    $date: String!,\n    $clientId: String!,\n  ) {\n    createComment(input: {\n      author: $author,\n      authorEmail: $authorEmail,\n      authorUrl: $authorUrl,\n      type: $type,\n      userId: $userId,\n      parent: $parent,\n      postId: $postId,\n      content: $content,\n      date: $date,\n      clientMutationId: $clientId\n    }) {\n      clientMutationId\n      comment {\n        id,\n        commentId,\n        type,\n        content,\n        date\n        author {\n          ... on CommentAuthor {\n            id\n            name\n          },\n          ... on User {\n            id\n            nicename\n          }\n        }\n      }\n    }\n  }\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  mutation DeleteCommentMutation($clientId: String!, $id: ID!) {\n    deleteComment(input: { id: $id, clientMutationId: $clientId }) {\n      clientMutationId\n      comment {\n        id\n      }\n    }\n  }\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  query PostQuery($postId: ID, $slug: String, $uri: String) {\n    postBy(postId: $postId, slug: $slug, uri: $uri) {\n      id\n      postId\n      slug\n      uri\n      content\n      date\n      modified\n      title\n      permalink\n      author {\n        id\n        userId\n        nicename\n        avatar {\n          url\n          foundAvatar\n        }\n      }\n      categories {\n        nodes {\n          id\n          name\n        }\n      }\n      tags {\n        nodes {\n          id\n          name\n        }\n      }\n      featuredImage {\n        id\n      }\n    }\n  }\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  query PostQuery($id: ID!) {\n    post(id: $id) {\n      id\n      postId\n      slug\n      uri\n      content\n      date\n      modified\n      title\n      permalink\n      author {\n        id\n        userId\n        nicename\n        avatar {\n          url\n          foundAvatar\n        }\n      }\n      categories {\n        nodes {\n          id\n          name\n        }\n      }\n      tags {\n        nodes {\n          id\n          name\n        }\n      }\n      featuredImage {\n        id\n        mediaItemId\n        title\n        altText\n        sourceUrl\n      }\n    }\n  }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  query PostCommentsQuery($id: ID!) {\n    post(id: $id) {\n      id\n      postId\n      title\n      commentStatus\n      comments{\n        nodes {\n          id\n          commentId\n          type\n          content\n          date\n          author{\n            ... on User {\n              id\n              userId\n              nicename\n              avatar {\n                url\n              }\n            }\n            ... on CommentAuthor {\n              id\n              name\n            }\n          }\n        }\n      }\n    }\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  query PageByQuery($uri: String, $pageId: ID) {\n    pageBy(uri: $uri, pageId: $pageId) {\n      id\n      uri\n      pageId\n      title\n      content\n      date\n      modified\n    }\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  query PageQuery($id: ID!) {\n    page(id: $id){\n      id\n      uri\n      pageId\n      title\n      content\n      date\n      modified\n    }\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  query AttachmentQuery($id: String, $mediaItemId: ID, $slug: String, $uri: String) {\n    mediaItemBy(id: $id, mediaItemId: $mediaItemId, slug: $slug, uri: $uri){\n      id\n      altText\n      mediaType\n      sourceUrl\n      mediaDetails{\n        sizes {\n          width\n          height\n          sourceUrl\n        }\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

/**
 * Post-Type Queries and Mutations
 */
import { gql } from 'apollo-boost';
/**
 * Queries
 */

export var ATTACHMENT_QUERY = gql(_templateObject());
export var PAGE_QUERY = gql(_templateObject2());
export var PAGE_BY_QUERY = gql(_templateObject3());
export var POST_COMMENTS_QUERY = gql(_templateObject4());
export var POST_QUERY = gql(_templateObject5());
export var POST_BY_QUERY = gql(_templateObject6());
/**
 * Mutations
 */

export var DELETE_COMMENT_MUTATION = gql(_templateObject7());
export var NEW_COMMENT_MUTATION = gql(_templateObject8());
export var UPDATE_COMMENT_MUTATION = gql(_templateObject9());