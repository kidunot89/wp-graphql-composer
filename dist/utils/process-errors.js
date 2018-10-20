import _objectSpread from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectSpread";
import _objectWithoutProperties from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import React from 'react';
import Icon from './icon';
export var processMessage = function processMessage(defaultMessage, message) {
  if (process.env.REACT_APP_DEBUG_MODE) return message || defaultMessage;
  return defaultMessage;
};
export default (function (_ref) {
  var _ref$type = _ref.type,
      type = _ref$type === void 0 ? '' : _ref$type,
      message = _ref.message,
      rest = _objectWithoutProperties(_ref, ["type", "message"]);

  var notFound = /^404(?:-(.*))?$/;
  var notAuthorized = /^403(?:-(.*))?$/;
  var queryError = /^query(?:-(.*))?$/;
  var systemError = /^component(?:-(.*))?$/;
  var typename;

  switch (true) {
    case notFound.test(type):
      typename = type.replace(notFound, '$1') !== '' ? type.replace(notFound, '$1') : 'content';
      return _objectSpread({
        message: processMessage("Sorry, we can't locate the ".concat(typename, " you're looking for. Please, try again later."), message),
        icon: React.createElement(Icon, {
          name: "error",
          size: "large"
        }),
        type: type
      }, rest);

    case notAuthorized.test(type):
      typename = type.replace(notAuthorized, '$1') !== '' ? type.replace(notAuthorized, '$1') : 'content';
      return _objectSpread({
        message: processMessage("Sorry, you aren't authorized to view this ".concat(typename, "."), message),
        icon: React.createElement(Icon, {
          name: "block",
          size: "large"
        }),
        type: type
      }, rest);

    case queryError.test(type):
      typename = type.replace(queryError, '$1') !== '' ? type.replace(queryError, '$1') : 'content';
      return _objectSpread({
        message: processMessage("Sorry, there was a problem loading the ".concat(typename, " you are trying to access. Please, try again later."), message),
        icon: React.createElement(Icon, {
          name: "error_outline",
          size: "large"
        }),
        type: type
      }, rest);

    case systemError.test(type):
      typename = type.replace(systemError, '$1') !== '' ? type.replace(systemError, '$1') : 'content';
      return _objectSpread({
        message: processMessage("Sorry, there was a system error while loading the ".concat(typename, " you request. Please, try again later or report this to us."), message),
        icon: React.createElement(Icon, {
          name: "report",
          size: "large"
        }),
        type: type
      }, rest);

    default:
      return _objectSpread({
        message: processMessage('Wow, this is embarassing! We\'re not sure what happened. Or... a lazy dev just forgot to add a message here. Sorry!.', message),
        icon: React.createElement(Icon, {
          name: "sentiment_very_dissatisfied",
          size: "large"
        }),
        type: type
      }, rest);
  }
});