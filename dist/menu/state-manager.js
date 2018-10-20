import _objectSpread from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectSpread";
import _objectWithoutProperties from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import _classCallCheck from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/inherits";
import React from 'react';
import { get, omit } from 'lodash';
import { setDisplayName, wrapDisplayName } from 'recompose';
import { MenuContext, menuInitialState } from './context';
export var menuStateManager = function menuStateManager(BaseComponent) {
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
          }
        }, React.createElement(BaseFactory, newProps));
      }
    }]);

    return MenuStateManager;
  }(React.Component);

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'menuStateManager'))(MenuStateManager);
  }

  return MenuStateManager;
};