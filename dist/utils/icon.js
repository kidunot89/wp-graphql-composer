import React from 'react';
import './icon.scss';

var icon = function icon(_ref) {
  var Element = _ref.as,
      name = _ref.name,
      size = _ref.size,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? "" : _ref$className;
  return React.createElement(Element, {
    className: "".concat(size, " material-icons ").concat(className)
  }, name);
};

icon.defaultProps = {
  as: 'i',
  className: undefined,
  size: 'small'
};
export default icon;