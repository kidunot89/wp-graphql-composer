/**
 * Post-type composer
 */
import { withApollo } from 'react-apollo';
import { get, omit } from 'lodash';
import { Error, Loading } from '../utils';
import { queryComposer } from '../composers';
import { ATTACHMENT_QUERY, PAGE_QUERY, PAGE_BY_QUERY, POST_QUERY, POST_BY_QUERY, POST_COMMENTS_QUERY, DELETE_COMMENT_MUTATION, NEW_COMMENT_MUTATION, UPDATE_COMMENT_MUTATION } from './query';
import attachmentMapper from './attachment-mapper';
import { pageStateManager, postStateManager } from './state-manager';
import { postCommentsStateManager, commentsMapper } from './comment-state-manager';
import attachment from './attachment';
import comment from './comment';
import editComment from './edit-comment';
import page from './page';
import post from './post';
import postComments from './post-comments';
attachment.compose = queryComposer({
  view: attachment,
  whileLoading: {
    view: Loading
  },
  forError: {
    view: Error,
    type: '404-image'
  },
  queries: [{
    query: ATTACHMENT_QUERY,
    config: {
      options: function options(_ref) {
        var id = _ref.id,
            mediaItemId = _ref.mediaItemId,
            slug = _ref.slug,
            uri = _ref.uri;
        return {
          id: id,
          mediaItemId: mediaItemId,
          slug: slug,
          uri: uri
        };
      },
      skip: function skip(_ref2) {
        var id = _ref2.id,
            mediaItemId = _ref2.mediaItemId,
            slug = _ref2.slug,
            uri = _ref2.uri;
        return !id && !mediaItemId && !slug && !uri;
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

page.compose = queryComposer({
  view: page,
  queries: [{
    cond: function cond(_ref3) {
      var pageId = _ref3.pageId,
          uri = _ref3.uri;
      return !!pageId || !!uri;
    },
    query: PAGE_BY_QUERY,
    config: {
      options: function options(_ref4) {
        var pageId = _ref4.pageId,
            uri = _ref4.uri;
        return {
          pageId: pageId,
          uri: uri
        };
      }
    }
  }, {
    cond: function cond(_ref5) {
      var id = _ref5.id;
      return !!id;
    },
    query: PAGE_QUERY,
    config: {
      options: function options(_ref6) {
        var id = _ref6.id;
        return {
          id: id
        };
      }
    }
  }],
  whileLoading: {
    view: Loading
  },
  forError: {
    view: Error,
    type: '404-page'
  },
  extraHocs: [pageStateManager]
});
var Page = page.compose({});
export { Page, page, PAGE_QUERY, PAGE_BY_QUERY };
/**
 * Post Prop Mapper
 * @param {object} props
 */

post.compose = queryComposer({
  view: post,
  Attachment: Attachment,
  queries: [{
    cond: function cond(_ref7) {
      var postId = _ref7.postId,
          uri = _ref7.uri,
          slug = _ref7.slug;
      return !!postId || !!uri || !!slug;
    },
    query: POST_BY_QUERY,
    config: {
      options: function options(_ref8) {
        var postId = _ref8.postId,
            uri = _ref8.uri,
            slug = _ref8.slug;
        return {
          postId: postId,
          uri: uri,
          slug: slug
        };
      }
    }
  }, {
    cond: function cond(_ref9) {
      var id = _ref9.id;
      return !!id;
    },
    query: POST_QUERY,
    config: {
      options: function options(_ref10) {
        var id = _ref10.id;
        return {
          id: id
        };
      }
    }
  }],
  whileLoading: {
    view: Loading
  },
  forError: {
    view: Error,
    type: '404-post'
  },
  extraHocs: [postStateManager]
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
      options: function options(_ref11) {
        var id = _ref11.id;
        return {
          variables: {
            id: id
          },
          notifyOnNetworkStatusChange: true
        };
      }
    }
  }],
  whileLoading: {
    view: Loading,
    cond: function cond(props) {
      return !!get(props, 'data.networkStatus') && get(props, 'data.networkStatus') < 7;
    }
  },
  forError: {
    view: Error
  },
  extraHocs: [withApollo, postCommentsStateManager],
  sharedMapper: commentsMapper
});
var PostComments = postComments.compose({});
export { PostComments, postComments, comment, editComment, POST_COMMENTS_QUERY, NEW_COMMENT_MUTATION, DELETE_COMMENT_MUTATION, UPDATE_COMMENT_MUTATION };