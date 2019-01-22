import ApolloClient from 'apollo-client';
import { ApolloLink, concat } from 'apollo-link';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { ApolloProvider, graphql, withApollo } from 'react-apollo';
import v3 from 'uuid/v3';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';
import React, { createFactory } from 'react';
import _, { each, get, map, omit, isEmpty, filter, sortBy, find } from 'lodash';
import { branch, compose, renderComponent, mapProps, setDisplayName, wrapDisplayName } from 'recompose';
import { Link, NavLink, Switch, Route } from 'react-router-dom';
import { gql } from 'apollo-boost';

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

/**
 * Return compiled className prop
 * 
 * @param {object} props - component props 
 * @param {string} root - base class 
 * @param  {...string} classes - boolean props to be converted to class names
 */

var compileClassName = function compileClassName(props) {
  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var className = root;

  for (var _len = arguments.length, classes = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    classes[_key - 2] = arguments[_key];
  }

  each(classes, function (cN) {
    if (_typeof(cN) === 'object') {
      if (!!get(props, cN.name)) className = "".concat(className, " ").concat(cN.className);
    } else if (!!get(props, cN)) className = "".concat(className, " ").concat(cN);
  });
  if (!!props.className) className = "".concat(className, " ").concat(props.className);
  return className;
};

var _jsxFileName = "/home/geoff/Dev/web/wp-graphql-composer/src/provider.jsx";
var createClient = function createClient(httpLink, fragmentData) {
  var cache = {
    dataIdFromObject: function dataIdFromObject(object) {
      return object.id;
    }
  };

  if (fragmentData) {
    cache.fragmentMatcher = new IntrospectionFragmentMatcher({
      introspectionQueryResultData: fragmentData
    });
  } // Add the authorization to the headers


  var authMiddleware = new ApolloLink(function (operation, forward) {
    var userToken = localStorage.getItem('user-token');

    if (userToken) {
      operation.setContext({
        headers: {
          authorization: userToken
        }
      });
    }

    return forward(operation);
  });
  return new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache(cache),
    clientState: {}
  });
};
var WPProvider = function WPProvider(_ref) {
  var fragmentData = _ref.fragmentData,
      link = _ref.link,
      children = _ref.children;
  var client = createClient(link, fragmentData);
  return React.createElement(ApolloProvider, {
    client: client,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41
    },
    __self: this
  }, children);
};

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

/**
 * HOCs for rendering a component when loading flag is found in props
 * maps loading progress props to provided component 
 * 
 * @param {React.Component} component - component to be rendered
 * @param {string} propName - name of prop holding loading flag
 * @param {object} loadingStatus - holds loading progress properties
 */

var whileLoading = function whileLoading(_ref) {
  var view = _ref.view,
      _ref$cond = _ref.cond,
      cond = _ref$cond === void 0 ? function (props) {
    return !!get(props, 'data.loading');
  } : _ref$cond;
  return branch(cond, renderComponent(view));
};
/**
 * HOCs for catching errors in all child components
 */

var errorHandler = function errorHandler(BaseComponent) {
  var BaseFactory = React.createFactory(BaseComponent);

  var ErrorHandler =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(ErrorHandler, _React$Component);

    function ErrorHandler(props) {
      var _this;

      _classCallCheck(this, ErrorHandler);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ErrorHandler).call(this, props));
      _this.state = {};
      return _this;
    }

    _createClass(ErrorHandler, [{
      key: "componentDidCatch",
      value: function componentDidCatch(error, errorInfo) {
        this.setState({
          error: error.toString(),
          errorInfo: map(errorInfo, function (e) {
            return e.toString();
          })
        });
      }
    }, {
      key: "render",
      value: function render() {
        return BaseFactory(_objectSpread({}, this.props, this.state));
      }
    }]);

    return ErrorHandler;
  }(React.Component);

  {
    return setDisplayName(wrapDisplayName(BaseComponent, 'errorHandler'))(ErrorHandler);
  }

  return ErrorHandler;
};
/**
 * HOCs for rendering a component when error flag/message is found in props
 * maps error message props to provided component
 * 
 * @param {React.Component} component - component to be rendered
 * @param {string} errorType - error type prop to be passed to component
 * @param {string} messagePropName - name of prop holding error message
 */

var forError = function forError(_ref2) {
  var view = _ref2.view,
      errorType = _ref2.type,
      _ref2$errorProp = _ref2.errorProp,
      errorProp = _ref2$errorProp === void 0 ? "data.error.message" : _ref2$errorProp,
      _ref2$cond = _ref2.cond,
      cond = _ref2$cond === void 0 ? function (props) {
    return !!get(props, errorProp) || !!get(props, 'error');
  } : _ref2$cond;
  return compose( // Catch errors below
  errorHandler, // Catch errors above
  branch(function (props) {
    return cond(props) && !props.fallback;
  }, renderComponent(compose(mapProps(function (props) {
    var type = errorType || 'system';
    var graphqlError = get(props, errorProp);

    if (graphqlError) {
      return {
        message: graphqlError,
        type: type
      };
    }

    var systemError = get(props, 'error');

    if (systemError) {
      var message = systemError;
      var errorInfo = props.errorInfo;

      if (Array.isArray(errorInfo)) {
        each(errorInfo, function (e) {
          return message = "".concat(message, " ").concat(e);
        });
      } else if (errorInfo) {
        message = "".concat(message, " ").concat(errorInfo);
      }

      return {
        message: message,
        type: type
      };
    }

    return {
      message: 'Unknown error',
      type: 'system'
    };
  }))(view))), mapProps(function (_ref3) {
    var error = _ref3.error,
        errorInfo = _ref3.errorInfo,
        rest = _objectWithoutProperties(_ref3, ["error", "errorInfo"]);

    return rest;
  }));
};
/**
 * @typedef QueryCondition
 * @property {func} cond - condition function ex. (props) -> !!props.id
 * @property {gql} query - query to be request
 * @property {object} config - graphql(query, config)
 * @property {func} mapper - props mapper function
 */

/**
 * Return an instance of the `graphql` higher order component for 
 * the first QueryCondition to return true.  
 * @param {QueryCondition} queries 
 */

var composeQuery = function composeQuery(queries) {
  return compose.apply(void 0, _toConsumableArray(map(queries, function (_ref4) {
    var query = _ref4.query,
        config = _ref4.config,
        _ref4$cond = _ref4.cond,
        cond = _ref4$cond === void 0 ? function () {
      return true;
    } : _ref4$cond;
    return branch(function (props) {
      return cond(props);
    }, graphql(query, config));
  })));
};
/**
 * 
 * @param {React.Component} defaultView
 * @param {func} defaultMapper 
 */

var utilComposer = function utilComposer(_ref5) {
  var defaultView = _ref5.defaultView,
      defaultMapper = _ref5.defaultMapper;
  return function () {
    var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref6$view = _ref6.view,
        view = _ref6$view === void 0 ? defaultView : _ref6$view,
        _ref6$mapper = _ref6.mapper,
        mapper = _ref6$mapper === void 0 ? defaultMapper : _ref6$mapper;

    return compose(mapProps(mapper))(view);
  };
};
/**
 * Returns composer function that creates a component 
 * wrapped multiple components for handling rudimentary
 * Loading->Error->mapper(view)
 * 
 * @param {React.Component} view - default properties for view layer component
 * @param {object} whileLoading - default properties for loading component
 * @param {object} forError - default properties for error component
 * @param {func} mapper - default function for mapping props
 * @param {React.Component[]} extraHocs - default extra higher order components added before mapper
 * @param {*} extraDefaults - default extra props passed to the view layer component
 */

var baseComposer = function baseComposer(_ref7) {
  var defaultView = _ref7.view,
      defaultWhileLoading = _ref7.whileLoading,
      defaultForError = _ref7.forError,
      defaultMapper = _ref7.mapper,
      _ref7$extraHocs = _ref7.extraHocs,
      defaultExtraHocs = _ref7$extraHocs === void 0 ? [] : _ref7$extraHocs,
      extraDefaults = _objectWithoutProperties(_ref7, ["view", "whileLoading", "forError", "mapper", "extraHocs"]);

  return function () {
    var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref8$view = _ref8.view,
        view = _ref8$view === void 0 ? defaultView : _ref8$view,
        _ref8$loading = _ref8.loading,
        loading = _ref8$loading === void 0 ? defaultWhileLoading : _ref8$loading,
        _ref8$error = _ref8.error,
        error = _ref8$error === void 0 ? defaultForError : _ref8$error,
        _ref8$mapper = _ref8.mapper,
        mapper = _ref8$mapper === void 0 ? defaultMapper : _ref8$mapper,
        _ref8$extraHocs = _ref8.extraHocs,
        extraHocs = _ref8$extraHocs === void 0 ? defaultExtraHocs : _ref8$extraHocs,
        rest = _objectWithoutProperties(_ref8, ["view", "loading", "error", "mapper", "extraHocs"]);

    return compose.apply(void 0, [whileLoading(loading), forError(error)].concat(_toConsumableArray(extraHocs), [mapProps(function (props) {
      return _objectSpread({}, mapper(props), extraDefaults, rest);
    })]))(view);
  };
};
/**
 * Returns composer function that creates a component 
 * wrapped multiple components for handling rudimentary
 * and conditional graphql components
 * GraphQL->Loading->Error->queryMapper->defaultExtraHocs->ExtraHocs->sharedMapper(view)
 * 
 * @param {React.Component} view - default properties for view layer component
 * @param {object[]} queries - array of default properties of the GraphQL components
 * @param {object} whileLoading - default properties for loading component
 * @param {object} forError - default properties for error component
 * @param {func} mapper - default function for mapping props
 * @param {React.Component[]} extraHocs - default extra higher order components added before sharedMapper
 * @param {*} extraDefaults - default extra props passed to the view layer component
 */

var queryComposer = function queryComposer(_ref9) {
  var defaultView = _ref9.view,
      defaultQueries = _ref9.queries,
      defaultWhileLoading = _ref9.whileLoading,
      defaultForError = _ref9.forError,
      _ref9$sharedMapper = _ref9.sharedMapper,
      defaultSharedMapper = _ref9$sharedMapper === void 0 ? function (p) {
    return p;
  } : _ref9$sharedMapper,
      _ref9$extraHocs = _ref9.extraHocs,
      defaultExtraHocs = _ref9$extraHocs === void 0 ? [] : _ref9$extraHocs,
      extraDefaults = _objectWithoutProperties(_ref9, ["view", "queries", "whileLoading", "forError", "sharedMapper", "extraHocs"]);

  return function () {
    var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref10$view = _ref10.view,
        view = _ref10$view === void 0 ? defaultView : _ref10$view,
        _ref10$queries = _ref10.queries,
        queries = _ref10$queries === void 0 ? defaultQueries : _ref10$queries,
        _ref10$loading = _ref10.loading,
        loading = _ref10$loading === void 0 ? defaultWhileLoading : _ref10$loading,
        _ref10$error = _ref10.error,
        error = _ref10$error === void 0 ? defaultForError : _ref10$error,
        _ref10$sharedMapper = _ref10.sharedMapper,
        sharedMapper = _ref10$sharedMapper === void 0 ? defaultSharedMapper : _ref10$sharedMapper,
        _ref10$extraHocs = _ref10.extraHocs,
        extraHocs = _ref10$extraHocs === void 0 ? defaultExtraHocs : _ref10$extraHocs,
        rest = _objectWithoutProperties(_ref10, ["view", "queries", "loading", "error", "sharedMapper", "extraHocs"]);

    return compose.apply(void 0, [composeQuery(queries), whileLoading(loading), forError(error)].concat(_toConsumableArray(map(queries, function (_ref11) {
      var _ref11$cond = _ref11.cond,
          cond = _ref11$cond === void 0 ? function () {
        return true;
      } : _ref11$cond,
          _ref11$mapper = _ref11.mapper,
          mapper = _ref11$mapper === void 0 ? function (p) {
        return p;
      } : _ref11$mapper;
      return branch(function (props) {
        return cond(props);
      }, mapProps(mapper));
    })), _toConsumableArray(extraHocs), [mapProps(function (props) {
      return _objectSpread({}, sharedMapper(props), extraDefaults, rest);
    })]))(view);
  };
};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret;

var printWarning = function() {};

{
  var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );

        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

var checkPropTypes_1 = checkPropTypes;

var printWarning$1 = function() {};

{
  printWarning$1 = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret_1) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if (typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning$1(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      printWarning$1('Invalid argument supplied to oneOf, expected an instance of array.');
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      printWarning$1('Invalid argument supplied to oneOfType, expected an instance of array.');
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning$1(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = objectAssign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes_1;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var propTypes = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

{
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = factoryWithTypeCheckers(isValidElement, throwOnDirectAccess);
}
});

var classnames = createCommonjsModule(function (module) {
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else {
		window.classNames = classNames;
	}
}());
});

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = "/* fallback */\n@font-face {\n  font-family: 'Material Icons';\n  font-style: normal;\n  font-weight: 400;\n  src: url(https://fonts.gstatic.com/s/materialicons/v41/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2) format(\"woff2\"); }\n\n.icon-module_icon__2yZIt {\n  font-family: 'Material Icons';\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  /* Preferred icon size */\n  display: inline-block;\n  line-height: 1;\n  text-transform: none;\n  letter-spacing: normal;\n  word-wrap: normal;\n  white-space: nowrap;\n  direction: ltr;\n  /* Support for all WebKit browsers. */\n  -webkit-font-smoothing: antialiased;\n  /* Support for Safari and Chrome. */\n  text-rendering: optimizeLegibility;\n  /* Support for Firefox. */\n  -moz-osx-font-smoothing: grayscale;\n  /* Support for IE. */\n  font-feature-settings: 'liga';\n  /* Rules for sizing the icon. */\n  /* Rules for using icons as black on a light background. */\n  /* Rules for using icons as white on a dark background. */ }\n  .icon-module_icon__2yZIt.icon-module_tiny__1I8eH {\n    font-size: 18px; }\n  .icon-module_icon__2yZIt.icon-module_small__3ScaU {\n    font-size: 24px; }\n  .icon-module_icon__2yZIt.icon-module_medium__iC63G {\n    font-size: 36px; }\n  .icon-module_icon__2yZIt.icon-module_large__4KEv8 {\n    font-size: 48px; }\n  .icon-module_icon__2yZIt.icon-module_dark__3GqUd {\n    color: rgba(0, 0, 0, 0.54); }\n    .icon-module_icon__2yZIt.icon-module_dark__3GqUd.icon-module_inactive__1MPLR {\n      color: rgba(0, 0, 0, 0.26); }\n  .icon-module_icon__2yZIt.icon-module_light__3506z {\n    color: white; }\n    .icon-module_icon__2yZIt.icon-module_light__3506z.icon-module_md-inactive__3YSkN {\n      color: rgba(255, 255, 255, 0.3); }\n";
var styles = {"icon":"icon-module_icon__2yZIt","tiny":"icon-module_tiny__1I8eH","small":"icon-module_small__3ScaU","medium":"icon-module_medium__iC63G","large":"icon-module_large__4KEv8","dark":"icon-module_dark__3GqUd","inactive":"icon-module_inactive__1MPLR","light":"icon-module_light__3506z","md-inactive":"icon-module_md-inactive__3YSkN"};
styleInject(css);

