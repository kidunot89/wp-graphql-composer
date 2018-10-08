import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { PostCommentsContext } from '../context';


const postComments = ({
  commentsData, commentView: CommentView, editCommentView: EditCommentView,
  open, postId, ...rest
}) => (
  <PostCommentsContext.Consumer>
    {({ editing, onEdit: edit }) => {
      const newCommentKey = 'post-reply';
      const onEdit = edit(newCommentKey);
      const isEditing = editing[newCommentKey];

      return (
        <section id={`post-${postId}-comments`} {...rest}>
          {map(
            commentsData, 
            comment => (
              <CommentView
                {...comment}
                EditCommentView={EditCommentView}
                className="comment"
                key={comment.id}
              />
            )
          )}
          
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
        </section>
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
