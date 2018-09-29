function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';

var userControls = function userControls(_ref) {
  var className = _ref.className,
      userId = _ref.userId,
      nicename = _ref.nicename,
      firstName = _ref.firstName,
      logout = _ref.logout,
      rest = _objectWithoutProperties(_ref, ['className', 'userId', 'nicename', 'firstName', 'logout']);

  return React.createElement(
    'div',
    Object.assign({ className: 'user-controls' + (className ? ' ' + className : '') }, rest),
    React.createElement(
      'div',
      { className: 'greeting' },
      React.createElement(
        'h3',
        null,
        'Welcome back, ',
        ' ',
        ' ',
        React.createElement(
          'strong',
          null,
          nicename ? nicename : firstName
        ),
        '!'
      )
    ),
    React.createElement(
      'div',
      { className: 'logout' },
      React.createElement(
        'button',
        {
          className: 'logout-button',
          onClick: logout
        },
        'Logout'
      )
    )
  );
};

userControls.propTypes = {
  userId: PropTypes.number,
  nicename: PropTypes.string,
  firstName: PropTypes.string,
  logout: PropTypes.func
};

userControls.defaultProps = {
  userId: undefined,
  nicename: undefined,
  firstName: undefined,
  logout: undefined
};

export default userControls;