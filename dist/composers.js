var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { createFactory } from 'react';
import { get, map } from 'lodash';
import { branch, compose, renderComponent, mapProps, setDisplayName, wrapDisplayName } from 'recompose';
import { graphql } from 'react-apollo';

/**
 * HOCs for rendering a component when loading flag is found in props
 * maps loading progress props to provided component 
 * 
 * @param {React.Component} component - component to be rendered
 * @param {string} propName - name of prop holding loading flag
 * @param {object} loadingStatus - holds loading progress properties
 */
export var whileLoading = function whileLoading(component) {
  var propName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'data.loading';
  var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Loading...';
  return branch(function (props) {
    return !!get(props, propName);
  }, renderComponent(mapProps(function (props) {
    return Object.assign({}, props, { message: message });
  })(component)));
};

/**
 * HOCs for catching errors in all components wrapped in it
 */
export var errorHandler = function errorHandler() {
  return function (BaseComponent) {
    var BaseFactory = createFactory(BaseComponent);

    var ErrorHandler = function (_React$Component) {
      _inherits(ErrorHandler, _React$Component);

      function ErrorHandler(props) {
        _classCallCheck(this, ErrorHandler);

        var _this = _possibleConstructorReturn(this, (ErrorHandler.__proto__ || Object.getPrototypeOf(ErrorHandler)).call(this, props));

        _this.state = {};
        return _this;
      }

      _createClass(ErrorHandler, [{
        key: 'componentDidCatch',
        value: function componentDidCatch(error, errorInfo) {
          this.setState({ error: error.toString(), errorInfo: errorInfo.toString() });
        }
      }, {
        key: 'render',
        value: function render() {
          return BaseFactory(Object.assign({}, this.props, this.state));
        }
      }]);

      return ErrorHandler;
    }(React.Component);

    if (process.env.NODE_ENV !== 'production') {
      return setDisplayName(wrapDisplayName(BaseComponent, 'errorHandler'))(ErrorHandler);
    }

    return ErrorHandler;
  };
};

/**
 * HOCs for rendering a component when error flag/message is found in props
 * maps error message props to provided component
 * 
 * @param {React.Component} component - component to be rendered
 * @param {string} errorType - error type prop to be passed to component
 * @param {string} messagePropName - name of prop holding error message
 */
var forError = function forError(component, errorType) {
  var messagePropName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "data.error.message";
  return compose(
  // Catch errors below
  errorHandler(),
  // Catch errors above
  branch(function (props) {
    return (!!get(props, messagePropName) || !!get(props, 'error')) && !props.fallback;
  }, renderComponent(compose(mapProps(function (props) {
    return {
      message: get(props, messagePropName) || get(props, 'error'),
      type: errorType
    };
  }))(component))), mapProps(function (_ref) {
    var error = _ref.error,
        errorInfo = _ref.errorInfo,
        rest = _objectWithoutProperties(_ref, ['error', 'errorInfo']);

    return rest;
  }));
};

export { forError };
export var composeQuery = function composeQuery(queries) {
  return compose.apply(undefined, _toConsumableArray(map(queries, function (_ref2) {
    var cond = _ref2.cond,
        query = _ref2.query,
        config = _ref2.config;
    return branch(function (props) {
      return cond(props);
    }, graphql(query, config));
  })));
};