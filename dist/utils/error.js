import _objectWithoutProperties from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import styles from './error.module.scss';

var error = function error(_ref) {
  var icon = _ref.icon,
      message = _ref.message,
      type = _ref.type,
      rest = _objectWithoutProperties(_ref, ["icon", "message", "type"]);

  var className = classNames(styles.error, "".concat(type, "-error"), styles.on);
  return React.createElement("div", Object.assign({
    className: className
  }, rest), React.createElement("div", {
    className: styles.content
  }, React.createElement("div", {
    className: styles.icon
  }, icon), React.createElement("div", {
    className: styles.message
  }, Array.isArray(message) ? React.createElement("ul", null, _.map(message, function (item, i) {
    return React.createElement("li", {
      key: "item-".concat(i + 2)
    }, item);
  })) : message)));
};

error.defaultProps = {
  icon: undefined,
  message: 'Hold it, there has been a problem!'
};
export default error;