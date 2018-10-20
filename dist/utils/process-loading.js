import _objectSpread from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectSpread";
import _objectWithoutProperties from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import React from 'react';
import { get } from 'lodash';
import Icon from './icon';
export var defaultIcon = React.createElement(Icon, {
  name: "autorenew",
  size: "large"
});
export default (function (_ref) {
  var data = _ref.data,
      altIcon = _ref.icon,
      message = _ref.message,
      rest = _objectWithoutProperties(_ref, ["data", "icon", "message"]);

  var icon = altIcon ? altIcon : defaultIcon;
  var total = get(data, 'networkStatus') || get(data, 'loading');

  if (total) {
    var min = 0;
    var max = 7;
    return _objectSpread({
      progress: {
        total: total,
        min: min,
        max: max
      },
      icon: icon,
      message: message
    }, rest);
  }

  return _objectSpread({
    icon: icon,
    message: message
  }, rest);
});