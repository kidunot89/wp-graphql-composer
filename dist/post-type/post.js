function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { Parser as ReactParser } from 'html-to-react';

var parser = new ReactParser();
var post = function post(_ref) {
  var featured = _ref.featured,
      postId = _ref.postId,
      title = _ref.title,
      content = _ref.content,
      details = _ref.details,
      Attachment = _ref.Attachment,
      DetailsComponent = _ref.DetailsComponent,
      rest = _objectWithoutProperties(_ref, ['featured', 'postId', 'title', 'content', 'details', 'Attachment', 'DetailsComponent']);

  return React.createElement(
    'article',
    Object.assign({ id: 'post-' + postId }, rest),
    featured && React.createElement(Attachment, {
      mediaItemId: featured,
      'data-attachment-id': featured,
      className: 'wp-post-image'
    }),
    parser.parse(content)
  );
};

post.propTypes = {
  Attachment: PropTypes.func.isRequired,
  featured: PropTypes.number,
  postId: PropTypes.number.isRequired,
  title: PropTypes.string,
  content: PropTypes.string,
  details: PropTypes.shape({
    author: PropTypes.shape({}),
    date: PropTypes.string,
    modified: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.shape({})),
    categories: PropTypes.arrayOf(PropTypes.shape({}))
  })
};

post.defaultProps = {
  featured: undefined,
  title: undefined,
  content: undefined,
  details: undefined
};

export default post;