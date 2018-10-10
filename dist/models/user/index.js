function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import { get } from 'lodash';
import { branch, compose, mapProps, renderComponent } from 'recompose';
import { graphql, withApollo } from 'react-apollo';

import { whileLoading, forError, queryComposer } from 'lib/composers';
import { Loading, Error } from 'lib/utils';
import login from './views/login';
import { loginFormHandler, userStatusHandler } from './controllers';
import userControls from './views/user-controls';
import { VIEWER_QUERY, LOGIN_MUTATION } from './query';

userControls.compose = queryComposer({
  view: userControls,
  queries: [{ query: VIEWER_QUERY }],
  whileLoading: { view: Loading },
  forError: { view: Error },
  sharedMapper: function sharedMapper(_ref) {
    var loggedIn = _ref.loggedIn,
        login = _ref.login,
        data = _ref.data,
        rest = _objectWithoutProperties(_ref, ['loggedIn', 'login', 'data']);

    var userId = get(data, 'viewer.userId');
    var nicename = get(data, 'viewer.nicename');
    var firstName = get(data, 'viewer.firstName');

    return Object.assign({ userId: userId, nicename: nicename, firstName: firstName }, rest);
  }
});

var UserControls = userControls.compose({});

login.compose = function (_ref2) {
  var _ref2$view = _ref2.view,
      view = _ref2$view === undefined ? login : _ref2$view,
      _ref2$userControlsVie = _ref2.userControlsView,
      userControlsView = _ref2$userControlsVie === undefined ? UserControls : _ref2$userControlsVie,
      _ref2$forError = _ref2.forError,
      error = _ref2$forError === undefined ? { view: Error } : _ref2$forError,
      _ref2$loginCond = _ref2.loginCond,
      loginCond = _ref2$loginCond === undefined ? function (props) {
    return get(props, 'loggedIn');
  } : _ref2$loginCond;
  return compose(forError(error), withApollo, userStatusHandler(), branch(function (props) {
    return loginCond(props);
  }, renderComponent(userControlsView)), graphql(LOGIN_MUTATION), loginFormHandler())(view);
};

var Login = login.compose({});

export { Login, login, UserControls, userControls, VIEWER_QUERY, LOGIN_MUTATION };