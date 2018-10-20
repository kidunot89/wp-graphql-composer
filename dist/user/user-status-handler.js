import _objectSpread from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectSpread";
import _classCallCheck from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
import React, { createFactory } from 'react';
import { omit } from 'lodash';
import { setDisplayName, wrapDisplayName } from 'recompose';
export default (function () {
  return function (BaseComponent) {
    var BaseFactory = createFactory(BaseComponent);

    var UserStatusHandler =
    /*#__PURE__*/
    function (_React$Component) {
      _inherits(UserStatusHandler, _React$Component);

      function UserStatusHandler(props) {
        var _this;

        _classCallCheck(this, UserStatusHandler);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(UserStatusHandler).call(this, props));
        _this.login = _this.login.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.logout = _this.logout.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.returningUser = _this.returningUser.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.state = {
          loggedIn: false
        };
        return _this;
      }

      _createClass(UserStatusHandler, [{
        key: "componentWillMount",
        value: function componentWillMount() {
          this.returningUser();
        }
      }, {
        key: "returningUser",
        value: function returningUser() {
          var loggedIn = localStorage.getItem('user-token');
          if (loggedIn) this.setState({
            loggedIn: loggedIn
          });
        }
      }, {
        key: "login",
        value: function login(loggedIn) {
          localStorage.setItem('user-token', loggedIn);
          this.setState({
            loggedIn: loggedIn
          });
        }
      }, {
        key: "logout",
        value: function logout() {
          var _this2 = this;

          new Promise(function (resolve) {
            _this2.setState({
              loggedIn: false
            }, function () {
              localStorage.removeItem('user-token');
              resolve();
            });
          }).then(function () {
            return _this2.props.client.resetStore();
          });
        }
      }, {
        key: "render",
        value: function render() {
          var login = this.login,
              logout = this.logout;
          return BaseFactory(_objectSpread({}, omit(this.props, ['client']), this.state, {
            login: login,
            logout: logout
          }));
        }
      }]);

      return UserStatusHandler;
    }(React.Component);

    if (process.env.NODE_ENV !== 'production') {
      return setDisplayName(wrapDisplayName(BaseComponent, 'userStatusHandler'))(UserStatusHandler);
    }

    return UserStatusHandler;
  };
});