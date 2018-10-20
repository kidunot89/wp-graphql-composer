import _objectSpread from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectSpread";
import _objectWithoutProperties from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import _classCallCheck from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
import React from 'react';
import { map } from 'lodash';

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
      var isCollapsed = this.state.isCollapsed;
      var collapse = isCollapsed ? '' : ' toggle-on';

      var _this$props = this.props,
          MenuItem = _this$props.MenuItem,
          SubMenu = _this$props.SubMenu,
          items = _this$props.items,
          rest = _objectWithoutProperties(_this$props, ["MenuItem", "SubMenu", "items"]);

      return React.createElement(React.Fragment, null, React.createElement("button", {
        className: "dropdown-toggle".concat(collapse),
        "aria-expanded": isCollapsed,
        onClick: this.toggle
      }, React.createElement("span", {
        className: "icon-arrow-up"
      })), React.createElement("ul", Object.assign({
        className: "sub-menu".concat(collapse)
      }, rest), map(items, function (_ref) {
        var id = _ref.id,
            menuItemId = _ref.menuItemId,
            r = _objectWithoutProperties(_ref, ["id", "menuItemId"]);

        return React.createElement("li", {
          id: "menu-item-".concat(menuItemId),
          className: "menu-item menu-item-".concat(menuItemId, " ").concat(r.cssClasses.join(' ')),
          key: id
        }, React.createElement(MenuItem, Object.assign({
          id: id
        }, _objectSpread({}, r, {
          MenuItem: MenuItem,
          SubMenu: SubMenu
        }))));
      })));
    }
  }]);

  return subMenu;
}(React.Component);

subMenu.defaultProps = {
  items: []
};
export default subMenu;