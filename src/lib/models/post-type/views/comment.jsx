import React from 'react';
import PropTypes from 'prop-types';

const comment = ({
  commentId, type, content,
  date, author, onEdit, onDelete,
  editing, EditCommentView, onUpdate,
  onChange, ...rest
}) => {
  if (editing) return (
    <div id={`comment-${commentId}`} {...rest}>
      <EditCommentView
        message={content}
        onChange={onChange}
        onSubmit={onUpdate}
        submitButtonText="Save Changes"
      />
    </div>
  );
  return (
    <div id={`comment-${commentId}`} {...rest}>
      {!!onEdit && <button className="edit-button" onClick={onEdit}></button>}
      {!!onDelete && <button className="delete-button" onClick={onDelete}></button>}
      <div className="comment-body">{content}</div>
    </div>
  );
};

comment.propTypes = {
  commentId: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  EditCommentView: PropTypes.func.isRequired,
  author: PropTypes.shape({}),
  date: PropTypes.shape({}),
  editing: PropTypes.bool,
  type: PropTypes.string,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onUpdate: PropTypes.func,
};

comment.defaultProps = {
  onChange: undefined,
  onDelete: undefined,
  onEdit: undefined,
  onUpdate: undefined,
};

export default comment;
