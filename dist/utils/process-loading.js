function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import { get } from 'lodash';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

// Load icons to FontAwesome library
library.add(fas);

export var defaultIcon = React.createElement(
  'div',
  { className: 'fa-layers' },
  React.createElement(FontAwesomeIcon, { size: '2x', icon: ['fas', 'circle'] }),
  React.createElement(FontAwesomeIcon, { size: '2x', icon: ['fas', 'circle-notch'], transform: 'shrink-1', color: '#B2F300', spin: true })
);

export default (function (_ref) {
  var data = _ref.data,
      altIcon = _ref.icon,
      message = _ref.message,
      rest = _objectWithoutProperties(_ref, ['data', 'icon', 'message']);

  var icon = altIcon ? altIcon : defaultIcon;

  var total = get(data, 'networkStatus') || get(data, 'loading');
  if (total) {
    var min = 0;
    var max = 7;

    return Object.assign({
      progress: { total: total, min: min, max: max },
      icon: icon,
      message: message
    }, rest);
  }

  return Object.assign({ icon: icon, message: message }, rest);
});