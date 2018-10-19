/**
 * Post-type composer
 */
import { withApollo } from 'react-apollo';
import { get, omit } from 'lodash';

import { Error, Loading } from '../utils'; 
import { queryComposer } from '../composers';

import {
  ATTACHMENT_QUERY, PAGE_QUERY, PAGE_BY_QUERY, POST_QUERY, POST_BY_QUERY,
  POST_COMMENTS_QUERY, DELETE_COMMENT_MUTATION, NEW_COMMENT_MUTATION,
  UPDATE_COMMENT_MUTATION, 
} from './query';

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
  whileLoading: { view: Loading },
  forError: { view: Error, type: '404-image' },
  queries: [{
    query: ATTACHMENT_QUERY,
    config: {
      options: ({ mediaItemId }) => ({ mediaItemId }),
      skip: ({ mediaItemId }) => !mediaItemId
    }
  }],
  sharedMapper: attachmentMapper
});

const Attachment = attachment.compose({});
export { Attachment, attachment, ATTACHMENT_QUERY };

/**
 * Page Prop Mapper
 * @param {object} props 
 */
page.compose = queryComposer({
  view: page,
  queries: [{
    cond: ({ pageId, uri }) => !!pageId || !!uri,
    query: PAGE_BY_QUERY,
    config: { options: ({ pageId, uri }) => ({ pageId, uri }) }
  }, {
    cond: ({ id }) => !!id,
    query: PAGE_QUERY,
    config: { options: ({ id }) => ({ id }) }
  }],
  whileLoading: { view: Loading },
  forError: { view: Error, type: '404-page' },
  extraHocs: [pageStateManager],
});

const Page = page.compose({});
export { Page, page, PAGE_QUERY, PAGE_BY_QUERY };

/**
 * Post Prop Mapper
 * @param {object} props
 */
post.compose = queryComposer({
  view: post,
  Attachment,
  queries: [{
    cond: ({ postId, uri, slug }) => !!postId || !!uri || !!slug,
    query: POST_BY_QUERY,
    config: { options: ({ postId, uri, slug }) => ({ postId, uri, slug }) }
  }, {
    cond: ({ id }) => !!id,
    query: POST_QUERY,
    config: { options: ({ id }) => ({ id }) }
  }],
  whileLoading: { view: Loading },
  forError: { view: Error, type: '404-post' },
  extraHocs: [postStateManager],
});

const Post = post.compose({});
export { Post, post, POST_QUERY, POST_BY_QUERY };

postComments.compose = queryComposer({
  view: postComments,
  commentView: comment,
  editCommentView: editComment,
  queries: [{
    query: POST_COMMENTS_QUERY,
    config: {
      options: ({ id }) => ({ 
        variables: { id },
        notifyOnNetworkStatusChange: true, 
      })
    }
  }],
  whileLoading: {
    view: Loading,
    cond: props => !!get(props, 'data.networkStatus') && get(props, 'data.networkStatus') < 7,
  },
  forError: { view: Error },
  extraHocs: [ withApollo, postCommentsStateManager ],
  sharedMapper: commentsMapper,
});

const PostComments = postComments.compose({});
export {
  PostComments, postComments, comment, editComment, POST_COMMENTS_QUERY,
  NEW_COMMENT_MUTATION, DELETE_COMMENT_MUTATION, UPDATE_COMMENT_MUTATION,
};
