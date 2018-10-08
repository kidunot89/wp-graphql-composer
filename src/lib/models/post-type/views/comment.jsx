import React from 'react';
import PropTypes from 'prop-types';
import { PostCommentsContext } from '../context';

/**
 * Comment View Layer Component
 * @param {*} param0 
 */
const comment = ({
  id, commentId, type, content, date, 
  author, EditCommentView, ...rest
}) => {
  const newCommentKey = `comment-${commentId}-reply`;
  const updateCommentKey = `comment-${commentId}-edit`;
  return (
    <PostCommentsContext.Consumer>
      {({ editing, onEdit: edit, onDelete: deleted, userId }) => {
        const onEdit = edit(updateCommentKey, content);
        const isEditing = editing[updateCommentKey];
        const onDelete = deleted(id);

        // If editing render form for editing content
        if (isEditing) return (
          <div id={`comment-${commentId}`}>
            <EditCommentView
              id={id}
              commentKey={updateCommentKey} 
              submitButtonText="Save Changes"
              update
            />
          </div>
        );

        // else render comment
        return (
          <div id={`comment-${commentId}`} {...rest}>
            {/* if logged in user is the comment author add update and delete buttons */}
            {author.userId === userId &&
              (
                <React.Fragment>
                  <button className="edit-button" onClick={onEdit}>Edit</button>
                  <button className="delete-button" onClick={onDelete}>Delete</button>
                </React.Fragment>
              )
            }
            <div className="comment-body">{content}</div>
          </div>
        );

      }}
    </PostCommentsContext.Consumer>
  )
  
  
};

comment.propTypes = {
  id: PropTypes.string.isRequired,
  commentId: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  EditCommentView: PropTypes.func.isRequired,
  author: PropTypes.shape({}),
  date: PropTypes.string,
  type: PropTypes.string,
};

comment.defaultProps = {
  author: {},
  date: undefined,
  type: undefined,
};

export default comment;
