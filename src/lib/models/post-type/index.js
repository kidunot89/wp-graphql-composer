/**
 * Post-type composer
 */
import { withApollo } from 'react-apollo';

import { Error, Loading, queryComposer } from 'lib';
import { attachment, comment, editComment, page, post, postComments } from './views';
import {
  attachmentMapper, pageMapper, postMapper,
  postCommentsStateManager, commentsMapper
} from './controllers';
import {
  ATTACHMENT_QUERY, PAGE_QUERY, PAGE_BY_QUERY, POST_QUERY, POST_BY_QUERY,
  POST_COMMENTS_QUERY, DELETE_COMMENT_MUTATION, NEW_COMMENT_MUTATION,
  UPDATE_COMMENT_MUTATION, 
} from './query';

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

page.compose = queryComposer({
  view: page,
  whileLoading: { view: Loading },
  forError: { view: Error, type: '404-page' },
  queries: [{
    cond: ({ pageId, uri }) => !!pageId || !!uri,
    query: PAGE_BY_QUERY,
  }, {
    cond: ({ id }) => !!id,
    query: PAGE_QUERY,
  }],
  sharedMapper: pageMapper
});

const Page = page.compose({});
export { Page, page, PAGE_QUERY, PAGE_BY_QUERY };

post.compose = queryComposer({
  view: post,
  whileLoading: { view: Loading },
  forError: { view: Error, type: '404-post' },
  queries: [{
    cond: ({ postId, uri, slug }) => !!postId || !!uri || !!slug,
    query: POST_BY_QUERY,
  }, {
    cond: ({ id }) => !!id,
    query: POST_QUERY,
  }],
  sharedMapper: postMapper,
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
      options: ({ id }) => ({ id }),
    }
  }],
  whileLoading: {
    view: Loading,
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
