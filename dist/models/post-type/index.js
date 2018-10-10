/**
 * Post-type composer
 */
import { withApollo } from 'react-apollo';

import { Error, Loading, queryComposer } from 'lib';
import { attachment, comment, editComment, page, post, postComments } from './views';
import { attachmentMapper, pageMapper, postMapper, postCommentsStateManager, commentsMapper } from './controllers';
import { ATTACHMENT_QUERY, PAGE_QUERY, PAGE_BY_QUERY, POST_QUERY, POST_BY_QUERY, POST_COMMENTS_QUERY, DELETE_COMMENT_MUTATION, NEW_COMMENT_MUTATION, UPDATE_COMMENT_MUTATION } from './query';

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

page.compose = queryComposer({
  view: page,
  whileLoading: { view: Loading },
  forError: { view: Error, type: '404-page' },
  queries: [{
    cond: function cond(_ref3) {
      var pageId = _ref3.pageId,
          uri = _ref3.uri;
      return !!pageId || !!uri;
    },
    query: PAGE_BY_QUERY
  }, {
    cond: function cond(_ref4) {
      var id = _ref4.id;
      return !!id;
    },
    query: PAGE_QUERY
  }],
  sharedMapper: pageMapper
});

var Page = page.compose({});
export { Page, page, PAGE_QUERY, PAGE_BY_QUERY };

post.compose = queryComposer({
  view: post,
  whileLoading: { view: Loading },
  forError: { view: Error, type: '404-post' },
  queries: [{
    cond: function cond(_ref5) {
      var postId = _ref5.postId,
          uri = _ref5.uri,
          slug = _ref5.slug;
      return !!postId || !!uri || !!slug;
    },
    query: POST_BY_QUERY
  }, {
    cond: function cond(_ref6) {
      var id = _ref6.id;
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
      options: function options(_ref7) {
        var id = _ref7.id;
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