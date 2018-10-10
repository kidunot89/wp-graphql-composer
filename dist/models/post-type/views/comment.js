function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Parser as ReactParser } from 'html-to-react';

import { Attachment } from 'lib/models/post-type';
import { PostCommentsContext } from '../context';

var parser = new ReactParser();

// Comment Author V Card
var AuthorVCard = function AuthorVCard(_ref) {
  var userId = _ref.userId,
      nicename = _ref.nicename,
      name = _ref.name,
      avatar = _ref.avatar;
  return React.createElement(
    'div',
    { className: 'comment-author vcard' },
    avatar ? React.createElement(Attachment, {
      className: 'avatar avatar-' + userId + ' photo',
      src: avatar.url,
      fallback: true
    }) : React.createElement(Attachment, {
      className: 'avatar photo',
      src: 'https://secure.gravatar.com/avatar/',
      fallback: true
    }),
    React.createElement(
      'strong',
      { className: 'fn' },
      nicename ? React.createElement(
        Link,
        { to: '/author/' + nicename },
        nicename
      ) : name
    ),
    React.createElement(
      'span',
      { className: 'says' },
      ' says:'
    )
  );
};

// Comment Metadata
var Metadata = function Metadata(_ref2) {
  var date = _ref2.date,
      modified = _ref2.modified,
      editable = _ref2.editable,
      onEdit = _ref2.onEdit,
      onDelete = _ref2.onDelete;

  return React.createElement(
    'div',
    { className: 'comment-metadata' },
    React.createElement(
      'time',
      { dateTime: date },
      moment(date).format('MMMM Do YYYY [at] h:mm a')
    ),
    modified && React.createElement(
      'time',
      { dateTime: modified },
      moment(modified).format('MMMM Do YYYY [at] h:mm a')
    ),
    editable && React.createElement(
      React.Fragment,
      null,
      React.createElement(
        'span',
        { className: 'edit-link' },
        React.createElement(
          'button',
          { onClick: onEdit },
          'Edit'
        )
      ),
      React.createElement(
        'span',
        { className: 'delete-link' },
        React.createElement(
          'button',
          { onClick: onDelete },
          'Delete'
        )
      )
    )
  );
};

// Comment Content
var Content = function Content(_ref3) {
  var content = _ref3.content;
  return React.createElement(
    'div',
    { className: 'comment-content' },
    parser.parse(content)
  );
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
      rest = _objectWithoutProperties(_ref4, ['id', 'commentId', 'type', 'content', 'date', 'modified', 'author', 'EditCommentView']);

  var newCommentKey = 'comment-' + commentId + '-reply';
  var updateCommentKey = 'comment-' + commentId + '-edit';
  return React.createElement(
    PostCommentsContext.Consumer,
    null,
    function (_ref5) {
      var editing = _ref5.editing,
          edit = _ref5.onEdit,
          deleted = _ref5.onDelete,
          userId = _ref5.userId;

      var onEdit = edit(updateCommentKey, content);
      var isEditing = editing[updateCommentKey];
      var onDelete = deleted(id);

      // If editing render form for editing content
      if (isEditing) return React.createElement(
        'div',
        { id: 'comment-' + commentId },
        React.createElement(EditCommentView, {
          id: id,
          commentKey: updateCommentKey,
          submitButtonText: 'Save Changes',
          update: true
        })
      );

      // else render comment
      return React.createElement(
        'li',
        { id: 'comment-' + commentId, className: 'comment' },
        React.createElement(
          'article',
          Object.assign({ id: 'div-comment-' + commentId, className: 'comment-body' }, rest),
          React.createElement(
            'footer',
            { className: 'comment-meta' },
            React.createElement(AuthorVCard, author),
            React.createElement(Metadata, {
              date: date,
              modified: modified,
              onEdit: onEdit,
              onDelete: onDelete,
              editable: author.userId === userId
            })
          ),
          React.createElement(Content, { content: content })
        )
      );
    }
  );
};

comment.propTypes = {
  id: PropTypes.string.isRequired,
  commentId: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  EditCommentView: PropTypes.func.isRequired,
  author: PropTypes.shape({}),
  date: PropTypes.string,
  type: PropTypes.string
};

comment.defaultProps = {
  author: {},
  date: undefined,
  type: undefined
};

export default comment;