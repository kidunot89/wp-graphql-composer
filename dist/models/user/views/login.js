function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';

var login = function login(_ref) {
  var username = _ref.username,
      password = _ref.password,
      userFieldError = _ref.userFieldError,
      passFieldError = _ref.passFieldError,
      formError = _ref.formError,
      onChange = _ref.onChange,
      onSubmit = _ref.onSubmit,
      className = _ref.className,
      reset = _ref.reset,
      rest = _objectWithoutProperties(_ref, ['username', 'password', 'userFieldError', 'passFieldError', 'formError', 'onChange', 'onSubmit', 'className', 'reset']);

  return React.createElement(
    'form',
    Object.assign({ className: 'login-form' + (className ? ' ' + className : '') + ' ', onSubmit: onSubmit }, rest),
    formError && React.createElement(
      'legend',
      { className: 'login-form-info' },
      formError
    ),
    React.createElement(
      'div',
      { className: 'login-username' + (userFieldError ? ' error' : '') },
      React.createElement('input', {
        type: 'text',
        name: 'username',
        value: username,
        onChange: onChange,
        placeholder: 'Enter Username'
      }),
      userFieldError && React.createElement(
        'small',
        { className: 'login-username-info' },
        userFieldError
      )
    ),
    React.createElement(
      'div',
      { className: 'login-password' + (passFieldError ? ' error' : '') },
      React.createElement('input', {
        type: 'password',
        name: 'password',
        value: password,
        onChange: onChange,
        placeholder: 'Enter Password'
      }),
      passFieldError && React.createElement(
        'small',
        { className: 'login-password-info' },
        passFieldError
      )
    ),
    React.createElement(
      'button',
      { type: 'submit' },
      'Sign In'
    )
  );
};

login.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  userFieldError: PropTypes.string,
  passFieldError: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
};

login.defaultProps = {
  username: '',
  password: '',
  userFieldError: undefined,
  passFieldError: undefined,
  onChange: function onChange() {
    return null;
  },
  onSubmit: function onSubmit() {
    return null;
  }
};

export default login;