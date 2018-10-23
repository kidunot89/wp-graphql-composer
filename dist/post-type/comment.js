import _objectWithoutProperties from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import classNames from 'classnames';
import { Attachment } from './';
import { PostCommentsContext } from './context';
import styles from './comment.module.scss'; // Comment Author V Card

var AuthorVCard = function AuthorVCard(_ref) {
  var userId = _ref.userId,
      nicename = _ref.nicename,
      name = _ref.name,
      avatar = _ref.avatar;
  var avatarClassName = classNames(styles.avatar, "avatar-".concat(userId));
  return React.createElement("div", {
    className: styles.author
  }, avatar ? React.createElement(Attachment, {
    className: avatarClassName,
    src: avatar.url,
    fallback: true
  }) : React.createElement(Attachment, {
    className: "avatar photo",
    src: "https://secure.gravatar.com/avatar/",
    fallback: true
  }), React.createElement("strong", {
    className: styles.fn
  }, nicename ? React.createElement(Link, {
    to: "/author/".concat(nicename)
  }, nicename) : name), React.createElement("span", {
    className: styles.says
  }, " says:"));
}; // Comment Metadata


var Metadata = function Metadata(_ref2) {
  var date = _ref2.date,
      editable = _ref2.editable,
      onEdit = _ref2.onEdit,
      onDelete = _ref2.onDelete;
  return React.createElement("div", {
    className: styles.metadata
  }, React.createElement("time", {
    className: styles.datetime,
    dateTime: date
  }, moment(date).format('LLL')), editable && React.createElement(React.Fragment, null, React.createElement("span", {
    className: "".concat(styles.button, " ").concat(styles.edit)
  }, React.createElement("button", {
    onClick: onEdit
  }, "Edit")), React.createElement("span", {
    className: "".concat(styles.button, " ").concat(styles.delete)
  }, React.createElement("button", {
    onClick: onDelete
  }, "Delete"))));
}; // Comment Content


var Content = function Content(_ref3) {
  var content = _ref3.content;
  return React.createElement("div", {
    className: styles.content
  }, ReactHtmlParser(content));
};
/**
 * Comment View Layer Component
 * @param {*} param0 
 */


var comment = function comment(_ref4) {
  var id = _ref4.id,
      commentId = _ref4.commentId,
      type = _ref4.type,
      content = _ref4.content,
      date = _ref4.date,
      modified = _ref4.modified,
      author = _ref4.author,
      EditCommentView = _ref4.EditCommentView,
      added = _ref4.className,
      Container = _ref4.as,
      rest = _objectWithoutProperties(_ref4, ["id", "commentId", "type", "content", "date", "modified", "author", "EditCommentView", "className", "as"]);

  // const newCommentKey = `comment-${commentId}-reply`; - TODO...
  var updateCommentKey = "comment-".concat(commentId, "-edit");
  return React.createElement(PostCommentsContext.Consumer, null, function (_ref5) {
    var editing = _ref5.editing,
        edit = _ref5.onEdit,
        deleted = _ref5.onDelete,
        userId = _ref5.userId;
    var onEdit = edit(updateCommentKey, content);
    var isEditing = editing[updateCommentKey];
    var onDelete = deleted(id);
    var className = classNames(styles.comment, added); // If editing render form for editing content

    if (isEditing) return React.createElement(Container, {
      id: "comment-".concat(commentId),
      className: className
    }, React.createElement(EditCommentView, {
      id: id,
      commentKey: updateCommentKey,
      submitButtonText: "Save Changes",
      update: true
    })); // else render comment

    return React.createElement(Container, {
      id: "comment-".concat(commentId),
      className: className
    }, React.createElement("article", Object.assign({
      id: "div-comment-".concat(commentId),
      className: styles.body
    }, rest), React.createElement("footer", {
      className: styles.meta
    }, React.createElement(AuthorVCard, author), React.createElement(Metadata, {
      date: date,
      modified: modified,
      onEdit: onEdit,
      onDelete: onDelete,
      editable: author.userId === userId
    })), React.createElement(Content, {
      content: content
    })));
  });
};

comment.defaultProps = {
  author: {},
  date: undefined,
  type: undefined,
  as: 'div',
  className: undefined
};
export default comment;