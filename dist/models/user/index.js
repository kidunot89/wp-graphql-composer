function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import { get } from 'lodash';
import { branch, compose, mapProps, withHandlers, renderComponent } from 'recompose';
import { graphql, withApollo } from 'react-apollo';

import { whileLoading, forError, Loading, Error } from 'lib';
import login from './views/login';
import { loginFormHandler, userStatusHandler } from './controllers';
import userControls from './views/user-controls';
import { VIEWER_QUERY, LOGIN_MUTATION } from './query';

/**
 * Composes user controls component
 * 
 * @param {React.Component} template - view layer of user controls
 * @param {React.Component} error - fallback component for handling errors
 * @param {React.Component} loading fallback component for handling loading state 
 */
userControls.compose = function () {
  var template = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : userControls;
  var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Error;
  var loading = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Loading;
  return compose(graphql(VIEWER_QUERY), whileLoading(loading), forError(error), mapProps(function (_ref) {
    var loggedIn = _ref.loggedIn,
        login = _ref.login,
        data = _ref.data,
        rest = _objectWithoutProperties(_ref, ['loggedIn', 'login', 'data']);

    var userId = get(data, 'viewer.userId');
    var nicename = get(data, 'viewer.nicename');
    var firstName = get(data, 'viewer.firstName');

    return Object.assign({ userId: userId, nicename: nicename, firstName: firstName }, rest);
  }))(template);
};

var UserControls = userControls.compose();

/**
 * Composes login component
 * 
 * @param {React.Component} template - view layer of login
 * @param {React.Component} userControlsTemplate - callback component for handling successful logins 
 */
login.compose = function () {
  var template = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : login;
  var userControlsTemplate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : userControls.compose();
  var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Error;
  return compose(forError(error), withApollo, userStatusHandler(), branch(function (props) {
    return get(props, 'loggedIn');
  }, renderComponent(userControlsTemplate)), graphql(LOGIN_MUTATION), loginFormHandler())(template);
};

var Login = login.compose();

export { Login, login, UserControls, userControls, VIEWER_QUERY, LOGIN_MUTATION };