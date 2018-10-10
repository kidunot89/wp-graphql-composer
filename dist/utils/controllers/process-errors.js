function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

// Load icons to FontAwesome library
library.add(fas);

export var processMessage = function processMessage(defaultMessage, message) {
  if (process.env.REACT_APP_DEBUG_MODE) return message || defaultMessage;
  return defaultMessage;
};

export default (function (_ref) {
  var _ref$type = _ref.type,
      type = _ref$type === undefined ? '' : _ref$type,
      message = _ref.message,
      rest = _objectWithoutProperties(_ref, ['type', 'message']);

  var notFound = /^404(?:-(.*))?$/;
  var notAuthorized = /^403(?:-(.*))?$/;
  var queryError = /^query(?:-(.*))?$/;
  var systemError = /^component(?:-(.*))?$/;
  var typename = void 0;
  switch (true) {
    case notFound.test(type):
      typename = type.replace(notFound, '$1') !== '' ? type.replace(notFound, '$1') : 'content';
      return Object.assign({
        message: processMessage('Sorry, we can\'t locate the ' + typename + ' you\'re looking for. Please, try again later.', message),
        icon: React.createElement(FontAwesomeIcon, { color: 'Tomato', size: '2x', icon: ['fas', 'times'], mask: ['fas', 'circle'] }),
        type: type
      }, rest);

    case notAuthorized.test(type):
      typename = type.replace(notAuthorized, '$1') !== '' ? type.replace(notAuthorized, '$1') : 'content';
      return Object.assign({
        message: processMessage('Sorry, you aren\'t authorized to view this ' + typename + '.', message),
        icon: React.createElement(FontAwesomeIcon, { color: 'Tomato', size: '2x', icon: ['fas', 'ban'] }),
        type: type
      }, rest);

    case queryError.test(type):
      typename = type.replace(queryError, '$1') !== '' ? type.replace(queryError, '$1') : 'content';
      return Object.assign({
        message: processMessage('Sorry, there was a problem loading the ' + typename + ' you are trying to access. Please, try again later.', message),
        icon: React.createElement(FontAwesomeIcon, { color: 'Tomato', size: '2x', icon: ['fas', 'exclamation-circle'] }),
        type: type
      }, rest);

    case systemError.test(type):
      typename = type.replace(systemError, '$1') !== '' ? type.replace(systemError, '$1') : 'content';
      return Object.assign({
        message: processMessage('Sorry, there was a system error while loading the ' + typename + ' you request. Please, try again later or report this to us.', message),
        icon: React.createElement(FontAwesomeIcon, { color: 'Tomato', size: '2x', icon: ['fas', 'exclamation-triangle'] }),
        type: type
      }, rest);

    default:
      return Object.assign({
        message: processMessage('Wow, this is embarassing! We\'re not sure what happened. Or... a lazy dev just forgot to add a message here. Sorry!.', message),
        icon: React.createElement(FontAwesomeIcon, { size: '2x', icon: ['fas', 'grin-beam-sweat'] }),
        type: type
      }, rest);
  }
});