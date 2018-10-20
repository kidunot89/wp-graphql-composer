import _toConsumableArray from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/toConsumableArray";
import _objectWithoutProperties from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import _objectSpread from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectSpread";
import _classCallCheck from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/inherits";
import React from 'react';
import { each, get, map } from 'lodash';
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

export var whileLoading = function whileLoading(_ref) {
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

export var errorHandler = function errorHandler(BaseComponent) {
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

  if (process.env.NODE_ENV !== 'production') {
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

export var forError = function forError(_ref2) {
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
 * QueryCondition
 * @param {func} cond - condition function ex. (props) -> !!props.id
 * @param {gql} query - query to be request
 * @param {object} config - graphql(query, config)
 * @param {func} mapper - props mapper function
 */

/**
 * Return an instance of the `graphql` higher order component for 
 * the first QueryCondition to return true.  
 * @param {QueryCondition} queries 
 */

export var composeQuery = function composeQuery(queries) {
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

export var utilComposer = function utilComposer(_ref5) {
  var defaultView = _ref5.defaultView,
      defaultMapper = _ref5.defaultMapper;
  return function (_ref6) {
    var _ref6$view = _ref6.view,
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

export var baseComposer = function baseComposer(_ref7) {
  var defaultView = _ref7.view,
      defaultWhileLoading = _ref7.whileLoading,
      defaultForError = _ref7.forError,
      defaultMapper = _ref7.mapper,
      _ref7$extraHocs = _ref7.extraHocs,
      defaultExtraHocs = _ref7$extraHocs === void 0 ? [] : _ref7$extraHocs,
      extraDefaults = _objectWithoutProperties(_ref7, ["view", "whileLoading", "forError", "mapper", "extraHocs"]);

  return function (_ref8) {
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

export var queryComposer = function queryComposer(_ref9) {
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

  return function (_ref10) {
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