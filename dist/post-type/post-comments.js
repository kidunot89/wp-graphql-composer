import _objectWithoutProperties from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import React from 'react';
import { map } from 'lodash';
import { PostCommentsContext } from './context';
import './post-comments.scss';

var postComments = function postComments(_ref) {
  var commentsData = _ref.commentsData,
      CommentView = _ref.commentView,
      EditCommentView = _ref.editCommentView,
      title = _ref.title,
      open = _ref.open,
      postId = _ref.postId,
      rest = _objectWithoutProperties(_ref, ["commentsData", "commentView", "editCommentView", "title", "open", "postId"]);

  return React.createElement(PostCommentsContext.Consumer, null, function (_ref2) {
    var editing = _ref2.editing,
        edit = _ref2.onEdit;
    var newCommentKey = 'post-reply';
    var onEdit = edit(newCommentKey);
    var isEditing = editing[newCommentKey];
    return React.createElement("div", Object.assign({
      id: "post-".concat(postId, "-comments"),
      className: "comment-area"
    }, rest), commentsData.length && React.createElement(React.Fragment, null, React.createElement("h2", {
      className: "comment-title"
    }, "".concat(commentsData.length, " thoughts on ").concat(title)), React.createElement("ol", {
      className: "comment-list"
    }, map(commentsData, function (comment) {
      return React.createElement(CommentView, Object.assign({}, comment, {
        EditCommentView: EditCommentView,
        key: comment.id
      }));
    }))), React.createElement("footer", {
      className: "post-comments-footer"
    }, !!open && isEditing ? React.createElement(EditCommentView, {
      commentKey: newCommentKey
    }) : React.createElement("button", {
      className: "add-comment-button",
      onClick: onEdit
    }, "Add Comment")));
  });
};

postComments.defaultProps = {
  open: false
};
export default postComments;