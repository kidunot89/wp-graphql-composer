function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { isNull } from 'lodash';

import { PostCommentsContext } from '../context';

var editComment = function editComment(_ref) {
  var id = _ref.id,
      commentKey = _ref.commentKey,
      update = _ref.update,
      submitButtonText = _ref.submitButtonText,
      rest = _objectWithoutProperties(_ref, ['id', 'commentKey', 'update', 'submitButtonText']);

  return React.createElement(
    PostCommentsContext.Consumer,
    null,
    function (_ref2) {
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

      return React.createElement(
        'form',
        Object.assign({ className: 'comment-form' }, rest),
        !isNull(author) && React.createElement('input', {
          type: 'text',
          name: 'author',
          value: author,
          onChange: onChange,
          placeholder: 'Enter Name'
        }),
        !isNull(authorEmail) && React.createElement('input', {
          type: 'text',
          name: 'authorEmail',
          value: authorEmail,
          onChange: onChange,
          placeholder: 'Enter Email'
        }),
        !isNull(authorUrl) && React.createElement('input', {
          type: 'text',
          name: 'authorUrl',
          value: authorUrl,
          onChange: onChange,
          placeholder: 'Enter Website'
        }),
        React.createElement('textarea', {
          name: 'content',
          value: content,
          onChange: onChange,
          placeholder: 'Enter Message'
        }),
        error && React.createElement(
          'p',
          null,
          error
        ),
        React.createElement(
          'button',
          { onClick: onSubmit },
          submitButtonText
        )
      );
    }
  );
};

editComment.propTypes = {
  commentKey: PropTypes.string.isRequired,
  id: PropTypes.string,
  submitButtonText: PropTypes.string,
  update: PropTypes.bool
};

editComment.defaultProps = {
  update: false,
  submitButtonText: 'Leave Comment'
};

export default editComment;