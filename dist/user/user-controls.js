import _objectWithoutProperties from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import React from 'react';
import './user-controls.scss';

var userControls = function userControls(_ref) {
  var className = _ref.className,
      userId = _ref.userId,
      nicename = _ref.nicename,
      firstName = _ref.firstName,
      logout = _ref.logout,
      rest = _objectWithoutProperties(_ref, ["className", "userId", "nicename", "firstName", "logout"]);

  return React.createElement("div", Object.assign({
    className: "user-controls".concat(className ? ' ' + className : '')
  }, rest), React.createElement("div", {
    className: "greeting"
  }, React.createElement("h3", null, "Welcome back, ", ' ', " ", React.createElement("strong", null, nicename ? nicename : firstName), "!")), React.createElement("div", {
    className: "logout"
  }, React.createElement("button", {
    onClick: logout
  }, "Logout")));
};

userControls.defaultProps = {
  userId: undefined,
  nicename: undefined,
  firstName: undefined,
  logout: undefined
};
export default userControls;