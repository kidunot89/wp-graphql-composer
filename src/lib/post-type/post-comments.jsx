import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { PostCommentsContext } from './context';

import './post-comments.scss';

const postComments = ({
  commentsData, commentView: CommentView, editCommentView: EditCommentView,
  title, open, postId, ...rest
}) => (
  <PostCommentsContext.Consumer>
    {({ editing, onEdit: edit }) => {
      const newCommentKey = 'post-reply';
      const onEdit = edit(newCommentKey);
      const isEditing = editing[newCommentKey];

      return (
        <div id={`post-${postId}-comments`} className="comment-area" {...rest}>
          {commentsData.length && 
            <React.Fragment>
              <h2 className="comment-title">
                {`${commentsData.length} thoughts on ${title}`}
              </h2>
              <ol className="comment-list">
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
          <footer className="post-comments-footer">
            {!!open && isEditing ? 
              <EditCommentView commentKey={newCommentKey} /> :
              <button
                className="add-comment-button"
                onClick={onEdit}
              >
                Add Comment
              </button>
            }
          </footer>
        </div>
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
};

postComments.defaultProps = {
  open: false,
};

export default postComments;
