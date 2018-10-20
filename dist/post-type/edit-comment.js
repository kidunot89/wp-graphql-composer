import _objectWithoutProperties from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import React from 'react';
import { isNull } from 'lodash';
import { PostCommentsContext } from './context';
import './edit-comment.scss';

var editComment = function editComment(_ref) {
  var id = _ref.id,
      commentKey = _ref.commentKey,
      update = _ref.update,
      submitButtonText = _ref.submitButtonText,
      rest = _objectWithoutProperties(_ref, ["id", "commentKey", "update", "submitButtonText"]);

  return React.createElement(PostCommentsContext.Consumer, null, function (_ref2) {
    var _ref2$workingState$co = _ref2.workingState[commentKey],
        author = _ref2$workingState$co.author,
        authorEmail = _ref2$workingState$co.authorEmail,
        authorUrl = _ref2$workingState$co.authorUrl,
        content = _ref2$workingState$co.content,
        error = _ref2$workingState$co.error,
        change = _ref2.onChange,
        onUpdate = _ref2.onUpdate,
        onCreate = _ref2.onCreate;
    var onChange = change(commentKey);
    var onSubmit = update ? onUpdate(commentKey, id) : onCreate(commentKey);
    return React.createElement("form", Object.assign({
      className: "comment-form"
    }, rest, {
      onSubmit: onSubmit
    }), !isNull(author) && React.createElement("input", {
      type: "text",
      name: "author",
      value: author,
      onChange: onChange,
      placeholder: "Enter Name"
    }), !isNull(authorEmail) && React.createElement("input", {
      type: "text",
      name: "authorEmail",
      value: authorEmail,
      onChange: onChange,
      placeholder: "Enter Email"
    }), !isNull(authorUrl) && React.createElement("input", {
      type: "text",
      name: "authorUrl",
      value: authorUrl,
      onChange: onChange,
      placeholder: "Enter Website"
    }), React.createElement("textarea", {
      name: "content",
      value: content,
      onChange: onChange,
      placeholder: "Enter Message"
    }), error && React.createElement("p", null, error), React.createElement("button", {
      type: "submit"
    }, submitButtonText));
  });
};

editComment.defaultProps = {
  update: false,
  submitButtonText: 'Leave Comment'
};
export default editComment;