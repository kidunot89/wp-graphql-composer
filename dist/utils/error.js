import _objectWithoutProperties from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import React from 'react';
import _ from 'lodash';

var error = function error(_ref) {
  var icon = _ref.icon,
      message = _ref.message,
      type = _ref.type,
      rest = _objectWithoutProperties(_ref, ["icon", "message", "type"]);

  return React.createElement("div", Object.assign({
    className: "".concat(type, "-error")
  }, rest), React.createElement("div", {
    className: "error-icon",
    "data-testid": "error-icon"
  }, icon), React.createElement("div", {
    className: "error-message",
    "data-testid": "error-message"
  }, Array.isArray(message) ? React.createElement("ul", null, _.map(message, function (item, i) {
    return React.createElement("li", {
      key: "item-".concat(i + 2)
    }, item);
  })) : message));
};

error.defaultProps = {
  icon: undefined,
  message: 'Hold it, there has been a problem!'
};
export default error;