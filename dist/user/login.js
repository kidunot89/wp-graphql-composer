import _objectWithoutProperties from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import React from 'react';
import './login.scss';

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
      rest = _objectWithoutProperties(_ref, ["username", "password", "userFieldError", "passFieldError", "formError", "onChange", "onSubmit", "className", "reset"]);

  return React.createElement("form", Object.assign({
    className: "login-form".concat(className ? ' ' + className : '', " "),
    onSubmit: onSubmit
  }, rest), formError && React.createElement("legend", {
    className: "login-form-info"
  }, formError), React.createElement("div", {
    className: "username-field".concat(userFieldError ? ' error' : '')
  }, React.createElement("input", {
    type: "text",
    name: "username",
    value: username,
    onChange: onChange,
    placeholder: "Enter Username"
  }), userFieldError && React.createElement("small", {
    className: "field-info"
  }, userFieldError)), React.createElement("div", {
    className: "password-field".concat(passFieldError ? ' error' : '')
  }, React.createElement("input", {
    type: "password",
    name: "password",
    value: password,
    onChange: onChange,
    placeholder: "Enter Password"
  }), passFieldError && React.createElement("small", {
    className: "field-info"
  }, passFieldError)), React.createElement("button", {
    className: "login-submit",
    type: "submit"
  }, "Sign In"));
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