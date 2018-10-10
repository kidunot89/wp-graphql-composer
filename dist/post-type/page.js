function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { Parser as ReactParser } from 'html-to-react';

var parser = new ReactParser();

var page = function page(_ref) {
  var pageId = _ref.pageId,
      title = _ref.title,
      content = _ref.content,
      date = _ref.date,
      modified = _ref.modified,
      rest = _objectWithoutProperties(_ref, ['pageId', 'title', 'content', 'date', 'modified']);

  return React.createElement(
    'div',
    Object.assign({ id: 'page-' + title }, rest),
    React.createElement(
      'div',
      null,
      parser.parse(content)
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