var _jsxFileName$1 = "/home/geoff/Dev/web/wp-graphql-composer/src/utils/icon.jsx";
/**
 * Icon Component
 * 
 * @param {Object} props
 * 
 * @return {React.Component} 
 */

var Icon = function Icon(_ref) {
  var Element = _ref.as,
      name = _ref.name,
      size = _ref.size,
      added = _ref.className,
      color = _ref.color,
      dark = _ref.dark,
      light = _ref.light,
      inactive = _ref.inactive;
  var className = classnames(styles.icon, styles[size], _defineProperty({}, styles.dark, dark), _defineProperty({}, styles.light, light), _defineProperty({}, styles.inactive, inactive), added);
  var style = color ? inactive ? {
    color: "".concat(color, "30")
  } : {
    color: color
  } : undefined;
  return React.createElement(Element, {
    className: className,
    style: style,
    __source: {
      fileName: _jsxFileName$1,
      lineNumber: 39
    },
    __self: this
  }, name);
};

Icon.propTypes = {
  name: propTypes.string,
  as: propTypes.oneOfType([propTypes.string, propTypes.func]),
  className: propTypes.string,
  size: propTypes.oneOf(['tiny', 'small', 'medium', 'large']),
  color: propTypes.string,
  light: propTypes.bool,
  dark: propTypes.bool,
  inactive: propTypes.bool
};
Icon.defaultProps = {
  name: undefined,
  as: 'i',
  className: undefined,
  size: 'small',
  color: undefined,
  light: undefined,
  dark: undefined,
  inactive: undefined
};

var _jsxFileName$2 = "/home/geoff/Dev/web/wp-graphql-composer/src/utils/process-loading.js";
var defaultIcon = React.createElement(Icon, {
  name: "autorenew",
  size: "large",
  __source: {
    fileName: _jsxFileName$2,
    lineNumber: 7
  },
  __self: window
});
var progressMapper = (function (_ref) {
  var data = _ref.data,
      altIcon = _ref.icon,
      message = _ref.message,
      rest = _objectWithoutProperties(_ref, ["data", "icon", "message"]);

  var icon = altIcon ? altIcon : defaultIcon;
  var total = get(data, 'networkStatus') || get(data, 'loading');

  if (total) {
    var min = 0;
    var max = 7;
    return _objectSpread({
      progress: {
        total: total,
        min: min,
        max: max
      },
      icon: icon,
      message: message
    }, rest);
  }

  return _objectSpread({
    icon: icon,
    message: message
  }, rest);
});

var css$1 = "@keyframes loading-module_icon_rotate__3j8AK {\n  0% {\n    transform: rotate(0deg); }\n  100% {\n    transform: rotate(359deg); } }\n\n.loading-module_loading__3GKWS {\n  position: relative;\n  width: 100%;\n  min-height: 450px; }\n  .loading-module_loading__3GKWS .loading-module_content__3blXz {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    display: inline-flex;\n    flex-direction: column; }\n    .loading-module_loading__3GKWS .loading-module_content__3blXz .loading-module_icon__3V0Pt {\n      padding: 0;\n      margin: 0;\n      text-align: center;\n      transform-origin: center;\n      transition: transform 450ms ease-out; }\n    .loading-module_loading__3GKWS .loading-module_content__3blXz .loading-module_message__2KfdZ {\n      font-size: 1.3em;\n      text-align: center; }\n  .loading-module_loading__3GKWS.loading-module_on__30Lwa .loading-module_icon__3V0Pt {\n    animation: loading-module_icon_rotate__3j8AK 1s linear infinite; }\n";
var styles$1 = {"loading":"loading-module_loading__3GKWS","content":"loading-module_content__3blXz","icon":"loading-module_icon__3V0Pt","message":"loading-module_message__2KfdZ","on":"loading-module_on__30Lwa","icon_rotate":"loading-module_icon_rotate__3j8AK"};
styleInject(css$1);

var _jsxFileName$3 = "/home/geoff/Dev/web/wp-graphql-composer/src/utils/loading.jsx";
/**
 * Loading view component
 * 
 * @param {object} props
 * 
 * @returns {React.Component}
 */

var loading = function loading(_ref) {
  var icon = _ref.icon,
      message = _ref.message,
      _ref$progress = _ref.progress,
      total = _ref$progress.total,
      max = _ref$progress.max;
  var className = classnames(styles$1.loading, styles$1.on);
  var percentage = total && max ? "".concat(Math.ceil(total / max), "%") : undefined;
  return React.createElement("div", {
    className: className,
    __source: {
      fileName: _jsxFileName$3,
      lineNumber: 37
    },
    __self: this
  }, React.createElement("div", {
    className: styles$1.content,
    __source: {
      fileName: _jsxFileName$3,
      lineNumber: 38
    },
    __self: this
  }, React.createElement("div", {
    className: styles$1.icon,
    "data-testid": "loading-icon",
    __source: {
      fileName: _jsxFileName$3,
      lineNumber: 39
    },
    __self: this
  }, icon), React.createElement("div", {
    className: styles$1.message,
    __source: {
      fileName: _jsxFileName$3,
      lineNumber: 40
    },
    __self: this
  }, message, " ", percentage)));
};

loading.propTypes = {
  icon: propTypes.oneOfType([propTypes.shape({}), propTypes.string]),
  message: propTypes.oneOfType([propTypes.arrayOf(propTypes.string), propTypes.string]),
  progress: propTypes.shape({
    min: propTypes.number,
    max: propTypes.number,
    total: propTypes.number
  })
};
loading.defaultProps = {
  icon: undefined,
  message: 'Loading...',
  progress: {
    min: 0,
    max: 0,
    total: 0
  }
};
/**
 * Creates composer for loading component
 */

loading.compose = utilComposer({
  defaultView: loading,
  defaultMapper: progressMapper
});
var Loading = loading.compose();

var _jsxFileName$4 = "/home/geoff/Dev/web/wp-graphql-composer/src/utils/process-errors.js";
var processMessage = function processMessage(defaultMessage, message) {
  return message || defaultMessage;
};
var errorMapper = (function (_ref) {
  var _ref$type = _ref.type,
      type = _ref$type === void 0 ? '' : _ref$type,
      message = _ref.message,
      rest = _objectWithoutProperties(_ref, ["type", "message"]);

  var notFound = /^404(?:-(.*))?$/;
  var notAuthorized = /^403(?:-(.*))?$/;
  var queryError = /^query(?:-(.*))?$/;
  var systemError = /^component(?:-(.*))?$/;
  var typename;

  switch (true) {
    case notFound.test(type):
      typename = type.replace(notFound, '$1') !== '' ? type.replace(notFound, '$1') : 'content';
      return _objectSpread({
        message: processMessage("Sorry, we can't locate the ".concat(typename, " you're looking for. Please, try again later."), message),
        icon: React.createElement(Icon, {
          name: "error",
          size: "large",
          __source: {
            fileName: _jsxFileName$4,
            lineNumber: 23
          },
          __self: this
        }),
        type: type
      }, rest);

    case notAuthorized.test(type):
      typename = type.replace(notAuthorized, '$1') !== '' ? type.replace(notAuthorized, '$1') : 'content';
      return _objectSpread({
        message: processMessage("Sorry, you aren't authorized to view this ".concat(typename, "."), message),
        icon: React.createElement(Icon, {
          name: "block",
          size: "large",
          __source: {
            fileName: _jsxFileName$4,
            lineNumber: 35
          },
          __self: this
        }),
        type: type
      }, rest);

    case queryError.test(type):
      typename = type.replace(queryError, '$1') !== '' ? type.replace(queryError, '$1') : 'content';
      return _objectSpread({
        message: processMessage("Sorry, there was a problem loading the ".concat(typename, " you are trying to access. Please, try again later."), message),
        icon: React.createElement(Icon, {
          name: "error_outline",
          size: "large",
          __source: {
            fileName: _jsxFileName$4,
            lineNumber: 47
          },
          __self: this
        }),
        type: type
      }, rest);

    case systemError.test(type):
      typename = type.replace(systemError, '$1') !== '' ? type.replace(systemError, '$1') : 'content';
      return _objectSpread({
        message: processMessage("Sorry, there was a system error while loading the ".concat(typename, " you request. Please, try again later or report this to us."), message),
        icon: React.createElement(Icon, {
          name: "report",
          size: "large",
          __source: {
            fileName: _jsxFileName$4,
            lineNumber: 59
          },
          __self: this
        }),
        type: type
      }, rest);

    default:
      return _objectSpread({
        message: processMessage('Wow, this is embarassing! We\'re not sure what happened. Or... a lazy dev just forgot to add a message here. Sorry!.', message),
        icon: React.createElement(Icon, {
          name: "sentiment_very_dissatisfied",
          size: "large",
          __source: {
            fileName: _jsxFileName$4,
            lineNumber: 70
          },
          __self: this
        }),
        type: type
      }, rest);
  }
});

var css$2 = ".error-module_error__10hvX {\n  position: relative;\n  width: 100%;\n  min-height: 450px; }\n  .error-module_error__10hvX .error-module_content__5u2Ts {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    display: inline-flex;\n    flex-direction: column; }\n    .error-module_error__10hvX .error-module_content__5u2Ts .error-module_icon__1mcxp {\n      padding: 0;\n      margin: 0;\n      text-align: center;\n      transform-origin: center;\n      transition: transform 450ms ease-out; }\n    .error-module_error__10hvX .error-module_content__5u2Ts .error-module_message__39kwH {\n      font-size: 1.3em;\n      text-align: center; }\n";
var styles$2 = {"error":"error-module_error__10hvX","content":"error-module_content__5u2Ts","icon":"error-module_icon__1mcxp","message":"error-module_message__39kwH"};
styleInject(css$2);

var _jsxFileName$5 = "/home/geoff/Dev/web/wp-graphql-composer/src/utils/error.jsx";
/**
 * Error view component
 * 
 * @param {Object} props
 * 
 * @returns {React.Component}
 */

var error = function error(_ref) {
  var icon = _ref.icon,
      message = _ref.message,
      type = _ref.type,
      rest = _objectWithoutProperties(_ref, ["icon", "message", "type"]);

  var className = classnames(styles$2.error, "".concat(type, "-error"), styles$2.on);
  return React.createElement("div", Object.assign({
    className: className
  }, rest, {
    __source: {
      fileName: _jsxFileName$5,
      lineNumber: 36
    },
    __self: this
  }), React.createElement("div", {
    className: styles$2.content,
    __source: {
      fileName: _jsxFileName$5,
      lineNumber: 37
    },
    __self: this
  }, React.createElement("div", {
    className: styles$2.icon,
    "data-testid": "error-icon",
    __source: {
      fileName: _jsxFileName$5,
      lineNumber: 38
    },
    __self: this
  }, icon), React.createElement("div", {
    className: styles$2.message,
    "data-testid": "error-message",
    __source: {
      fileName: _jsxFileName$5,
      lineNumber: 39
    },
    __self: this
  }, Array.isArray(message) ? React.createElement("ul", {
    __source: {
      fileName: _jsxFileName$5,
      lineNumber: 41
    },
    __self: this
  }, _.map(message, function (item, i) {
    return React.createElement("li", {
      key: "item-".concat(i + 2),
      __source: {
        fileName: _jsxFileName$5,
        lineNumber: 41
      },
      __self: this
    }, item);
  })) : message)));
};

error.propTypes = {
  icon: propTypes.oneOfType([propTypes.shape({}), propTypes.string]),
  message: propTypes.oneOfType([propTypes.string, propTypes.arrayOf(propTypes.string)])
};
error.defaultProps = {
  icon: undefined,
  message: 'Hold it, there has been a problem!'
};
/**
 * Creates composer for error component
 */

error.compose = utilComposer({
  defaultView: error,
  defaultMapper: errorMapper
});
var Error$1 = error.compose();

/**
 * Utils Exporter
 */

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\nmutation LoginMutation( $clientId: String!, $username: String!, $password: String! ) {\n  login( input: { clientMutationId: $clientId, username: $username, password: $password } ) {\n    authToken\n  }\n}\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\nquery GetViewer {\n  viewer {\n    id\n    userId\n    nicename\n    firstName\n  }\n}\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var VIEWER_QUERY = gql(_templateObject());
var LOGIN_MUTATION = gql(_templateObject2());

var _jsxFileName$6 = "/home/geoff/Dev/web/wp-graphql-composer/src/user/login-form-handler.js";
var loginFormHandler = (function () {
  return function (BaseComponent) {
    var BaseFactory = createFactory(BaseComponent);

    var LoginFormHandler =
    /*#__PURE__*/
    function (_React$Component) {
      _inherits(LoginFormHandler, _React$Component);

      function LoginFormHandler(props) {
        var _this;

        _classCallCheck(this, LoginFormHandler);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(LoginFormHandler).call(this, props));
        _this.reset = _this.reset.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.valid = _this.valid.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.printErrors = _this.printErrors.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.processResults = _this.processResults.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.onChange = _this.onChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.onSubmit = _this.onSubmit.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.state = {};
        return _this;
      }

      _createClass(LoginFormHandler, [{
        key: "componentWillMount",
        value: function componentWillMount() {
          this.reset();
        }
      }, {
        key: "valid",
        value: function valid() {
          var _this$state$form = this.state.form,
              username = _this$state$form.username,
              password = _this$state$form.password;
          var errors = {};
          if (username.length < 1) errors.user = true;
          if (password.length < 1) errors.pass = true;

          if (!isEmpty(errors)) {
            this.setState({
              form: this.printErrors(errors)
            });
            return false;
          }
          this.setState({
            form: {
              username: username,
              password: password
            }
          });
          return true;
        }
      }, {
        key: "printErrors",
        value: function printErrors(_ref) {
          var user = _ref.user,
              pass = _ref.pass;
          var formError = undefined;
          var userFieldError = user ? 'You must enter a username' : undefined;
          var passFieldError = pass ? 'You must enter a password' : undefined;
          return Object.assign(this.state.form, {
            formError: formError,
            userFieldError: userFieldError,
            passFieldError: passFieldError
          });
        }
      }, {
        key: "processResults",
        value: function processResults(payload) {
          var login = payload.data.login;

          if (login && login.authToken) {
            this.props.login(login.authToken);
          }
        }
      }, {
        key: "onChange",
        value: function onChange(_ref2) {
          var _ref2$target = _ref2.target,
              name = _ref2$target.name,
              value = _ref2$target.value;
          var form = Object.assign(this.state.form, _defineProperty({}, name, value));
          this.setState(form);
        }
      }, {
        key: "onSubmit",
        value: function onSubmit(event) {
          var _this2 = this;

          event.preventDefault();
          var mutate = this.props.mutate;
          var _this$state$form2 = this.state.form,
              password = _this$state$form2.password,
              username = _this$state$form2.username; // Validate

          if (!this.valid()) return; // Mutate

          mutate({
            variables: {
              clientId: v3("".concat(password).concat(username), v3.URL),
              username: username,
              password: password
            },
            refetchQueries: [{
              query: VIEWER_QUERY
            }]
          }).then(function (payload) {
            _this2.processResults(payload);
          }).catch(function (err) {
            var form = Object.assign({
              formError: 'Invalid Login'
            }, _this2.state.form);

            _this2.setState({
              form: form
            });
          });
        }
      }, {
        key: "reset",
        value: function reset(event) {
          this.setState({
            form: {
              username: '',
              password: ''
            }
          });
        }
      }, {
        key: "render",
        value: function render() {
          var onChange = this.onChange,
              onSubmit = this.onSubmit;
          var form = this.state.form;

          var newProps = _objectSpread({}, omit(this.props, ['login', 'logout', 'mutate', 'loggedIn', 'data']), form, {
            onChange: onChange,
            onSubmit: onSubmit
          });

          return React.createElement(BaseFactory, Object.assign({}, newProps, {
            __source: {
              fileName: _jsxFileName$6,
              lineNumber: 106
            },
            __self: this
          }));
        }
      }]);

      return LoginFormHandler;
    }(React.Component);

    {
      return setDisplayName(wrapDisplayName(BaseComponent, 'loginFormHandler'))(LoginFormHandler);
    }

    return LoginFormHandler;
  };
});

