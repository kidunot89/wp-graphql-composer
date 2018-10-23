import _defineProperty from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/defineProperty";
import React from 'react';
import classNames from 'classnames';
import styles from './icon.module.scss';

var icon = function icon(_ref) {
  var Element = _ref.as,
      name = _ref.name,
      size = _ref.size,
      added = _ref.className,
      color = _ref.color,
      dark = _ref.dark,
      light = _ref.light,
      inactive = _ref.inactive;
  var className = classNames(styles.icon, styles[size], _defineProperty({}, styles.dark, dark), _defineProperty({}, styles.light, light), _defineProperty({}, styles.inactive, inactive), added);
  var style = color ? inactive ? {
    color: "".concat(color, "30")
  } : {
    color: color
  } : undefined;
  return React.createElement(Element, {
    className: className,
    style: style
  }, name);
};

icon.defaultProps = {
  name: undefined,
  as: 'i',
  className: undefined,
  size: 'small',
  color: undefined,
  light: undefined,
  dark: undefined,
  inactive: undefined
};
export default icon;