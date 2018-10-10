function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * Post-type composer
 */
import { withApollo } from 'react-apollo';
import { get, omit } from 'lodash';

import { Error, Loading } from '../utils';
import { queryComposer } from '../composers';

import { ATTACHMENT_QUERY, PAGE_QUERY, PAGE_BY_QUERY, POST_QUERY, POST_BY_QUERY, POST_COMMENTS_QUERY, DELETE_COMMENT_MUTATION, NEW_COMMENT_MUTATION, UPDATE_COMMENT_MUTATION } from './query';

import attachmentMapper from './attachment-mapper';
import { postCommentsStateManager, commentsMapper } from './comment-mapper';

import attachment from './attachment';
import comment from './comment';
import editComment from './edit-comment';
import page from './page';
import post from './post';
import postComments from './post-comments';

attachment.compose = queryComposer({
  view: attachment,
  whileLoading: { view: Loading },
  forError: { view: Error, type: '404-image' },
  queries: [{
    query: ATTACHMENT_QUERY,
    config: {
      options: function options(_ref) {
        var mediaItemId = _ref.mediaItemId;
        return { mediaItemId: mediaItemId };
      },
      skip: function skip(_ref2) {
        var mediaItemId = _ref2.mediaItemId;
        return !mediaItemId;
      }
    }
  }],
  sharedMapper: attachmentMapper
});

var Attachment = attachment.compose({});
export { Attachment, attachment, ATTACHMENT_QUERY };

/**
 * Page Prop Mapper
 * @param {object} props 
 */
var pageMapper = function pageMapper(_ref3) {
  var _ref3$data = _ref3.data,
      page = _ref3$data.page,
      pageBy = _ref3$data.pageBy,
      rest = _objectWithoutProperties(_ref3, ['data']);

  return Object.assign({}, page, pageBy, rest);
};
page.compose = queryComposer({
  view: page,
  whileLoading: { view: Loading },
  forError: { view: Error, type: '404-page' },
  queries: [{
    cond: function cond(_ref4) {
      var pageId = _ref4.pageId,
          uri = _ref4.uri;
      return !!pageId || !!uri;
    },
    query: PAGE_BY_QUERY
  }, {
    cond: function cond(_ref5) {
      var id = _ref5.id;
      return !!id;
    },
    query: PAGE_QUERY
  }],
  sharedMapper: pageMapper
});

var Page = page.compose({});
export { Page, page, PAGE_QUERY, PAGE_BY_QUERY };

/**
 * Post Prop Mapper
 * @param {object} props
 */
var postMapper = function postMapper(_ref6) {
  var data = _ref6.data,
      rest = _objectWithoutProperties(_ref6, ['data']);

  var post = get(data, 'post') || get(data, 'postBy');
  var featured = get(post, 'featuredImage.mediaItemId');
  var details = {
    author: get(post, 'author'),
    categories: get(post, 'tags.categories'),
    date: get(post, 'date'),
    modified: get(post, 'modified'),
    tags: get(post, 'tags.nodes')
  };

  return Object.assign({
    details: details,
    featured: featured
  }, omit(post, ['author', 'categories', 'featuredImage', 'tags', 'date', 'modified']), rest);
};

post.compose = queryComposer({
  view: post,
  Attachment: Attachment,
  whileLoading: { view: Loading },
  forError: { view: Error, type: '404-post' },
  queries: [{
    cond: function cond(_ref7) {
      var postId = _ref7.postId,
          uri = _ref7.uri,
          slug = _ref7.slug;
      return !!postId || !!uri || !!slug;
    },
    query: POST_BY_QUERY
  }, {
    cond: function cond(_ref8) {
      var id = _ref8.id;
      return !!id;
    },
    query: POST_QUERY
  }],
  sharedMapper: postMapper
});

var Post = post.compose({});
export { Post, post, POST_QUERY, POST_BY_QUERY };

postComments.compose = queryComposer({
  view: postComments,
  commentView: comment,
  editCommentView: editComment,
  queries: [{
    query: POST_COMMENTS_QUERY,
    config: {
      options: function options(_ref9) {
        var id = _ref9.id;
        return { id: id };
      }
    }
  }],
  whileLoading: {
    view: Loading
  },
  forError: { view: Error },
  extraHocs: [withApollo, postCommentsStateManager],
  sharedMapper: commentsMapper
});

var PostComments = postComments.compose({});
export { PostComments, postComments, comment, editComment, POST_COMMENTS_QUERY, NEW_COMMENT_MUTATION, DELETE_COMMENT_MUTATION, UPDATE_COMMENT_MUTATION };