var userStatusHandler = (function () {
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

    {
      return setDisplayName(wrapDisplayName(BaseComponent, 'userStatusHandler'))(UserStatusHandler);
    }

    return UserStatusHandler;
  };
});

var css$3 = "/**\n * USER CONTROLS\n */\n";
styleInject(css$3);

var _jsxFileName$7 = "/home/geoff/Dev/web/wp-graphql-composer/src/user/user-controls.jsx";
/**
 * UserControls view component
 * 
 * @param {object} props
 * 
 * @returns {React.Component} 
 */

var userControls$1 = function userControls(_ref) {
  var className = _ref.className,
      userId = _ref.userId,
      nicename = _ref.nicename,
      firstName = _ref.firstName,
      logout = _ref.logout,
      rest = _objectWithoutProperties(_ref, ["className", "userId", "nicename", "firstName", "logout"]);

  return React.createElement("div", Object.assign({
    className: "user-controls".concat(className ? ' ' + className : '')
  }, rest, {
    __source: {
      fileName: _jsxFileName$7,
      lineNumber: 29
    },
    __self: this
  }), React.createElement("div", {
    className: "greeting",
    __source: {
      fileName: _jsxFileName$7,
      lineNumber: 30
    },
    __self: this
  }, React.createElement("h3", {
    __source: {
      fileName: _jsxFileName$7,
      lineNumber: 31
    },
    __self: this
  }, "Welcome back, ", ' ', " ", React.createElement("strong", {
    __source: {
      fileName: _jsxFileName$7,
      lineNumber: 31
    },
    __self: this
  }, nicename ? nicename : firstName), "!")), React.createElement("div", {
    className: "logout",
    __source: {
      fileName: _jsxFileName$7,
      lineNumber: 33
    },
    __self: this
  }, React.createElement("button", {
    onClick: logout,
    __source: {
      fileName: _jsxFileName$7,
      lineNumber: 34
    },
    __self: this
  }, "Logout")));
};

userControls$1.propTypes = {
  userId: propTypes.number,
  nicename: propTypes.string,
  firstName: propTypes.string,
  logout: propTypes.func
};
userControls$1.defaultProps = {
  userId: undefined,
  nicename: undefined,
  firstName: undefined,
  logout: undefined
};
/**
 * Creates composer for userControls component
 */

userControls$1.compose = queryComposer({
  view: userControls$1,
  queries: [{
    query: VIEWER_QUERY
  }],
  whileLoading: {
    view: Loading
  },
  forError: {
    view: Error$1
  },
  sharedMapper: function sharedMapper(_ref2) {
    var loggedIn = _ref2.loggedIn,
        login = _ref2.login,
        data = _ref2.data,
        rest = _objectWithoutProperties(_ref2, ["loggedIn", "login", "data"]);

    var userId = get(data, 'viewer.userId');
    var nicename = get(data, 'viewer.nicename');
    var firstName = get(data, 'viewer.firstName');
    return _objectSpread({
      userId: userId,
      nicename: nicename,
      firstName: firstName
    }, rest);
  }
});
/**
 * Compose default UserControls Component
 * @var {React.Component} UserControls
 */

var UserControls = userControls$1.compose();

var css$4 = "/* Extra Small */\nform.login_login-form__24VLl {\n  max-width: 400px;\n  display: flex;\n  flex-direction: column;\n  margin: 0 auto; }\n  form.login_login-form__24VLl .login_login-form-info__xAcOd {\n    margin: 0.45em auto;\n    color: tomato;\n    font-size: 1.2em; }\n  form.login_login-form__24VLl .login_username-field__1u1ZE,\n  form.login_login-form__24VLl .login_password-field__169eQ {\n    margin: 0.3em; }\n    form.login_login-form__24VLl .login_username-field__1u1ZE.login_error__1lHPB input,\n    form.login_login-form__24VLl .login_password-field__169eQ.login_error__1lHPB input {\n      border-color: Tomato; }\n    form.login_login-form__24VLl .login_username-field__1u1ZE input,\n    form.login_login-form__24VLl .login_password-field__169eQ input {\n      width: 100%;\n      border-width: 0.07em;\n      border-radius: 0.2em; }\n    form.login_login-form__24VLl .login_username-field__1u1ZE .login_field-info__1n262,\n    form.login_login-form__24VLl .login_password-field__169eQ .login_field-info__1n262 {\n      display: block;\n      color: gray; }\n  form.login_login-form__24VLl .login_login-submit__2lywP {\n    margin: 0.3em;\n    border-width: 0.07em;\n    border-radius: 0.2em;\n    box-shadow: none;\n    font-size: 0.9em;\n    color: #fff;\n    background-color: #005F4C; }\n\n/* Small */\n/* Medium */\n/* Large */\n/* Extra Large */\n";
styleInject(css$4);

var _jsxFileName$8 = "/home/geoff/Dev/web/wp-graphql-composer/src/user/login.jsx";
/**
 * Login view component
 * 
 * @param {object} props
 * 
 * @returns { React.Component } 
 */

var login$1 = function login(_ref) {
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
  }, rest, {
    __source: {
      fileName: _jsxFileName$8,
      lineNumber: 38
    },
    __self: this
  }), formError && React.createElement("legend", {
    className: "login-form-info",
    __source: {
      fileName: _jsxFileName$8,
      lineNumber: 39
    },
    __self: this
  }, formError), React.createElement("div", {
    className: "username-field".concat(userFieldError ? ' error' : ''),
    __source: {
      fileName: _jsxFileName$8,
      lineNumber: 41
    },
    __self: this
  }, React.createElement("input", {
    type: "text",
    name: "username",
    value: username,
    onChange: onChange,
    placeholder: "Enter Username",
    __source: {
      fileName: _jsxFileName$8,
      lineNumber: 42
    },
    __self: this
  }), userFieldError && React.createElement("small", {
    className: "field-info",
    __source: {
      fileName: _jsxFileName$8,
      lineNumber: 49
    },
    __self: this
  }, userFieldError)), React.createElement("div", {
    className: "password-field".concat(passFieldError ? ' error' : ''),
    __source: {
      fileName: _jsxFileName$8,
      lineNumber: 52
    },
    __self: this
  }, React.createElement("input", {
    type: "password",
    name: "password",
    value: password,
    onChange: onChange,
    placeholder: "Enter Password",
    __source: {
      fileName: _jsxFileName$8,
      lineNumber: 53
    },
    __self: this
  }), passFieldError && React.createElement("small", {
    className: "field-info",
    __source: {
      fileName: _jsxFileName$8,
      lineNumber: 60
    },
    __self: this
  }, passFieldError)), React.createElement("button", {
    className: "login-submit",
    type: "submit",
    __source: {
      fileName: _jsxFileName$8,
      lineNumber: 62
    },
    __self: this
  }, "Sign In"));
};

