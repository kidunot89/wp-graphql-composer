function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

var page = function page(_ref) {
  var pageId = _ref.pageId,
      title = _ref.title,
      content = _ref.content,
      date = _ref.date,
      modified = _ref.modified,
      rest = _objectWithoutProperties(_ref, ['pageId', 'title', 'content', 'date', 'modified']);

  return React.createElement(
    'article',
    Object.assign({ id: 'page-' + title, className: 'page type-page' }, rest),
    React.createElement(
      'div',
      { className: 'entry-content' },
      ReactHtmlParser(content)
    )
  );
};

page.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string
};

page.defaultProps = {
  title: undefined,
  content: ''
};

export default page;