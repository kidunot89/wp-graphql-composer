// post-comments.jsx
/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { get, map } from 'lodash';
import classNames from 'classnames';
import { withApollo } from 'react-apollo';

/**
 * Internal dependencies
 */
import { Error, Loading } from '../utils'; 
import { queryComposer } from '../composers';
import { PostCommentsContext } from './context';
import { POST_COMMENTS_QUERY } from './query';
import { postCommentsStateManager, commentsMapper } from './comment-state-manager';
import { editComment } from './edit-comment';
import { comment } from './comment';

/**
 * SCSS Module
 */
import styles from './post-comments.module.scss';

/**
 * PostComments view component
 * 
 * @param {object} props
 * 
 * @returns {React.Component} 
 */
const postComments = ({
  commentsData, commentView: CommentView, editCommentView: EditCommentView,
  title, open, postId, className: added, 
  as: Container, ...rest
}) => (
  <PostCommentsContext.Consumer>
    {({ editing, onEdit: edit }) => {
      const newCommentKey = 'post-reply';
      const onEdit = edit(newCommentKey);
      const isEditing = editing[newCommentKey];
      const className = classNames(
        styles.area,
        added,
      );

      return (
        <Container
          id={`post-${postId}-comments`}
          className={classNames('comment-area', className)}
          {...rest}
        >
          {commentsData.length && 
            <React.Fragment>
              <h2 className={styles.title}>
                {`${commentsData.length} thoughts on ${title}`}
              </h2>
              <ol className={styles.list}>
                {map(
                  commentsData, 
                  comment => (
                    <CommentView
                      {...comment}
                      EditCommentView={EditCommentView}
                      key={comment.id}
                    />
                  )
                )}
              </ol>
            </React.Fragment>
          }
          <footer className={styles.footer}>
            {!!open && isEditing ? 
              <EditCommentView commentKey={newCommentKey} /> :
              <button
                className={styles.button}
                onClick={onEdit}
              >
                Add Comment
              </button>
            }
          </footer>
        </Container>
      );

    }}
  </PostCommentsContext.Consumer>
);

postComments.propTypes = {
  commentView: PropTypes.func.isRequired,
  editCommentView: PropTypes.func.isRequired,
  commentsData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })),
  postId: PropTypes.number.isRequired,
  open: PropTypes.bool,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};

postComments.defaultProps = {
  open: false,
  as: 'div'
};

/**
 * Creates composer for PostComments component
 */
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

/**
 * Compose default PostComments Component
 * @var {React.Component} PostComments
 */
const PostComments = postComments.compose();

export { postComments, PostComments };