login$1.propTypes = {
  username: propTypes.string,
  password: propTypes.string,
  userFieldError: propTypes.string,
  passFieldError: propTypes.string,
  onChange: propTypes.func,
  onSubmit: propTypes.func
};
login$1.defaultProps = {
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
/**
 * Creates composer for login component
 */

login$1.compose = function () {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref2$view = _ref2.view,
      view = _ref2$view === void 0 ? login$1 : _ref2$view,
      _ref2$userControlsVie = _ref2.userControlsView,
      userControlsView = _ref2$userControlsVie === void 0 ? UserControls : _ref2$userControlsVie,
      _ref2$forError = _ref2.forError,
      error$$1 = _ref2$forError === void 0 ? {
    view: Error$1
  } : _ref2$forError,
      _ref2$loginCond = _ref2.loginCond,
      loginCond = _ref2$loginCond === void 0 ? function (props) {
    return get(props, 'loggedIn');
  } : _ref2$loginCond;

  return compose(forError(error$$1), withApollo, userStatusHandler(), branch(function (props) {
    return loginCond(props);
  }, renderComponent(userControlsView)), graphql(LOGIN_MUTATION), loginFormHandler())(view);
};
/**
 * Compose default Login Component
 * @var {React.Component} Login
 */


var Login = login$1.compose();

/**
 * User Exporter
 */

function _templateObject10() {
  var data = _taggedTemplateLiteral(["\n  mutation UpdateCommentMutation(\n    $type: String,\n    $id: ID!,\n    $content: String!,\n    $date: String!,\n    $clientId: String!,\n  ) {\n    updateComment(input: {\n      type: $type,\n      id: $id,\n      content: $content,\n      date: $date,\n      clientMutationId: $clientId\n    }) {\n      clientMutationId\n      comment {\n        id,\n        commentId,\n        type,\n        content,\n        date\n        author {\n          ... on CommentAuthor {\n            id\n            name\n          },\n          ... on User {\n            id\n            nicename\n          }\n        }\n      }\n    }\n  }\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n  mutation NewCommentMutation(\n    $author: String,\n    $authorEmail: String,\n    $authorUrl: String,\n    $type: String,\n    $userId: Int,\n    $parent: String,\n    $postId: Int,\n    $content: String!,\n    $date: String!,\n    $clientId: String!,\n  ) {\n    createComment(input: {\n      author: $author,\n      authorEmail: $authorEmail,\n      authorUrl: $authorUrl,\n      type: $type,\n      userId: $userId,\n      parent: $parent,\n      postId: $postId,\n      content: $content,\n      date: $date,\n      clientMutationId: $clientId\n    }) {\n      clientMutationId\n      comment {\n        id,\n        commentId,\n        type,\n        content,\n        date\n        author {\n          ... on CommentAuthor {\n            id\n            name\n          },\n          ... on User {\n            id\n            nicename\n          }\n        }\n      }\n    }\n  }\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  mutation DeleteCommentMutation($clientId: String!, $id: ID!) {\n    deleteComment(input: { id: $id, clientMutationId: $clientId }) {\n      clientMutationId\n      comment {\n        id\n      }\n    }\n  }\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  query PostQuery($postId: ID, $slug: String, $uri: String) {\n    postBy(postId: $postId, slug: $slug, uri: $uri) {\n      id\n      postId\n      slug\n      uri\n      content\n      date\n      modified\n      title\n      permalink\n      author {\n        id\n        userId\n        nicename\n        avatar {\n          url\n          foundAvatar\n        }\n      }\n      categories {\n        nodes {\n          id\n          name\n        }\n      }\n      tags {\n        nodes {\n          id\n          name\n        }\n      }\n      featuredImage {\n        id\n      }\n    }\n  }\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  query PostQuery($id: ID!) {\n    post(id: $id) {\n      id\n      postId\n      slug\n      uri\n      content\n      date\n      modified\n      title\n      permalink\n      author {\n        id\n        userId\n        nicename\n        avatar {\n          url\n          foundAvatar\n        }\n      }\n      categories {\n        nodes {\n          id\n          name\n        }\n      }\n      tags {\n        nodes {\n          id\n          name\n        }\n      }\n      featuredImage {\n        id\n        mediaItemId\n        title\n        altText\n        sourceUrl\n      }\n    }\n  }\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  query PostCommentsQuery($id: ID!) {\n    post(id: $id) {\n      id\n      postId\n      title\n      commentStatus\n      comments{\n        nodes {\n          id\n          commentId\n          type\n          content\n          date\n          author{\n            ... on User {\n              id\n              userId\n              nicename\n              avatar {\n                url\n              }\n            }\n            ... on CommentAuthor {\n              id\n              name\n            }\n          }\n        }\n      }\n    }\n  }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  query PageByQuery($uri: String, $pageId: ID) {\n    pageBy(uri: $uri, pageId: $pageId) {\n      id\n      uri\n      pageId\n      title\n      content\n      date\n      modified\n    }\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  query PageQuery($id: ID!) {\n    page(id: $id){\n      id\n      uri\n      pageId\n      title\n      content\n      date\n      modified\n    }\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$1() {
  var data = _taggedTemplateLiteral(["\n  query AttachmentQuery($id: String, $mediaItemId: ID, $slug: String, $uri: String) {\n    mediaItemBy(id: $id, mediaItemId: $mediaItemId, slug: $slug, uri: $uri){\n      id\n      altText\n      mediaType\n      sourceUrl\n      mediaDetails{\n        sizes {\n          width\n          height\n          sourceUrl\n        }\n      }\n    }\n  }\n"]);

  _templateObject2$1 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$1() {
  var data = _taggedTemplateLiteral(["\n  query CustomLogoQuery {\n    themeMods {\n      customLogo {\n        id\n        altText\n        mediaType\n        sourceUrl\n        mediaDetails{\n          sizes {\n            width\n            height\n            sourceUrl\n          }\n        }\n      }\n    }\n  }\n"]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * Queries
 */

var CUSTOM_LOGO_QUERY = gql(_templateObject$1());
var ATTACHMENT_QUERY = gql(_templateObject2$1());
var PAGE_QUERY = gql(_templateObject3());
var PAGE_BY_QUERY = gql(_templateObject4());
var POST_COMMENTS_QUERY = gql(_templateObject5());
var POST_QUERY = gql(_templateObject6());
var POST_BY_QUERY = gql(_templateObject7());
/**
 * Mutations
 */

var DELETE_COMMENT_MUTATION = gql(_templateObject8());
var NEW_COMMENT_MUTATION = gql(_templateObject9());
var UPDATE_COMMENT_MUTATION = gql(_templateObject10());

/**
 * Maps image source for srcSet attribute
 * 
 * @param {string} sourceUrl - url to image,
 * @param {string} width - string representation of image width, 
 */

var mapSources = function mapSources(_ref) {
  var sourceUrl = _ref.sourceUrl,
      width = _ref.width;
  return "".concat(sourceUrl, " ").concat(width, "w");
};
/**
 * Maps image source for sizes attribute
 * 
 * @param {string} rawWidth - string representation of image width
 */


var mapBreakpoints = function mapBreakpoints(_ref2) {
  var rawWidth = _ref2.width;
  var width = parseInt(rawWidth, 10);
  if (width > 1200) return "".concat(width, "px");else if (width <= 1200 && width > 992) return "(max-width: 1200px) ".concat(width, "px");else if (width <= 992 && width > 768) return "(max-width: 992px) ".concat(width, "px");else if (width <= 768 && width > 576) return "(max-width: 768px) ".concat(width, "px");else return "(max-width: 576px) ".concat(width, "px");
};
/**
 * Maps alternate images to breakpoints and returns an array of media query strings
 * 
 * @param {array} sizes - data about image sources
 * @returns {array}
 */


var reduceBreakpoints = function reduceBreakpoints(sizes) {
  var breakpoints = map(filter(sizes, function (_ref3) {
    var width = _ref3.width;
    return parseInt(width, 10) >= 576;
  }), mapBreakpoints);
  var reduced = [];
  var sort = /^(?:\(max-width: \d+px\) )?(\d+)px$/;
  var sm = sortBy(filter(breakpoints, function (mediaQuery) {
    return /^\(max-width: 576px\)/.test(mediaQuery);
  }), function (mediaQuery) {
    return parseInt(mediaQuery.match(sort), 10);
  });
  var md = sortBy(filter(breakpoints, function (mediaQuery) {
    return /^\(max-width: 768px\)/.test(mediaQuery);
  }), function (mediaQuery) {
    return parseInt(mediaQuery.match(sort), 10);
  });
  var lg = sortBy(filter(breakpoints, function (mediaQuery) {
    return /^\(max-width: 992px\)/.test(mediaQuery);
  }), function (mediaQuery) {
    return parseInt(mediaQuery.match(sort), 10);
  });
  var xl = sortBy(filter(breakpoints, function (mediaQuery) {
    return /^\(max-width: 1200px\)/.test(mediaQuery);
  }), function (mediaQuery) {
    return parseInt(mediaQuery.match(sort), 10);
  });
  var max = sortBy(filter(breakpoints, function (mediaQuery) {
    return !/^\(max-width:/.test(mediaQuery);
  }), function (mediaQuery) {
    return parseInt(mediaQuery.match(sort), 10);
  });
  if (!isEmpty(sm)) reduced.push(sm[0]);
  if (!isEmpty(md)) reduced.push(md[0]);
  if (!isEmpty(lg)) reduced.push(lg[0]);
  if (!isEmpty(xl)) reduced.push(xl[0]);
  if (!isEmpty(max)) reduced.push(max[0]);
  return reduced;
};

var variables = ['id', 'mediaItemId', 'slug', 'uri', 'customLogo'];
var attachmentMapper = function attachmentMapper(_ref4) {
  var data = _ref4.data,
      src = _ref4.src,
      alt = _ref4.alt,
      rest = _objectWithoutProperties(_ref4, ["data", "src", "alt"]);

  var imgSrc = get(data, 'mediaItemBy.sourceUrl') || src;
  var altText = alt || get(data, 'mediaItemBy.altText');
  var sizes = get(data, 'mediaItemBy.mediaDetails.sizes');

  if (sizes && sizes.length > 0) {
    var sources = map(sizes, mapSources);
    var srcSizes = reduceBreakpoints(sizes);
    return _objectSpread({
      src: imgSrc,
      alt: altText,
      srcSet: sources.join(', '),
      sizes: srcSizes.join(', ')
    }, omit(rest, ['fallback'].concat(variables)));
  }

  return _objectSpread({
    src: imgSrc,
    alt: altText
  }, omit(rest, ['fallback'].concat(variables)));
};
var customLogoMapper = function customLogoMapper(_ref5) {
  var data = _ref5.data,
      src = _ref5.src,
      alt = _ref5.alt,
      rest = _objectWithoutProperties(_ref5, ["data", "src", "alt"]);

  var imgSrc = get(data, 'themeMods.customLogo.sourceUrl') || src;
  var altText = alt || get(data, 'themeMods.customLogo.altText');
  var sizes = get(data, 'themeMods.customLogo.mediaDetails.sizes');

  if (sizes && sizes.length > 0) {
    var sources = map(sizes, mapSources);
    var srcSizes = reduceBreakpoints(sizes);
    return _objectSpread({
      src: imgSrc,
      alt: altText,
      srcSet: sources.join(', '),
      sizes: srcSizes.join(', ')
    }, omit(rest, ['fallback'].concat(variables)));
  }

  return _objectSpread({
    src: imgSrc,
    alt: altText
  }, omit(rest, ['fallback'].concat(variables)));
};

var css$5 = "/* Extra Small */\n/* Small */\n/* Medium */\n/* Large */\n/* Extra Large */\n";
var styles$3 = {};
styleInject(css$5);

var _jsxFileName$9 = "/home/geoff/Dev/web/wp-graphql-composer/src/post-type/attachment.jsx";
/**
 * Attachment view component
 * 
 * @param {object} props
 * 
 * @returns {React.Component} 
 */

var attachment = function attachment(_ref) {
  var src = _ref.src,
      added = _ref.className,
      alt = _ref.alt,
      rest = _objectWithoutProperties(_ref, ["src", "className", "alt"]);

  var className = classnames(styles$3.attachment, added);
  return src ? React.createElement("img", Object.assign({
    src: src,
    className: className,
    alt: alt
  }, rest, {
    __source: {
      fileName: _jsxFileName$9,
      lineNumber: 36
    },
    __self: this
  })) : null;
};

attachment.propTypes = {
  src: propTypes.string,
  alt: propTypes.string
};
attachment.defaultProps = {
  src: undefined,
  alt: 'image'
};
/**
 * Creates composer for attachment component
 */

attachment.compose = queryComposer({
  view: attachment,
  whileLoading: {
    view: Loading
  },
  forError: {
    view: Error$1,
    type: '404-image'
  },
  queries: [{
    query: CUSTOM_LOGO_QUERY,
    cond: function cond(_ref2) {
      var customLogo = _ref2.customLogo;
      return !!customLogo;
    },
    mapper: customLogoMapper
  }, {
    query: ATTACHMENT_QUERY,
    cond: function cond(_ref3) {
      var customLogo = _ref3.customLogo;
      return !customLogo;
    },
    mapper: attachmentMapper,
    config: {
      options: function options(_ref4) {
        var id = _ref4.id,
            mediaItemId = _ref4.mediaItemId,
            slug = _ref4.slug,
            uri = _ref4.uri;
        return {
          id: id,
          mediaItemId: mediaItemId,
          slug: slug,
          uri: uri
        };
      },
      skip: function skip(_ref5) {
        var id = _ref5.id,
            mediaItemId = _ref5.mediaItemId,
            slug = _ref5.slug,
            uri = _ref5.uri;
        return !id && !mediaItemId && !slug && !uri;
      }
    }
  }]
});
/**
 * Compose default Attachment Component
 * @var {React.Component} Attachment
 */

var Attachment = attachment.compose();

var pageStateManager = function pageStateManager(BaseComponent) {
  var BaseFactory = React.createFactory(BaseComponent);

  var PageStateManager =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(PageStateManager, _React$Component);

    function PageStateManager() {
      _classCallCheck(this, PageStateManager);

      return _possibleConstructorReturn(this, _getPrototypeOf(PageStateManager).apply(this, arguments));
    }

    _createClass(PageStateManager, [{
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        var _this$props = this.props,
            id = _this$props.id,
            pageId = _this$props.pageId,
            uri = _this$props.uri;

        if (prevProps.id !== id || prevProps.pageId !== pageId || prevProps.uri !== uri) {
          this.props.data.refetch();
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props2 = this.props,
            _this$props2$data = _this$props2.data,
            page = _this$props2$data.page,
            pageBy = _this$props2$data.pageBy,
            rest = _objectWithoutProperties(_this$props2, ["data"]);

        var newProps = _objectSpread({}, page, pageBy, rest);

        return BaseFactory(newProps);
      }
    }]);

    return PageStateManager;
  }(React.Component);

  {
    return setDisplayName(wrapDisplayName(BaseComponent, 'pageStateManager'))(PageStateManager);
  }

  return PageStateManager;
};
var postStateManager = function postStateManager(BaseComponent) {
  var BaseFactory = React.createFactory(BaseComponent);

  var PostStateManager =
  /*#__PURE__*/
  function (_React$Component2) {
    _inherits(PostStateManager, _React$Component2);

    function PostStateManager() {
      _classCallCheck(this, PostStateManager);

      return _possibleConstructorReturn(this, _getPrototypeOf(PostStateManager).apply(this, arguments));
    }

    _createClass(PostStateManager, [{
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        var _this$props3 = this.props,
            id = _this$props3.id,
            pageId = _this$props3.pageId,
            uri = _this$props3.uri,
            slug = _this$props3.slug;

        if (prevProps.id !== id || prevProps.pageId !== pageId || prevProps.uri !== uri || prevProps.slug !== slug) {
          this.props.data.refetch();
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props4 = this.props,
            data = _this$props4.data,
            rest = _objectWithoutProperties(_this$props4, ["data"]);

        var post = get(data, 'post') || get(data, 'postBy');
        var featured = get(post, 'featuredImage.id');
        var details = {
          author: get(post, 'author'),
          categories: get(post, 'categories.nodes'),
          date: get(post, 'date'),
          modified: get(post, 'modified'),
          tags: get(post, 'tags.nodes')
        };

        var newProps = _objectSpread({
          details: details,
          featured: featured
        }, omit(post, ['author', 'categories', 'featuredImage', 'tags', 'date', 'modified']), rest);

        return BaseFactory(newProps);
      }
    }]);

    return PostStateManager;
  }(React.Component);

  {
    return setDisplayName(wrapDisplayName(BaseComponent, 'postStateManager'))(PostStateManager);
  }

  return PostStateManager;
};

var css$6 = ".post-module_page__zbhFw .post-module_entry-footer__3Quv9,\n.post-module_post__4EGJK .post-module_entry-footer__3Quv9 {\n  max-width: initial;\n  padding: 0.5em 1.5em 1.5em;\n  margin: 0 auto;\n  border-bottom: none; }\n  .post-module_page__zbhFw .post-module_entry-footer__3Quv9 a,\n  .post-module_post__4EGJK .post-module_entry-footer__3Quv9 a {\n    text-decoration: none;\n    transition: color 350ms ease-in; }\n    .post-module_page__zbhFw .post-module_entry-footer__3Quv9 a:hover,\n    .post-module_post__4EGJK .post-module_entry-footer__3Quv9 a:hover {\n      transition: color 550ms ease-out; }\n  .post-module_page__zbhFw .post-module_entry-footer__3Quv9 .post-module_posted-on__2tAv_ .post-module_date__Mfqxh,\n  .post-module_page__zbhFw .post-module_entry-footer__3Quv9 .post-module_posted-on__2tAv_ .post-module_modified__3_h3B,\n  .post-module_post__4EGJK .post-module_entry-footer__3Quv9 .post-module_posted-on__2tAv_ .post-module_date__Mfqxh,\n  .post-module_post__4EGJK .post-module_entry-footer__3Quv9 .post-module_posted-on__2tAv_ .post-module_modified__3_h3B {\n    position: relative;\n    display: inline-block; }\n  .post-module_page__zbhFw .post-module_entry-footer__3Quv9 .post-module_byline__Ss6NP a,\n  .post-module_page__zbhFw .post-module_entry-footer__3Quv9 .post-module_tags-links__2imo3 a,\n  .post-module_page__zbhFw .post-module_entry-footer__3Quv9 .post-module_cat-links__1RxVf a,\n  .post-module_post__4EGJK .post-module_entry-footer__3Quv9 .post-module_byline__Ss6NP a,\n  .post-module_post__4EGJK .post-module_entry-footer__3Quv9 .post-module_tags-links__2imo3 a,\n  .post-module_post__4EGJK .post-module_entry-footer__3Quv9 .post-module_cat-links__1RxVf a {\n    position: relative;\n    display: inline-block; }\n  .post-module_page__zbhFw .post-module_entry-footer__3Quv9 .post-module_byline__Ss6NP a::before,\n  .post-module_post__4EGJK .post-module_entry-footer__3Quv9 .post-module_byline__Ss6NP a::before {\n    content: \"\"; }\n  .post-module_page__zbhFw .post-module_entry-footer__3Quv9 .post-module_tags-links__2imo3 a::before,\n  .post-module_post__4EGJK .post-module_entry-footer__3Quv9 .post-module_tags-links__2imo3 a::before {\n    content: \"\"; }\n  .post-module_page__zbhFw .post-module_entry-footer__3Quv9 .post-module_cat-links__1RxVf a::before,\n  .post-module_post__4EGJK .post-module_entry-footer__3Quv9 .post-module_cat-links__1RxVf a::before {\n    content: \"\"; }\n  .post-module_page__zbhFw .post-module_entry-footer__3Quv9 .post-module_tags-links__2imo3 a::after,\n  .post-module_post__4EGJK .post-module_entry-footer__3Quv9 .post-module_tags-links__2imo3 a::after {\n    content: \", \"; }\n  .post-module_page__zbhFw .post-module_entry-footer__3Quv9 .post-module_tags-links__2imo3 a:last-of-type::after,\n  .post-module_post__4EGJK .post-module_entry-footer__3Quv9 .post-module_tags-links__2imo3 a:last-of-type::after {\n    content: none; }\n";
var styles$4 = {"page":"post-module_page__zbhFw","entry-footer":"post-module_entry-footer__3Quv9","post":"post-module_post__4EGJK","posted-on":"post-module_posted-on__2tAv_","date":"post-module_date__Mfqxh","modified":"post-module_modified__3_h3B","byline":"post-module_byline__Ss6NP","tags-links":"post-module_tags-links__2imo3","cat-links":"post-module_cat-links__1RxVf"};
styleInject(css$6);

var css$7 = ".post-global_alignleft__1Pees,\n.post-global_alignright__3LMtZ {\n  max-width: 636px !important;\n  /* Let's work to make this !important unnecessary */ }\n  .post-global_alignleft__1Pees img,\n  .post-global_alignleft__1Pees figcaption,\n  .post-global_alignright__3LMtZ img,\n  .post-global_alignright__3LMtZ figcaption {\n    max-width: 50%;\n    width: 50%; }\n\n.post-global_alignleft__1Pees figcaption {\n  clear: left; }\n\n.post-global_alignleft__1Pees img,\n.post-global_alignleft__1Pees figcaption {\n  float: left;\n  margin-right: 1.5em; }\n\n.post-global_alignright__3LMtZ figcaption {\n  clear: right; }\n\n.post-global_alignright__3LMtZ img,\n.post-global_alignright__3LMtZ figcaption {\n  float: right;\n  margin-left: 1.5em; }\n\n.post-global_aligncenter__OQ-RF {\n  clear: both;\n  display: block;\n  margin-left: auto;\n  margin-right: auto; }\n\n.post-global_entry-content__1X9N- > * {\n  margin: 36px auto;\n  padding-left: 14px;\n  padding-right: 14px; }\n\n.post-global_entry-content__1X9N- > .post-global_alignwide__1Rc_X {\n  max-width: 1100px; }\n\n.post-global_entry-content__1X9N- > .post-global_alignfull__1D9GG {\n  margin: 1.5em 0;\n  max-width: 100%; }\n\n.post-global_entry-content__1X9N- ul,\n.post-global_entry-content__1X9N- ol {\n  margin: 1.5em auto;\n  list-style-position: outside; }\n\n.post-global_wp-block-image__2J_9v img {\n  display: block; }\n\n.post-global_wp-block-image__2J_9v.post-global_alignleft__1Pees,\n.post-global_wp-block-image__2J_9v.post-global_alignright__3LMtZ {\n  width: 100%; }\n\n.post-global_wp-block-image__2J_9v.post-global_alignfull__1D9GG img {\n  width: 100vw; }\n\n.post-global_wp-block-gallery__3SQQN:not(.post-global_components-placeholder__29EOq) {\n  margin: 1.5em auto; }\n\n.post-global_wp-block-cover-text__1uHHj p {\n  padding: 1.5em 14px; }\n\nul.post-global_wp-block-latest-posts__3mHhL.post-global_alignwide__1Rc_X,\nul.post-global_wp-block-latest-posts__3mHhL.post-global_alignfull__1D9GG,\nul.post-global_wp-block-latest-posts__3mHhL.post-global_is-grid__DJFNK.post-global_alignwide__1Rc_X,\nul.post-global_wp-block-latest-posts__3mHhL.post-global_is-grid__DJFNK.post-global_alignwide__1Rc_X {\n  padding: 0 14px; }\n\n.post-global_wp-block-table__3wXN2 {\n  display: block;\n  overflow-x: auto; }\n\n.post-global_wp-block-table__3wXN2 table {\n  border-collapse: collapse;\n  width: 100%; }\n\n.post-global_wp-block-table__3wXN2 td, .post-global_wp-block-table__3wXN2 th {\n  padding: .5em; }\n\n.post-global_entry-content__1X9N- li {\n  margin-left: 2.5em;\n  margin-bottom: 6px; }\n\n.post-global_entry-content__1X9N- ul ul,\n.post-global_entry-content__1X9N- ol ol,\n.post-global_entry-content__1X9N- ul ol,\n.post-global_entry-content__1X9N- ol ul {\n  margin: 0 auto; }\n\n.post-global_entry-content__1X9N- ul ul li,\n.post-global_entry-content__1X9N- ol ol li,\n.post-global_entry-content__1X9N- ul ol li,\n.post-global_entry-content__1X9N- ol ul li {\n  margin-left: 0; }\n\n.post-global_wp-block-embed__2FVNd.post-global_type-video__35x11 > .post-global_wp-block-embed__wrapper__2c2-q {\n  position: relative;\n  width: 100%;\n  height: 0;\n  padding-top: 56.25%; }\n\n.post-global_wp-block-embed__2FVNd.post-global_type-video__35x11 > .post-global_wp-block-embed__wrapper__2c2-q > iframe {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0; }\n\n.post-global_wp-block-quote__1e2zJ.post-global_is-large__3ZcDU {\n  margin: 0 auto 16px; }\n\n.post-global_wp-block-pullquote__2lMYM > p:first-child {\n  margin-top: 0; }\n\n.post-global_wp-block-separator__2TBte {\n  margin: 3em auto;\n  padding: 0; }\n\n@media screen and (min-width: 768px) {\n  .post-global_wp-block-cover-text__1uHHj p {\n    padding: 1.5em 0; }\n  .post-global_entry-content__1X9N- > * {\n    padding-left: 0px;\n    padding-right: 0px; } }\n\n/*--------------------------------------------------------------\n# Block Color Palette Colors\n--------------------------------------------------------------*/\n.post-global_has-strong-blue-color__3mjyZ {\n  color: #0073aa; }\n\n.post-global_has-strong-blue-background-color__3QUac {\n  background-color: #0073aa; }\n\n.post-global_has-lighter-blue-color__Xkr_d {\n  color: #229fd8; }\n\n.post-global_has-lighter-blue-background-color__2AXXE {\n  background-color: #229fd8; }\n\n.post-global_has-very-light-gray-color__kSGpg {\n  color: #eee; }\n\n.post-global_has-very-light-gray-background-color__D_Grg {\n  background-color: #eee; }\n\n.post-global_has-very-dark-gray-color__2h1b- {\n  color: #444; }\n\n.post-global_has-very-dark-gray-background-color__2KIYH {\n  background-color: #444; }\n";
styleInject(css$7);

var _jsxFileName$a = "/home/geoff/Dev/web/wp-graphql-composer/src/post-type/page.jsx";
/**
 * Page view component
 * 
 * @param {object} props
 * 
 * @returns {React.Component} 
 */

var page = function page(_ref) {
  var Container = _ref.as,
      pageId = _ref.pageId,
      title = _ref.title,
      content = _ref.content,
      date = _ref.date,
      modified = _ref.modified,
      added = _ref.className,
      rest = _objectWithoutProperties(_ref, ["as", "pageId", "title", "content", "date", "modified", "className"]);

  var className = classnames(styles$4.page, added);
  return React.createElement(Container, Object.assign({
    id: "page-".concat(pageId),
    className: className
  }, rest, {
    __source: {
      fileName: _jsxFileName$a,
      lineNumber: 41
    },
    __self: this
  }), React.createElement("div", {
    className: "entry-content",
    __source: {
      fileName: _jsxFileName$a,
      lineNumber: 46
    },
    __self: this
  }, ReactHtmlParser(content)));
};

page.propTypes = {
  title: propTypes.string,
  content: propTypes.string,
  className: propTypes.string,
  as: propTypes.oneOfType([propTypes.string, propTypes.func])
};
page.defaultProps = {
  title: undefined,
  content: '',
  className: undefined,
  as: 'article'
};
/**
 * Creates composer for page component
 */

page.compose = queryComposer({
  view: page,
  queries: [{
    cond: function cond(_ref2) {
      var pageId = _ref2.pageId,
          uri = _ref2.uri;
      return !!pageId || !!uri;
    },
    query: PAGE_BY_QUERY,
    config: {
      options: function options(_ref3) {
        var pageId = _ref3.pageId,
            uri = _ref3.uri;
        return {
          pageId: pageId,
          uri: uri
        };
      }
    }
  }, {
    cond: function cond(_ref4) {
      var id = _ref4.id;
      return !!id;
    },
    query: PAGE_QUERY,
    config: {
      options: function options(_ref5) {
        var id = _ref5.id;
        return {
          id: id
        };
      }
    }
  }],
  whileLoading: {
    view: Loading
  },
  forError: {
    view: Error$1,
    type: '404-page'
  },
  extraHocs: [pageStateManager]
});
/**
 * Compose default Page Component
 * @var {React.Component} Page
 */

var Page = page.compose();

var _jsxFileName$b = "/home/geoff/Dev/web/wp-graphql-composer/src/post-type/post.jsx";
/**
 * Post view component
 * 
 * @param {object} props
 * 
 * @returns {React.Component}
 */

var post = function post(_ref) {
  var featured = _ref.featured,
      postId = _ref.postId,
      title = _ref.title,
      content = _ref.content,
      details = _ref.details,
      Attachment$$1 = _ref.Attachment,
      DetailsComponent = _ref.DetailsComponent,
      Container = _ref.as,
      added = _ref.className,
      rest = _objectWithoutProperties(_ref, ["featured", "postId", "title", "content", "details", "Attachment", "DetailsComponent", "as", "className"]);

  var className = classnames(styles$4.post, added);
  return React.createElement(Container, Object.assign({
    id: "post-".concat(postId),
    className: className
  }, rest, {
    __source: {
      fileName: _jsxFileName$b,
      lineNumber: 42
    },
    __self: this
  }), React.createElement(Attachment$$1, {
    id: featured,
    "data-attachment-id": featured,
    className: "wp-post-image",
    fallback: true,
    __source: {
      fileName: _jsxFileName$b,
      lineNumber: 47
    },
    __self: this
  }), ReactHtmlParser(content), DetailsComponent && React.createElement(DetailsComponent, Object.assign({
    className: styles$4.details
  }, details, {
    __source: {
      fileName: _jsxFileName$b,
      lineNumber: 54
    },
    __self: this
  })));
};

post.propTypes = {
  Attachment: propTypes.func.isRequired,
  featured: propTypes.number,
  postId: propTypes.number.isRequired,
  title: propTypes.string,
  content: propTypes.string,
  details: propTypes.shape({
    author: propTypes.shape({}),
    date: propTypes.string,
    modified: propTypes.string,
    tags: propTypes.arrayOf(propTypes.shape({})),
    categories: propTypes.arrayOf(propTypes.shape({}))
  }),
  as: propTypes.oneOfType([propTypes.string, propTypes.func])
};
post.defaultProps = {
  featured: undefined,
  title: undefined,
  content: undefined,
  details: undefined,
  as: 'article'
};
/**
 * Creates composer for page component
 */

post.compose = queryComposer({
  view: post,
  Attachment: Attachment,
  queries: [{
    cond: function cond(_ref2) {
      var postId = _ref2.postId,
          uri = _ref2.uri,
          slug = _ref2.slug;
      return !!postId || !!uri || !!slug;
    },
    query: POST_BY_QUERY,
    config: {
      options: function options(_ref3) {
        var postId = _ref3.postId,
            uri = _ref3.uri,
            slug = _ref3.slug;
        return {
          postId: postId,
          uri: uri,
          slug: slug
        };
      }
    }
  }, {
    cond: function cond(_ref4) {
      var id = _ref4.id;
      return !!id;
    },
    query: POST_QUERY,
    config: {
      options: function options(_ref5) {
        var id = _ref5.id;
        return {
          id: id
        };
      }
    }
  }],
  whileLoading: {
    view: Loading
  },
  forError: {
    view: Error$1,
    type: '404-post'
  },
  extraHocs: [postStateManager]
});
/**
 * Compose default Post Component
 * @var {React.Component} Post
 */

var Post = post.compose();

/**
 * Post-Type Exporter
 */

var monthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var thisYear = new Date().getFullYear();

var getTermName = function getTermName(term_slug, results) {
  var taxonomy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'tags';
  var allTerms = get(results, "[0].meta.".concat(taxonomy));
  var term = find(allTerms, function (_ref) {
    var slug = _ref.slug;
    return slug === term_slug;
  });
  return term.name;
};
/**
 * Return archive header based on query variables
 * @param {object} where  
 * @param {number} resultCount 
 */


var getHeader = function getHeader(_ref2, results) {
  var category = _ref2.category,
      tag = _ref2.tag,
      day = _ref2.day,
      month = _ref2.month,
      year = _ref2.year,
      author = _ref2.author,
      search = _ref2.search;

  switch (true) {
    case results.length === 0:
      return 'No posts found';

    case !!category:
      return "Posts categorized in ".concat(getTermName(category, results, 'categories'));

    case !!tag:
      return "Posts tagged in ".concat(getTermName(tag, results));

    case !!year && !!month && !!day:
      return "Posts made ".concat(monthNames[month], " ").concat(day, ", ").concat(year);

    case !!year && !!month:
      return "Posts made ".concat(monthNames[month], " ").concat(year);

    case !!year:
      return thisYear === year ? 'Posts made this year' : thisYear - 1 === year ? 'Posts made last year' : "Posts made in ".concat(year);

    case !!author:
      return "Posts made by ".concat(author);

    case !!search:
      return "Searching \"".concat(search, "\"");

    default:
      return 'Recent Posts';
  }
};

var archiveMapper = function archiveMapper(_ref3) {
  var data = _ref3.data,
      first = _ref3.first,
      rest = _objectWithoutProperties(_ref3, ["data", "first"]);

  var rawResults = get(data, 'posts.nodes');
  var resultsData = map(rawResults, function (_ref4) {
    var author = _ref4.author,
        categories = _ref4.categories,
        tags = _ref4.tags,
        date = _ref4.date,
        modified = _ref4.modified,
        __typename = _ref4.__typename,
        rest = _objectWithoutProperties(_ref4, ["author", "categories", "tags", "date", "modified", "__typename"]);

    return _objectSpread({}, rest, {
      meta: {
        author: author,
        categories: get(categories, 'nodes'),
        tags: get(tags, 'nodes'),
        date: date,
        modified: modified
      }
    });
  });
  var header = getHeader(data.variables, resultsData);
  return _objectSpread({
    header: header,
    resultsData: resultsData
  }, rest);
};

var _jsxFileName$c = "/home/geoff/Dev/web/wp-graphql-composer/src/archives/post-result.jsx";
var EntryMeta = function EntryMeta(_ref) {
  var author = _ref.author,
      categories = _ref.categories,
      tags = _ref.tags,
      date = _ref.date,
      modified = _ref.modified;
  return React.createElement("div", {
    className: "entry-footer",
    __source: {
      fileName: _jsxFileName$c,
      lineNumber: 12
    },
    __self: this
  }, React.createElement("span", {
    className: "posted-on",
    __source: {
      fileName: _jsxFileName$c,
      lineNumber: 13
    },
    __self: this
  }, React.createElement("span", {
    className: "screen-reader-text",
    __source: {
      fileName: _jsxFileName$c,
      lineNumber: 14
    },
    __self: this
  }, "Posted On"), React.createElement("time", {
    className: "date",
    dateTime: date,
    __source: {
      fileName: _jsxFileName$c,
      lineNumber: 15
    },
    __self: this
  }, moment(date).format('LLL')), modified !== date && React.createElement("time", {
    className: "modified",
    dateTime: modified,
    __source: {
      fileName: _jsxFileName$c,
      lineNumber: 19
    },
    __self: this
  }, "Last updated on: ", moment(modified).format('LLL'))), React.createElement("span", {
    className: "byline",
    __source: {
      fileName: _jsxFileName$c,
      lineNumber: 24
    },
    __self: this
  }, React.createElement("span", {
    className: "screen-reader-text",
    __source: {
      fileName: _jsxFileName$c,
      lineNumber: 25
    },
    __self: this
  }, "Author"), React.createElement(Link, {
    key: author.id,
    to: "/author/".concat(author.nicename),
    __source: {
      fileName: _jsxFileName$c,
      lineNumber: 26
    },
    __self: this
  }, author.nicename)), categories.length > 0 && React.createElement("span", {
    className: "cat-links",
    __source: {
      fileName: _jsxFileName$c,
      lineNumber: 29
    },
    __self: this
  }, React.createElement("span", {
    className: "screen-reader-text",
    __source: {
      fileName: _jsxFileName$c,
      lineNumber: 30
    },
    __self: this
  }, "Categories"), map(categories, function (_ref2) {
    var id = _ref2.id,
        name = _ref2.name,
        slug = _ref2.slug;
    return React.createElement(Link, {
      key: id,
      to: "/category/".concat(slug),
      __source: {
        fileName: _jsxFileName$c,
        lineNumber: 32
      },
      __self: this
    }, name);
  })), tags.length > 0 && React.createElement("span", {
    className: "tags-links",
    __source: {
      fileName: _jsxFileName$c,
      lineNumber: 37
    },
    __self: this
  }, React.createElement("span", {
    className: "screen-reader-text",
    __source: {
      fileName: _jsxFileName$c,
      lineNumber: 38
    },
    __self: this
  }, "Tags"), map(tags, function (_ref3) {
    var id = _ref3.id,
        name = _ref3.name,
        slug = _ref3.slug;
    return React.createElement(Link, {
      key: id,
      to: "/tag/".concat(slug),
      __source: {
        fileName: _jsxFileName$c,
        lineNumber: 40
      },
      __self: this
    }, name);
  })));
};

var postResult = function postResult(_ref4) {
  var Attachment = _ref4.Attachment,
      id = _ref4.id,
      postId = _ref4.postId,
      showContent = _ref4.showContent,
      excerpt = _ref4.excerpt,
      content = _ref4.content,
      title = _ref4.title,
      permalink = _ref4.permalink,
      featuredImage = _ref4.featuredImage,
      meta = _ref4.meta,
      rest = _objectWithoutProperties(_ref4, ["Attachment", "id", "postId", "showContent", "excerpt", "content", "title", "permalink", "featuredImage", "meta"]);

  var hasThumbnail = {
    name: 'featuredImage',
    className: 'has-post-thumbnail'
  };
  var className = compileClassName({
    featuredImage: featuredImage,
    meta: meta
  }, "post-".concat(postId, " post type-post"), hasThumbnail);
  return React.createElement("article", Object.assign({
    id: "post-".concat(postId),
    className: className
  }, rest, {
    __source: {
      fileName: _jsxFileName$c,
      lineNumber: 73
    },
    __self: this
  }), featuredImage && React.createElement(Link, {
    className: "post-thumbnail",
    to: "/".concat(permalink),
    __source: {
      fileName: _jsxFileName$c,
      lineNumber: 79
    },
    __self: this
  }, React.createElement(Attachment, {
    className: "attachment-post-thumbnail",
    mediaItemId: featuredImage.mediaItemId,
    fallback: true,
    __source: {
      fileName: _jsxFileName$c,
      lineNumber: 80
    },
    __self: this
  })), React.createElement("div", {
    className: "entry-content",
    __source: {
      fileName: _jsxFileName$c,
      lineNumber: 87
    },
    __self: this
  }, showContent ? ReactHtmlParser(content) : ReactHtmlParser(excerpt)), React.createElement(EntryMeta, Object.assign({}, meta, {
    __source: {
      fileName: _jsxFileName$c,
      lineNumber: 90
    },
    __self: this
  })));
};

postResult.propTypes = {
  Attachment: propTypes.func.isRequired,
  id: propTypes.string.isRequired,
  postId: propTypes.number.isRequired,
  excerpt: propTypes.string,
  title: propTypes.string,
  featuredImage: propTypes.shape({}),
  showContent: propTypes.bool,
  meta: propTypes.shape({
    author: propTypes.shape({}),
    categories: propTypes.arrayOf(propTypes.shape({})),
    tags: propTypes.arrayOf(propTypes.shape({})),
    date: propTypes.string,
    modified: propTypes.string
  })
};
postResult.defaultProps = {
  content: undefined,
  title: undefined,
  featuredImage: undefined,
  showContent: true,
  meta: {}
};

function _templateObject$2() {
  var data = _taggedTemplateLiteral(["\n  query ArchiveQuery(\n      $first: Int,\n      $category: String,\n      $tag: String,\n      $year: Int,\n      $month: Int,\n      $day: Int,\n      $author: String,\n      $search: String\n    ) {\n    posts(\n      first: $first,\n      where: {\n        categoryName: $category,\n        tag: $tag,\n        authorName: $author,\n        dateQuery: { year: $year, month: $month, day: $day },\n        search: $search\n      }\n    ) {\n      nodes {\n        id\n        postId\n        excerpt\n        content\n        date\n        modified\n        title\n        permalink\n        featuredImage {\n          id\n          mediaItemId\n          title\n          altText\n          sourceUrl\n        }\n        tags {\n          nodes {\n            id\n            name\n            slug\n          }\n        }\n        categories {\n          nodes {\n            id\n            name\n            slug\n          }\n        }\n        author {\n          id\n          userId\n          nicename\n          avatar {\n            url\n            foundAvatar\n          }\n        }\n      }\n    }\n  }\n"]);

  _templateObject$2 = function _templateObject() {
    return data;
  };

  return data;
}
var ARCHIVE_QUERY = gql(_templateObject$2());

var css$8 = "/* Extra Small */\n/* Small */\n/* Medium */\n/* Large */\n/* Extra Large */\n";
styleInject(css$8);

var _jsxFileName$d = "/home/geoff/Dev/web/wp-graphql-composer/src/archives/archive.jsx";
/**
 * Archives view component
 * 
 * @param {object} props
 * 
 * @returns {React.Component} 
 */

var archive$1 = function archive(_ref) {
  var Attachment$$1 = _ref.Attachment,
      PostResult = _ref.PostResult,
      container = _ref.container,
      containerProps = _ref.containerProps,
      header = _ref.header,
      noHeader = _ref.noHeader,
      resultsData = _ref.resultsData,
      rest = _objectWithoutProperties(_ref, ["Attachment", "PostResult", "container", "containerProps", "header", "noHeader", "resultsData"]);

  var Results = function Results() {
    return React.createElement(React.Fragment, {
      __source: {
        fileName: _jsxFileName$d,
        lineNumber: 42
      },
      __self: this
    }, !noHeader && React.createElement("header", {
      className: "page-header",
      __source: {
        fileName: _jsxFileName$d,
        lineNumber: 44
      },
      __self: this
    }, React.createElement("h1", {
      className: "page-title",
      __source: {
        fileName: _jsxFileName$d,
        lineNumber: 45
      },
      __self: this
    }, header)), map(resultsData, function (_ref2) {
      var id = _ref2.id,
          r = _objectWithoutProperties(_ref2, ["id"]);

      return React.createElement(PostResult, Object.assign({}, r, {
        id: id,
        key: id
      }, _objectSpread({}, rest, {
        Attachment: Attachment$$1
      }), {
        __source: {
          fileName: _jsxFileName$d,
          lineNumber: 49
        },
        __self: this
      }));
    }));
  };

  if (container === true) {
    return React.createElement("div", Object.assign({}, containerProps, {
      __source: {
        fileName: _jsxFileName$d,
        lineNumber: 56
      },
      __self: this
    }), React.createElement(Results, {
      __source: {
        fileName: _jsxFileName$d,
        lineNumber: 57
      },
      __self: this
    }));
  } else if (container) {
    var Container = container;
    return React.createElement(Container, Object.assign({}, containerProps, {
      __source: {
        fileName: _jsxFileName$d,
        lineNumber: 64
      },
      __self: this
    }), React.createElement(Results, {
      __source: {
        fileName: _jsxFileName$d,
        lineNumber: 65
      },
      __self: this
    }));
  }

  return React.createElement(Results, {
    __source: {
      fileName: _jsxFileName$d,
      lineNumber: 70
    },
    __self: this
  });
};

archive$1.propTypes = {
  Attachment: propTypes.func.isRequired,
  PostResult: propTypes.func.isRequired,
  container: propTypes.oneOfType([propTypes.bool, propTypes.string, propTypes.func]),
  containerProps: propTypes.shape({}),
  noHeader: propTypes.bool,
  header: propTypes.string,
  resultsData: propTypes.arrayOf(propTypes.shape({}))
};
archive$1.defaultProps = {
  container: undefined,
  containerProps: {},
  noHeader: false,
  header: undefined,
  resultsData: []
  /**
   * Default where args for ARCHIVE_QUERY
   */

};
var whereArgsDefaults = {
  category: null,
  tag: null,
  year: null,
  month: null,
  day: null,
  author: null,
  search: null
};
/**
 * Creates composer for archive component
 */

archive$1.compose = queryComposer({
  view: archive$1,
  PostResult: postResult,
  Attachment: Attachment,
  queries: [{
    query: ARCHIVE_QUERY,
    config: {
      options: function options(_ref3) {
        var first = _ref3.first,
            where = _ref3.where;
        return {
          variables: _objectSpread({
            first: first
          }, whereArgsDefaults, where)
        };
      }
    }
  }],
  whileLoading: {
    view: Loading
  },
  forError: {
    view: Error$1
  },
  sharedMapper: archiveMapper
});
/**
 * Compose default Archive Component
 * @var {React.Component} Archive
 */

var Archive = archive$1.compose();

// Archive component exporter

function _templateObject3$1() {
  var data = _taggedTemplateLiteral(["\n  query MenuItemQuery($id: ID!) {\n    menuItem(id: $id) {\n      childItems{\n        nodes{\n          id\n          menuItemId\n          url\n          label\n          cssClasses\n          description\n        }\n      }\n    }\n  }\n"]);

  _templateObject3$1 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$2() {
  var data = _taggedTemplateLiteral(["\n  query MenuWhereQuery(\n    $menuId: Int\n    $location: MenuLocationEnum\n    $slug: String\n  ){\n    menus(where: { id: $menuId, location: $location, slug: $slug }) {\n      nodes{\n        id\n        slug\n        menuItems{\n          nodes {\n            id\n            menuItemId\n            url\n            label\n            cssClasses\n            description\n          }\n        }\n      }\n    }\n    generalSettings {\n      url\n    }\n  }\n"]);

  _templateObject2$2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$3() {
  var data = _taggedTemplateLiteral(["\n  query MenuQuery($id: ID!){\n    menu(id: $id) {\n      id\n      slug\n      menuItems{\n\t\t\t\tnodes {\n          id\n          menuItemId\n          url\n          label\n          cssClasses\n          description\n        }\n      }\n    }\n    generalSettings {\n      url\n    }\n  }\n"]);

  _templateObject$3 = function _templateObject() {
    return data;
  };

  return data;
}
var MENU_QUERY = gql(_templateObject$3());
var MENU_WHERE_QUERY = gql(_templateObject2$2());
var MENU_ITEM_QUERY = gql(_templateObject3$1());

var menuInitialState = {
  homeUrl: ''
};
var MenuContext = React.createContext(menuInitialState);

var css$9 = ".menu-item-module_description__32JbP {\n  font-size: 80%; }\n\n.menu-item-module_link__1Qq1O {\n  text-decoration: none; }\n\n.menu-item-module_link__1Qq1O,\n.menu-item-module_text__3ogqT {\n  order: 0;\n  flex-grow: 8;\n  flex-shrink: 0;\n  padding: 1.5em 1em;\n  transition: color 250ms ease-out, background-color 320ms ease-in; }\n";
var styles$5 = {"description":"menu-item-module_description__32JbP","link":"menu-item-module_link__1Qq1O","text":"menu-item-module_text__3ogqT"};
styleInject(css$9);

var _jsxFileName$e = "/home/geoff/Dev/web/wp-graphql-composer/src/menu/menu-item.jsx";
/**
 * MenuItem Link component
 * 
 * @param {object} props
 * 
 * @returns {React.Component} 
 */

var Link$1 = function Link$$1(_ref) {
  var url = _ref.url,
      children = _ref.children,
      homeUrl = _ref.homeUrl,
      rest = _objectWithoutProperties(_ref, ["url", "children", "homeUrl"]);

  if (!url || url === '#') return React.createElement("span", {
    className: styles$5.text,
    __source: {
      fileName: _jsxFileName$e,
      lineNumber: 32
    },
    __self: this
  }, children);
  if (url.startsWith(homeUrl)) return React.createElement(NavLink, Object.assign({
    className: styles$5.link,
    exact: true,
    to: "".concat(url.substring(homeUrl.length))
  }, rest, {
    __source: {
      fileName: _jsxFileName$e,
      lineNumber: 38
    },
    __self: this
  }), children);
  return React.createElement("a", Object.assign({
    className: styles$5.link,
    href: url
  }, rest, {
    __source: {
      fileName: _jsxFileName$e,
      lineNumber: 44
    },
    __self: this
  }), children);
};
/**
 * MenuItem view component
 * 
 * @param {object} props
 * 
 * @returns {React.Component} 
 */


var menuItem = function menuItem(_ref2) {
  var url = _ref2.url,
      label = _ref2.label,
      items = _ref2.items,
      description = _ref2.description,
      cssClasses = _ref2.cssClasses,
      SubMenu = _ref2.SubMenu,
      MenuItem = _ref2.MenuItem,
      rest = _objectWithoutProperties(_ref2, ["url", "label", "items", "description", "cssClasses", "SubMenu", "MenuItem"]);

  return React.createElement(React.Fragment, {
    __source: {
      fileName: _jsxFileName$e,
      lineNumber: 62
    },
    __self: this
  }, React.createElement(MenuContext.Consumer, {
    __source: {
      fileName: _jsxFileName$e,
      lineNumber: 63
    },
    __self: this
  }, function (_ref3) {
    var homeUrl = _ref3.homeUrl;
    return React.createElement(Link$1, Object.assign({}, _objectSpread({}, rest, {
      url: url,
      homeUrl: homeUrl
    }), {
      __source: {
        fileName: _jsxFileName$e,
        lineNumber: 65
      },
      __self: this
    }), label, description && React.createElement("div", {
      className: styles$5.description,
      __source: {
        fileName: _jsxFileName$e,
        lineNumber: 68
      },
      __self: this
    }, description));
  }), !isEmpty(items) && React.createElement(SubMenu, Object.assign({
    items: items,
    SubMenu: SubMenu,
    MenuItem: MenuItem
  }, {
    __source: {
      fileName: _jsxFileName$e,
      lineNumber: 75
    },
    __self: this
  })));
};

menuItem.propTypes = {
  SubMenu: propTypes.func.isRequired,
  MenuItem: propTypes.func.isRequired,
  url: propTypes.string,
  label: propTypes.string,
  items: propTypes.arrayOf(propTypes.shape({}))
};
menuItem.defaultProps = {
  url: undefined,
  label: undefined,
  items: []
};
/**
 * Creates composer for menuItem component
 */

menuItem.compose = queryComposer({
  view: menuItem,
  whileLoading: {
    view: Loading
  },
  forError: {
    view: Error$1
  },
  queries: [{
    query: MENU_ITEM_QUERY,
    config: {
      options: function options(_ref4) {
        var id = _ref4.id;
        return {
          id: id
        };
      },
      skip: function skip(_ref5) {
        var noSubMenu = _ref5.noSubMenu;
        return !!noSubMenu;
      }
    }
  }],
  sharedMapper: function sharedMapper(_ref6) {
    var data = _ref6.data,
        rest = _objectWithoutProperties(_ref6, ["data"]);

    var items = get(data, 'menuItem.childItems.nodes');
    return _objectSpread({
      items: items
    }, omit(rest, 'id'));
  }
});
/**
 * Compose default MenuItem Component
 * @var {React.Component} MenuItem
 */

var MenuItem = menuItem.compose();

var css$a = "/**\n * Menu Component Styling\n */\n.menu-module_menu__3UQcd {\n  position: relative;\n  margin: 0 auto;\n  padding: 0;\n  max-width: 100%;\n  list-style: none;\n  display: flex;\n  flex-direction: column; }\n  .menu-module_menu__3UQcd .menu-module_item__1NLo- {\n    display: inline-flex;\n    flex-flow: row wrap;\n    align-content: space-between;\n    justify-content: space-between;\n    width: 100%;\n    padding: 0;\n    margin: 0; }\n    .menu-module_menu__3UQcd .menu-module_item__1NLo-:after {\n      content: \"\";\n      display: table;\n      clear: both; }\n";
var baseStyles = {"menu":"menu-module_menu__3UQcd","item":"menu-module_item__1NLo-"};
styleInject(css$a);

var css$b = ".sub-menu-module_dropdown__vNhpq {\n  flex-basis: auto;\n  flex-grow: 1;\n  flex-shrink: 1;\n  margin: auto;\n  position: relative;\n  width: 3em;\n  height: 3em;\n  padding: 1em;\n  background: transparent;\n  border: none; }\n\n.sub-menu-module_menu__VggfG {\n  margin-left: 0.8em;\n  padding: 0;\n  flex-basis: 100%;\n  order: 2;\n  overflow: hidden;\n  max-height: 0;\n  transition: max-height 550ms ease-out; }\n  .sub-menu-module_menu__VggfG.sub-menu-module_on__opD6y {\n    transition: max-height 3s ease-out;\n    max-height: 100vh; }\n  .sub-menu-module_menu__VggfG:before {\n    content: \"\";\n    display: table;\n    clear: both; }\n";
var styles$6 = {"dropdown":"sub-menu-module_dropdown__vNhpq","menu":"sub-menu-module_menu__VggfG","on":"sub-menu-module_on__opD6y"};
styleInject(css$b);

var _jsxFileName$f = "/home/geoff/Dev/web/wp-graphql-composer/src/menu/sub-menu.jsx";
/**
 * SubMenu view component
 */

var subMenu =
/*#__PURE__*/
function (_React$Component) {
  _inherits(subMenu, _React$Component);

  function subMenu(props) {
    var _this;

    _classCallCheck(this, subMenu);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(subMenu).call(this, props));
    _this.toggle = _this.toggle.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      isCollapsed: true
    };
    return _this;
  }

  _createClass(subMenu, [{
    key: "toggle",
    value: function toggle() {
      this.setState({
        isCollapsed: !this.state.isCollapsed
      });
    }
  }, {
    key: "render",
    value: function render() {
      var className = classnames(baseStyles.menu, styles$6.menu, _defineProperty({}, styles$6.on, this.state.isCollapsed));
      var dropdownClassName = classnames(styles$6.dropdown, _defineProperty({}, styles$6.on, this.state.isCollapsed));
      var isCollapsed = this.state.isCollapsed;

      var _this$props = this.props,
          MenuItem = _this$props.MenuItem,
          SubMenu = _this$props.SubMenu,
          items = _this$props.items,
          rest = _objectWithoutProperties(_this$props, ["MenuItem", "SubMenu", "items"]);

      return React.createElement(React.Fragment, {
        __source: {
          fileName: _jsxFileName$f,
          lineNumber: 51
        },
        __self: this
      }, React.createElement("button", {
        className: dropdownClassName,
        "aria-expanded": isCollapsed,
        onClick: this.toggle,
        __source: {
          fileName: _jsxFileName$f,
          lineNumber: 52
        },
        __self: this
      }, React.createElement(Icon, {
        className: styles$6.icon,
        name: "arrow_drop_down",
        dark: true,
        __source: {
          fileName: _jsxFileName$f,
          lineNumber: 57
        },
        __self: this
      })), React.createElement("ul", Object.assign({
        className: className
      }, rest, {
        __source: {
          fileName: _jsxFileName$f,
          lineNumber: 59
        },
        __self: this
      }), map(items, function (_ref) {
        var id = _ref.id,
            menuItemId = _ref.menuItemId,
            cssClasses = _ref.cssClasses,
            r = _objectWithoutProperties(_ref, ["id", "menuItemId", "cssClasses"]);

        var itemClassName = classnames.apply(void 0, [baseStyles.item, styles$6.item].concat(_toConsumableArray(cssClasses), ["menu-item-".concat(menuItemId)]));
        return React.createElement("li", {
          id: "menu-item-".concat(menuItemId),
          className: itemClassName,
          key: id,
          __source: {
            fileName: _jsxFileName$f,
            lineNumber: 69
          },
          __self: this
        }, React.createElement(MenuItem, Object.assign({
          id: id
        }, _objectSpread({}, r, {
          MenuItem: MenuItem,
          SubMenu: SubMenu
        }), {
          __source: {
            fileName: _jsxFileName$f,
            lineNumber: 74
          },
          __self: this
        })));
      })));
    }
  }]);

  return subMenu;
}(React.Component);

subMenu.propTypes = {
  SubMenu: propTypes.func.isRequired,
  MenuItem: propTypes.func.isRequired,
  items: propTypes.arrayOf(propTypes.shape({}))
};
subMenu.defaultProps = {
  items: []
};
/**
 * Creates composer for subMenu component
 */

subMenu.compose = baseComposer({
  view: subMenu,
  whileLoading: {
    view: Loading
  },
  forError: {
    view: Error$1
  },
  mapper: function mapper(props) {
    return props;
  }
});
/**
 * Compose default SubMenu Component
 * @var {React.Component} SubMenu
 */

var SubMenu = subMenu.compose();

var _jsxFileName$g = "/home/geoff/Dev/web/wp-graphql-composer/src/menu/state-manager.js";
var menuStateManager = function menuStateManager(BaseComponent) {
  var BaseFactory = React.createFactory(BaseComponent);

  var MenuStateManager =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(MenuStateManager, _React$Component);

    function MenuStateManager(props) {
      var _this;

      _classCallCheck(this, MenuStateManager);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(MenuStateManager).call(this, props));
      _this.state = menuInitialState;
      return _this;
    }

    _createClass(MenuStateManager, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            menu = _this$props.menu,
            homeUrl = _this$props.homeUrl,
            rest = _objectWithoutProperties(_this$props, ["menu", "homeUrl"]);

        var newProps = _objectSpread({
          items: get(menu, 'menuItems.nodes')
        }, omit(menu, 'id', 'menuItems'), omit(rest, 'id'));

        return React.createElement(MenuContext.Provider, {
          value: {
            homeUrl: homeUrl
          },
          __source: {
            fileName: _jsxFileName$g,
            lineNumber: 25
          },
          __self: this
        }, React.createElement(BaseFactory, Object.assign({}, newProps, {
          __source: {
            fileName: _jsxFileName$g,
            lineNumber: 26
          },
          __self: this
        })));
      }
    }]);

    return MenuStateManager;
  }(React.Component);

  {
    return setDisplayName(wrapDisplayName(BaseComponent, 'menuStateManager'))(MenuStateManager);
  }

  return MenuStateManager;
};

var _jsxFileName$h = "/home/geoff/Dev/web/wp-graphql-composer/src/menu/menu.jsx";
/**
 * Menu view component
 * 
 * @param {object} props
 * 
 * @returns {React.Component} 
 */

var menu = function menu(_ref) {
  var Element = _ref.as,
      addedCN = _ref.className,
      slug = _ref.slug,
      items = _ref.items,
      SubMenu$$1 = _ref.SubMenu,
      MenuItem$$1 = _ref.MenuItem,
      rest = _objectWithoutProperties(_ref, ["as", "className", "slug", "items", "SubMenu", "MenuItem"]);

  var className = classnames(baseStyles.menu, addedCN);
  return React.createElement(Element, Object.assign({
    id: "menu-".concat(slug),
    className: className
  }, rest, {
    __source: {
      fileName: _jsxFileName$h,
      lineNumber: 36
    },
    __self: this
  }), !isEmpty(items) && map(items, function (_ref2) {
    var id = _ref2.id,
        menuItemId = _ref2.menuItemId,
        cssClasses = _ref2.cssClasses,
        r = _objectWithoutProperties(_ref2, ["id", "menuItemId", "cssClasses"]);

    var itemClassName = classnames.apply(void 0, [baseStyles.item].concat(_toConsumableArray(cssClasses), ["menu-item-".concat(menuItemId)]));
    return React.createElement("li", {
      id: "menu-item-".concat(menuItemId),
      className: itemClassName,
      key: id,
      __source: {
        fileName: _jsxFileName$h,
        lineNumber: 46
      },
      __self: this
    }, React.createElement(MenuItem$$1, Object.assign({
      id: id
    }, _objectSpread({}, r, {
      SubMenu: SubMenu$$1,
      MenuItem: MenuItem$$1
    }), {
      __source: {
        fileName: _jsxFileName$h,
        lineNumber: 51
      },
      __self: this
    })));
  }));
};

menu.propTypes = {
  slug: propTypes.string.isRequired,
  SubMenu: propTypes.func.isRequired,
  MenuItem: propTypes.func.isRequired,
  items: propTypes.arrayOf(propTypes.shape({})),
  as: propTypes.oneOfType([propTypes.string, propTypes.func]),
  className: propTypes.string
};
menu.defaultProps = {
  items: [],
  as: 'ul',
  className: undefined
};
/**
 * Creates composer for menu component
 */

menu.compose = queryComposer({
  view: menu,
  MenuItem: MenuItem,
  SubMenu: SubMenu,
  whileLoading: {
    view: Loading
  },
  forError: {
    view: Error$1
  },
  queries: [{
    cond: function cond(_ref3) {
      var menuId = _ref3.menuId,
          location = _ref3.location,
          slug = _ref3.slug;
      return !!menuId || !!location || !!slug;
    },
    query: MENU_WHERE_QUERY,
    config: {
      options: function options(_ref4) {
        var menuId = _ref4.menuId,
            location = _ref4.location,
            slug = _ref4.slug;
        return {
          menuId: menuId,
          location: location,
          slug: slug
        };
      },
      skip: function skip(_ref5) {
        var optional = _ref5.optional,
            location = _ref5.location,
            menuId = _ref5.menuId,
            slug = _ref5.slug;
        return !location && !menuId && !slug && optional;
      }
    },
    mapper: function mapper(_ref6) {
      var data = _ref6.data,
          rest = _objectWithoutProperties(_ref6, ["data"]);

      return _objectSpread({
        homeUrl: get(data, 'generalSettings.url'),
        menu: get(data, 'menus.nodes[0]')
      }, rest);
    }
  }, {
    cond: function cond(_ref7) {
      var id = _ref7.id;
      return !!id;
    },
    query: MENU_QUERY,
    config: {
      options: function options(_ref8) {
        var id = _ref8.id;
        return {
          id: id
        };
      },
      skip: function skip(_ref9) {
        var optional = _ref9.optional,
            id = _ref9.id;
        return !id && optional;
      }
    },
    mapper: function mapper(_ref10) {
      var data = _ref10.data,
          rest = _objectWithoutProperties(_ref10, ["data"]);

      return _objectSpread({
        homeUrl: get(data, 'generalSettings.url'),
        menu: get(data, 'menu')
      }, rest);
    }
  }],
  extraHocs: [menuStateManager]
});
/**
 * Compose default Menu Component
 * @var {React.Component} Menu
 */

var Menu = menu.compose();

/**
 * Menu Exporter
 */

/**
 * Header component mapper function
 * 
 * @param {object} props
 * 
 * @returns {object}
 */

var headerMapper = function headerMapper(_ref) {
  var data = _ref.data,
      rest = _objectWithoutProperties(_ref, ["data"]);

  var title = get(data, 'allSettings.generalSettingsTitle');
  var description = get(data, 'allSettings.generalSettingsDescription');
  var url = get(data, 'allSettings.homeUrl');
  var logo = get(data, 'themeMods.customLogo');
  return _objectSpread({
    title: title,
    url: url,
    description: description,
    logo: logo
  }, rest);
};

function _templateObject$4() {
  var data = _taggedTemplateLiteral(["\n  query HeaderQuery {\n    allSettings {\n      generalSettingsTitle\n      generalSettingsDescription\n      homeUrl\n    }\n  }\n"]);

  _templateObject$4 = function _templateObject() {
    return data;
  };

  return data;
}
var HEADER_QUERY = gql(_templateObject$4());

var css$c = "/**\n * HEADER COMPONENT\n */\n.header_app-header__1T7Ws {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  padding-right: 2em; }\n\n.header_app-header__1T7Ws > * {\n  margin: 0em auto 1em; }\n\n.header_app-header__1T7Ws .header_site-branding__2yqBG {\n  display: inline-flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 2em 4em 1.25em; }\n\n.header_app-header__1T7Ws .header_site-branding__2yqBG .header_site-logo__1zZZQ {\n  margin: 0 auto; }\n\n.header_app-header__1T7Ws .header_site-branding__2yqBG .header_site-title__2g7Ck {\n  font-size: 2em; }\n\n.header_app-header__1T7Ws .header_site-branding__2yqBG .header_site-description__RcEO_ {\n  font-size: 1.9em; }\n";
styleInject(css$c);

var _jsxFileName$i = "/home/geoff/Dev/web/wp-graphql-composer/src/header/header.jsx";
/**
 * Header view component
 * 
 * @param {object} props
 * 
 * @returns {React.Component} 
 */

var header$1 = function header(_ref) {
  var url = _ref.url,
      title = _ref.title,
      description = _ref.description,
      children = _ref.children,
      Attachment$$1 = _ref.Attachment,
      rest = _objectWithoutProperties(_ref, ["url", "title", "description", "children", "Attachment"]);

  return React.createElement("div", Object.assign({
    className: "site-header",
    role: "banner"
  }, rest, {
    __source: {
      fileName: _jsxFileName$i,
      lineNumber: 31
    },
    __self: this
  }), React.createElement("div", {
    id: "masthead",
    className: "site-branding",
    __source: {
      fileName: _jsxFileName$i,
      lineNumber: 32
    },
    __self: this
  }, React.createElement(Attachment$$1, {
    customLogo: true,
    className: "custom-logo",
    alt: title,
    fallback: true,
    style: {
      width: '256px',
      padding: '2em'
    },
    __source: {
      fileName: _jsxFileName$i,
      lineNumber: 33
    },
    __self: this
  }), React.createElement("h1", {
    className: "site-title",
    __source: {
      fileName: _jsxFileName$i,
      lineNumber: 43
    },
    __self: this
  }, title), React.createElement("h1", {
    className: "site-description",
    __source: {
      fileName: _jsxFileName$i,
      lineNumber: 44
    },
    __self: this
  }, React.createElement("small", {
    __source: {
      fileName: _jsxFileName$i,
      lineNumber: 44
    },
    __self: this
  }, description))), React.createElement("div", {
    id: "main-navigation",
    className: "app-navigation",
    __source: {
      fileName: _jsxFileName$i,
      lineNumber: 46
    },
    __self: this
  }, children));
};

header$1.propTypes = {
  Attachment: propTypes.func.isRequired,
  url: propTypes.string,
  title: propTypes.string,
  description: propTypes.string,
  logo: propTypes.number
};
header$1.defaultProps = {
  url: undefined,
  title: undefined,
  description: undefined,
  logo: undefined
};
/**
 * Creates composer for header component
 */

header$1.compose = queryComposer({
  view: header$1,
  Attachment: Attachment,
  whileLoading: {
    view: Loading
  },
  forError: {
    view: Error$1,
    type: 'query'
  },
  queries: [{
    query: HEADER_QUERY
  }],
  sharedMapper: headerMapper
});
/**
 * Compose default Header Component
 * @var {React.Component} Header
 */

var Header = header$1.compose();

// Header component exporter

var _jsxFileName$j = "/home/geoff/Dev/web/wp-graphql-composer/src/main/router.js";
var mapLoopProps = function mapLoopProps(_ref) {
  var data = _ref.data,
      rest = _objectWithoutProperties(_ref, ["data"]);

  var pageForPostsSlug = get(data, 'allSettings.pageForPosts');
  var pageOnFront = get(data, 'allSettings.pageOnFront');
  var structure = get(data, 'allSettings.permalinkStructure');
  var limit = get(data, 'allSettings.readingSettingsPostsPerPage');
  return _objectSpread({
    pageForPostsSlug: pageForPostsSlug,
    pageOnFront: pageOnFront,
    structure: structure,
    limit: limit
  }, rest);
};
var defaultRoutes = function defaultRoutes(_ref2) {
  var limit = _ref2.limit,
      pageOnFront = _ref2.pageOnFront,
      postsPath = _ref2.postsPath,
      pageForPostsSlug = _ref2.pageForPostsSlug;
  return function (_ref3) {
    var Archive = _ref3.Archive,
        Page = _ref3.Page,
        Post = _ref3.Post,
        frontChildren = _ref3.frontChildren,
        children = _ref3.children,
        rest = _objectWithoutProperties(_ref3, ["Archive", "Page", "Post", "frontChildren", "children"]);

    return React.createElement(Switch, Object.assign({}, rest, {
      __source: {
        fileName: _jsxFileName$j,
        lineNumber: 18
      },
      __self: this
    }), frontChildren, React.createElement(Route, {
      exact: true,
      path: "/",
      render: function render() {
        if (pageOnFront) {
          return React.createElement(Page, {
            id: pageOnFront,
            __source: {
              fileName: _jsxFileName$j,
              lineNumber: 25
            },
            __self: this
          });
        }

        return React.createElement(Archive, {
          first: limit,
          noHeader: true,
          showContent: true,
          __source: {
            fileName: _jsxFileName$j,
            lineNumber: 27
          },
          __self: this
        });
      },
      __source: {
        fileName: _jsxFileName$j,
        lineNumber: 23
      },
      __self: this
    }), React.createElement(Route, {
      exact: true,
      path: "/:year(\\d{4})",
      render: function render(_ref4) {
        var params = _ref4.match.params;
        var year = parseInt(params.year, 10);
        return React.createElement(Archive, {
          first: limit,
          where: {
            year: year
          },
          __source: {
            fileName: _jsxFileName$j,
            lineNumber: 38
          },
          __self: this
        });
      },
      __source: {
        fileName: _jsxFileName$j,
        lineNumber: 31
      },
      __self: this
    }), React.createElement(Route, {
      exact: true,
      path: "/:year(\\d{4})/:monthnum(\\d{2})/:day(\\d{2})",
      render: function render(_ref5) {
        var params = _ref5.match.params;
        var day = parseInt(params.day, 10);
        var year = parseInt(params.year, 10);
        var month = parseInt(params.monthnum, 10);
        return React.createElement(Archive, {
          first: limit,
          where: {
            month: month,
            year: year,
            day: day
          },
          __source: {
            fileName: _jsxFileName$j,
            lineNumber: 52
          },
          __self: this
        });
      },
      __source: {
        fileName: _jsxFileName$j,
        lineNumber: 43
      },
      __self: this
    }), React.createElement(Route, {
      exact: true,
      path: "/:year(\\d{4})/:monthnum(\\d{2})",
      render: function render(_ref6) {
        var params = _ref6.match.params;
        var year = parseInt(params.year, 10);
        var month = parseInt(params.monthnum, 10);
        return React.createElement(Archive, {
          first: limit,
          where: {
            month: month,
            year: year
          },
          __source: {
            fileName: _jsxFileName$j,
            lineNumber: 65
          },
          __self: this
        });
      },
      __source: {
        fileName: _jsxFileName$j,
        lineNumber: 57
      },
      __self: this
    }), React.createElement(Route, {
      path: "/category/:category",
      render: function render(_ref7) {
        var params = _ref7.match.params;
        return React.createElement(Archive, {
          first: limit,
          where: params,
          __source: {
            fileName: _jsxFileName$j,
            lineNumber: 74
          },
          __self: this
        });
      },
      __source: {
        fileName: _jsxFileName$j,
        lineNumber: 71
      },
      __self: this
    }), React.createElement(Route, {
      path: "/tag/:tag",
      render: function render(_ref8) {
        var params = _ref8.match.params;
        return React.createElement(Archive, {
          first: limit,
          where: params,
          __source: {
            fileName: _jsxFileName$j,
            lineNumber: 82
          },
          __self: this
        });
      },
      __source: {
        fileName: _jsxFileName$j,
        lineNumber: 79
      },
      __self: this
    }), React.createElement(Route, {
      path: "/author/:author",
      render: function render(_ref9) {
        var params = _ref9.match.params;
        return React.createElement(Archive, {
          first: limit,
          where: params,
          __source: {
            fileName: _jsxFileName$j,
            lineNumber: 90
          },
          __self: this
        });
      },
      __source: {
        fileName: _jsxFileName$j,
        lineNumber: 87
      },
      __self: this
    }), React.createElement(Route, {
      path: "/search/:search",
      render: function render(_ref10) {
        var params = _ref10.match.params;
        return React.createElement(Archive, {
          first: limit,
          where: params,
          __source: {
            fileName: _jsxFileName$j,
            lineNumber: 99
          },
          __self: this
        });
      },
      __source: {
        fileName: _jsxFileName$j,
        lineNumber: 95
      },
      __self: this
    }), pageForPostsSlug & React.createElement(Route, {
      exact: true,
      path: "/".concat(pageForPostsSlug),
      render: function render() {
        return React.createElement(Archive, {
          first: limit,
          __source: {
            fileName: _jsxFileName$j,
            lineNumber: 110
          },
          __self: this
        });
      },
      __source: {
        fileName: _jsxFileName$j,
        lineNumber: 106
      },
      __self: this
    }), React.createElement(Route, {
      exact: true,
      path: postsPath,
      render: function render(_ref11) {
        var params = _ref11.match.params;
        var post_id = params.post_id,
            postname = params.postname;
        if (post_id) return React.createElement(Post, {
          postId: post_id,
          __source: {
            fileName: _jsxFileName$j,
            lineNumber: 121
          },
          __self: this
        });
        if (postname) return React.createElement(Post, {
          slug: postname,
          __source: {
            fileName: _jsxFileName$j,
            lineNumber: 122
          },
          __self: this
        });else throw new Error('Post not found');
      },
      __source: {
        fileName: _jsxFileName$j,
        lineNumber: 116
      },
      __self: this
    }), children, React.createElement(Route, {
      path: "/(.*)",
      render: function render(_ref12) {
        var params = _ref12.match.params;
        return React.createElement(Page, {
          uri: params[0],
          __source: {
            fileName: _jsxFileName$j,
            lineNumber: 133
          },
          __self: this
        });
      },
      __source: {
        fileName: _jsxFileName$j,
        lineNumber: 131
      },
      __self: this
    }));
  };
};
var routesProcessor = function routesProcessor(routesView) {
  return function (BaseComponent) {
    var BaseFactory = createFactory(BaseComponent);

    var RoutesProcessor = function RoutesProcessor(_ref13) {
      var pageForPostsSlug = _ref13.pageForPostsSlug,
          pageOnFront = _ref13.pageOnFront,
          structure = _ref13.structure,
          limit = _ref13.limit,
          Archive = _ref13.Archive,
          Post = _ref13.Post,
          Page = _ref13.Page,
          rest = _objectWithoutProperties(_ref13, ["pageForPostsSlug", "pageOnFront", "structure", "limit", "Archive", "Post", "Page"]);

      if (!structure) {
        throw new Error('Pretty permalinks must be on');
      } // Format post-type path from permalink structure


      var postsPath = structure.replace(/%([A-z]+)%/g, ':$1').replace(/:(monthnum|day|hour|minute|second)/g, ':$1(\\d{2})').replace(/:(post_id)/g, ':$1(\\d{3})').replace(/:(year)/g, ':$1(\\d{4})');
      var Routes = routesView({
        limit: limit,
        pageOnFront: pageOnFront,
        postsPath: postsPath,
        pageForPostsSlug: pageForPostsSlug
      });
      return BaseFactory(_objectSpread({
        Routes: Routes
      }, rest));
    };

    {
      return setDisplayName(wrapDisplayName(BaseComponent, 'routesProcessor'))(RoutesProcessor);
    }

    return RoutesProcessor;
  };
};

function _templateObject$5() {
  var data = _taggedTemplateLiteral(["\n  query LoopQuery {\n    allSettings {\n      pageForPosts\n      pageOnFront\n      permalinkStructure\n      readingSettingsPostsPerPage\n    }\n  }\n"]);

  _templateObject$5 = function _templateObject() {
    return data;
  };

  return data;
}
var LOOP_QUERY = gql(_templateObject$5());

var css$d = ".main-module_main__20LrB {\n  max-width: 100vw;\n  margin: 0 auto;\n  overflow-x: hidden; }\n";
var styles$7 = {"main":"main-module_main__20LrB"};
styleInject(css$d);

var _jsxFileName$k = "/home/geoff/Dev/web/wp-graphql-composer/src/main/main.jsx";
/**
 * Main view component
 * 
 * @param {object} props
 * 
 * @returns {React.Component}
 */

var main = function main(_ref) {
  var Archive$$1 = _ref.Archive,
      children = _ref.children,
      added = _ref.className,
      Page$$1 = _ref.Page,
      Post$$1 = _ref.Post,
      Routes = _ref.Routes,
      topChildren = _ref.topChildren,
      rest = _objectWithoutProperties(_ref, ["Archive", "children", "className", "Page", "Post", "Routes", "topChildren"]);

  var className = classnames(styles$7.main, added);
  return React.createElement("main", Object.assign({
    role: "main",
    className: className
  }, rest, {
    __source: {
      fileName: _jsxFileName$k,
      lineNumber: 37
    },
    __self: this
  }), topChildren, React.createElement(Routes, Object.assign({
    Archive: Archive$$1,
    Page: Page$$1,
    Post: Post$$1
  }, {
    __source: {
      fileName: _jsxFileName$k,
      lineNumber: 39
    },
    __self: this
  })), children);
};

main.propTypes = {
  Archive: propTypes.func.isRequired,
  Page: propTypes.func.isRequired,
  Post: propTypes.func.isRequired,
  Routes: propTypes.func.isRequired,
  className: propTypes.string
};
main.defaultProps = {
  className: undefined
};
/**
 * Creates composer for main component
 */

main.compose = queryComposer({
  view: main,
  Archive: Archive,
  Page: Page,
  Post: Post,
  queries: [{
    query: LOOP_QUERY,
    mapper: mapLoopProps
  }],
  whileLoading: {
    view: Loading
  },
  forError: {
    view: Error$1
  },
  extraHocs: [routesProcessor(defaultRoutes)]
});
/**
 * Compose default Main Component
 * @var {React.Component} Main
 */

var Main = main.compose();

// Main component exporter

/**
 * Default Template Exporter
 */

export { compileClassName, createClient, WPProvider, whileLoading, errorHandler, forError, composeQuery, utilComposer, baseComposer, queryComposer, loading, Loading, progressMapper, error, Error$1 as Error, errorMapper, Icon, VIEWER_QUERY, LOGIN_MUTATION, login$1 as login, Login, userControls$1 as userControls, UserControls, CUSTOM_LOGO_QUERY, ATTACHMENT_QUERY, PAGE_QUERY, PAGE_BY_QUERY, POST_COMMENTS_QUERY, POST_QUERY, POST_BY_QUERY, DELETE_COMMENT_MUTATION, NEW_COMMENT_MUTATION, UPDATE_COMMENT_MUTATION, attachment, Attachment, page, Page, post, Post, archive$1 as archive, Archive, ARCHIVE_QUERY, MENU_QUERY, MENU_WHERE_QUERY, MENU_ITEM_QUERY, menuInitialState, MenuContext, menu, Menu, menuItem, MenuItem, Link$1 as Link, subMenu, SubMenu, header$1 as header, Header, headerMapper, HEADER_QUERY, main, Main, mapLoopProps, defaultRoutes, routesProcessor, LOOP_QUERY };
//# sourceMappingURL=index.module.js.map
