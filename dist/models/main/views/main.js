function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';

var main = function main(_ref) {
  var className = _ref.className,
      routes = _ref.routes,
      children = _ref.children,
      rest = _objectWithoutProperties(_ref, ['className', 'routes', 'children']);

  return React.createElement(
    'div',
    Object.assign({ className: 'main' + (className ? ' ' + className : '') }, rest),
    routes,
    children
  );
};

main.propTypes = {
  className: PropTypes.string,
  routes: PropTypes.shape({}).isRequired
};

main.defaultProps = {
  className: undefined
};

export default main;