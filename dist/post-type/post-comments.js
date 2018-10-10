function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { PostCommentsContext } from './context';

var postComments = function postComments(_ref) {
  var commentsData = _ref.commentsData,
      CommentView = _ref.commentView,
      EditCommentView = _ref.editCommentView,
      title = _ref.title,
      open = _ref.open,
      postId = _ref.postId,
      rest = _objectWithoutProperties(_ref, ['commentsData', 'commentView', 'editCommentView', 'title', 'open', 'postId']);

  return React.createElement(
    PostCommentsContext.Consumer,
    null,
    function (_ref2) {
      var editing = _ref2.editing,
          edit = _ref2.onEdit;

      var newCommentKey = 'post-reply';
      var onEdit = edit(newCommentKey);
      var isEditing = editing[newCommentKey];

      return React.createElement(
        'div',
        Object.assign({ id: 'post-' + postId + '-comments', className: 'comments-area' }, rest),
        commentsData.length && React.createElement(
          React.Fragment,
          null,
          React.createElement(
            'h2',
            { className: 'comments-title' },
            commentsData.length + ' thoughts on ' + title
          ),
          React.createElement(
            'ol',
            { className: 'comment-list' },
            map(commentsData, function (comment) {
              return React.createElement(CommentView, Object.assign({}, comment, {
                EditCommentView: EditCommentView,
                key: comment.id
              }));
            })
          )
        ),
        React.createElement(
          'footer',
          { className: 'post-comments-footer' },
          !!open && isEditing ? React.createElement(EditCommentView, { commentKey: newCommentKey }) : React.createElement(
            'button',
            {
              className: 'add-comment-button',
              onClick: onEdit
            },
            'Add Comment'
          )
        )
      );
    }
  );
};

postComments.propTypes = {
  commentView: PropTypes.func.isRequired,
  editCommentView: PropTypes.func.isRequired,
  commentsData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired
  })),
  postId: PropTypes.number.isRequired,
  open: PropTypes.bool
};

postComments.defaultProps = {
  open: false
};

export default postComments;