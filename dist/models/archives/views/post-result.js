function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';

var postResult = function postResult(_ref) {
  var id = _ref.id,
      postId = _ref.postId,
      excerpt = _ref.excerpt,
      title = _ref.title,
      date = _ref.date,
      modified = _ref.modified,
      featuredImage = _ref.featuredImage,
      author = _ref.author,
      categories = _ref.categories,
      tags = _ref.tags,
      rest = _objectWithoutProperties(_ref, ['id', 'postId', 'excerpt', 'title', 'date', 'modified', 'featuredImage', 'author', 'categories', 'tags']);

  return React.createElement('div', Object.assign({ className: 'result' }, rest));
};

postResult.propTypes = {
  id: PropTypes.string.isRequired,
  postId: PropTypes.number.isRequired,
  excerpt: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  modified: PropTypes.string,
  featuredImage: PropTypes.shape({}),
  author: PropTypes.shape({}),
  categories: PropTypes.shape({}),
  tags: PropTypes.shape({})
};

postResult.defaultProps = {
  content: undefined,
  title: undefined,
  date: undefined,
  modified: undefined,
  featuredImage: undefined,
  author: undefined,
  categories: undefined,
  tags: undefined
};

export default postResult;