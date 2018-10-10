function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';

var main = function main(_ref) {
  var Archive = _ref.Archive,
      children = _ref.children,
      className = _ref.className,
      Page = _ref.Page,
      Post = _ref.Post,
      Routes = _ref.Routes,
      rest = _objectWithoutProperties(_ref, ['Archive', 'children', 'className', 'Page', 'Post', 'Routes']);

  return React.createElement(
    'div',
    Object.assign({ className: 'main' + (className ? ' ' + className : '') }, rest),
    React.createElement(Routes, { Archive: Archive, Page: Page, Post: Post }),
    children
  );
};

main.propTypes = {
  Archive: PropTypes.func.isRequired,
  Page: PropTypes.func.isRequired,
  Post: PropTypes.func.isRequired,
  Routes: PropTypes.func.isRequired,
  className: PropTypes.string
};

main.defaultProps = {
  className: undefined
};

export default main;