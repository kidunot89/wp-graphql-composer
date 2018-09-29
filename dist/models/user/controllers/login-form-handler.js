var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { createFactory } from 'react';
import { omit, isEmpty } from 'lodash';
import { setDisplayName, wrapDisplayName } from 'recompose';
import v3 from 'uuid/v3';
import { VIEWER_QUERY } from '../query';

export default (function () {
  return function (BaseComponent) {
    var LoginFormHandler = function (_React$Component) {
      _inherits(LoginFormHandler, _React$Component);

      function LoginFormHandler(props) {
        _classCallCheck(this, LoginFormHandler);

        var _this = _possibleConstructorReturn(this, (LoginFormHandler.__proto__ || Object.getPrototypeOf(LoginFormHandler)).call(this, props));

        _this.reset = _this.reset.bind(_this);
        _this.valid = _this.valid.bind(_this);
        _this.printErrors = _this.printErrors.bind(_this);
        _this.processResults = _this.processResults.bind(_this);
        _this.onChange = _this.onChange.bind(_this);
        _this.onSubmit = _this.onSubmit.bind(_this);
        _this.state = {};
        return _this;
      }

      _createClass(LoginFormHandler, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
          this.reset();
        }
      }, {
        key: 'valid',
        value: function valid() {
          var _state$form = this.state.form,
              username = _state$form.username,
              password = _state$form.password;

          var errors = {};

          if (username.length < 1) errors.user = true;
          if (password.length < 1) errors.pass = true;
          if (!isEmpty(errors)) {
            this.setState({ form: this.printErrors(errors) });
            return false;
          };

          return true;
        }
      }, {
        key: 'printErrors',
        value: function printErrors(_ref) {
          var user = _ref.user,
              pass = _ref.pass;

          var formError = user && pass ? 'You must enter a username and password' : undefined;
          var userFieldError = user ? 'You must enter a username' : undefined;
          var passFieldError = pass ? 'You must enter a password' : undefined;
          return Object.assign({ formError: formError, userFieldError: userFieldError, passFieldError: passFieldError }, this.state.form);
        }
      }, {
        key: 'processResults',
        value: function processResults(payload) {
          var login = payload.data.login;


          if (login && login.authToken) {
            this.props.login(login.authToken);
          }
        }
      }, {
        key: 'onChange',
        value: function onChange(_ref2) {
          var _ref2$target = _ref2.target,
              name = _ref2$target.name,
              value = _ref2$target.value;

          var form = Object.assign(this.state.form, _defineProperty({}, name, value));
          this.setState(form);
        }
      }, {
        key: 'onSubmit',
        value: function onSubmit(event) {
          var _this2 = this;

          event.preventDefault();
          var mutate = this.props.mutate;
          var _state$form2 = this.state.form,
              password = _state$form2.password,
              username = _state$form2.username;

          // Validate

          if (!this.valid()) return;

          // Mutate
          mutate({
            variables: { clientId: v3('' + password + username, v3.URL), username: username, password: password },
            refetchQueries: [{ query: VIEWER_QUERY }]
          }).then(function (payload) {
            _this2.processResults(payload);
          }).catch(function (err) {
            var form = Object.assign({ formError: 'Invalid Login' }, _this2.state.form);
            _this2.setState({ form: form });
          });
        }
      }, {
        key: 'reset',
        value: function reset(event) {
          this.setState({
            form: {
              username: '',
              password: ''
            }
          });
        }
      }, {
        key: 'render',
        value: function render() {
          var onChange = this.onChange,
              onSubmit = this.onSubmit;
          var form = this.state.form;

          var newProps = Object.assign({}, omit(this.props, ['login', 'logout', 'mutate', 'loggedIn', 'data']), form, {
            onChange: onChange,
            onSubmit: onSubmit
          });

          return React.createElement(BaseComponent, newProps);
        }
      }]);

      return LoginFormHandler;
    }(React.Component);

    if (process.env.NODE_ENV !== 'production') {
      return setDisplayName(wrapDisplayName(BaseComponent, 'loginFormHandler'))(LoginFormHandler);
    }

    return LoginFormHandler;
  };
});