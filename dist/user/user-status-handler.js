var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { createFactory } from 'react';
import { omit } from 'lodash';
import { setDisplayName, wrapDisplayName } from 'recompose';

export default (function () {
  return function (BaseComponent) {
    var BaseFactory = createFactory(BaseComponent);

    var UserStatusHandler = function (_React$Component) {
      _inherits(UserStatusHandler, _React$Component);

      function UserStatusHandler(props) {
        _classCallCheck(this, UserStatusHandler);

        var _this = _possibleConstructorReturn(this, (UserStatusHandler.__proto__ || Object.getPrototypeOf(UserStatusHandler)).call(this, props));

        _this.login = _this.login.bind(_this);
        _this.logout = _this.logout.bind(_this);
        _this.returningUser = _this.returningUser.bind(_this);
        _this.state = {
          loggedIn: false
        };
        return _this;
      }

      _createClass(UserStatusHandler, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
          this.returningUser();
        }
      }, {
        key: 'returningUser',
        value: function returningUser() {
          var loggedIn = localStorage.getItem('user-token');
          if (loggedIn) this.setState({ loggedIn: loggedIn });
        }
      }, {
        key: 'login',
        value: function login(loggedIn) {
          localStorage.setItem('user-token', loggedIn);
          this.setState({ loggedIn: loggedIn });
        }
      }, {
        key: 'logout',
        value: function logout() {
          var _this2 = this;

          new Promise(function (resolve) {
            _this2.setState({ loggedIn: false }, function () {
              localStorage.removeItem('user-token');
              resolve();
            });
          }).then(function () {
            return _this2.props.client.resetStore();
          });
        }
      }, {
        key: 'render',
        value: function render() {
          var login = this.login,
              logout = this.logout;


          return BaseFactory(Object.assign({}, omit(this.props, ['client']), this.state, {
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