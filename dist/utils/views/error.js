function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

var error = function error(_ref) {
  var icon = _ref.icon,
      message = _ref.message,
      type = _ref.type,
      rest = _objectWithoutProperties(_ref, ['icon', 'message', 'type']);

  return React.createElement(
    'div',
    Object.assign({ className: type + '-error' }, rest),
    React.createElement(
      'div',
      { className: 'error-icon', 'data-testid': 'error-icon' },
      icon
    ),
    React.createElement(
      'div',
      { className: 'error-message', 'data-testid': 'error-message' },
      Array.isArray(message) ? React.createElement(
        'ul',
        null,
        _.map(message, function (item, i) {
          return React.createElement(
            'li',
            { key: 'item-' + (i + 2) },
            item
          );
        })
      ) : message
    )
  );
};

error.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
};

error.defaultProps = {
  icon: undefined,
  message: 'Hold it, there has been a problem!'
};

export default error;