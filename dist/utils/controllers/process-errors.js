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

  switch (type) {
    case '404':
    case '404-image':
      return Object.assign({
        message: processMessage('Sorry, we can\'t locate the ' + (type === '404-image' ? 'image' : 'page') + ' you\'re looking for. Please, try again later.', message),
        icon: React.createElement(FontAwesomeIcon, { color: 'Tomato', size: '2x', icon: ['fas', 'times'], mask: ['fas', 'circle'] })
      }, rest);

    case '403':
      return Object.assign({
        message: processMessage('Sorry, you aren\'t authorized to view this content.', message),
        icon: React.createElement(FontAwesomeIcon, { color: 'Tomato', size: '2x', icon: ['fas', 'ban'] })
      }, rest);

    case 'query':
      return Object.assign({
        message: processMessage('Sorry, there was a problem loading the content you are trying to access. Please, try again later.', message),
        icon: React.createElement(FontAwesomeIcon, { color: 'Tomato', size: '2x', icon: ['fas', 'exclamation-circle'] })
      }, rest);

    default:
      return Object.assign({
        message: processMessage('Wow, this is embarassing! We\'re not sure what happened. Or... a lazy dev just forgot to add a message here. Sorry!.', message),
        icon: React.createElement(FontAwesomeIcon, { size: '2x', icon: ['fas', 'grin-beam-sweat'] })
      }, rest);
  }
});