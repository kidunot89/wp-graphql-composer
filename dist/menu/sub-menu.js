import _objectSpread from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectSpread";
import _toConsumableArray from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/toConsumableArray";
import _objectWithoutProperties from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
import React from 'react';
import { map } from 'lodash';
import classNames from 'classnames';
import { Icon } from '../utils';
import baseStyles from './menu.module.scss';
import styles from './sub-menu.module.scss';

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
      var className = classNames(baseStyles.menu, styles.menu, _defineProperty({}, styles.on, this.state.isCollapsed));
      var dropdownClassName = classNames(styles.dropdown, _defineProperty({}, styles.on, this.state.isCollapsed));
      var isCollapsed = this.state.isCollapsed;

      var _this$props = this.props,
          MenuItem = _this$props.MenuItem,
          SubMenu = _this$props.SubMenu,
          items = _this$props.items,
          rest = _objectWithoutProperties(_this$props, ["MenuItem", "SubMenu", "items"]);

      return React.createElement(React.Fragment, null, React.createElement("button", {
        className: dropdownClassName,
        "aria-expanded": isCollapsed,
        onClick: this.toggle
      }, React.createElement(Icon, {
        className: styles.icon,
        name: "arrow_drop_down",
        dark: true
      })), React.createElement("ul", Object.assign({
        className: className
      }, rest), map(items, function (_ref) {
        var id = _ref.id,
            menuItemId = _ref.menuItemId,
            cssClasses = _ref.cssClasses,
            r = _objectWithoutProperties(_ref, ["id", "menuItemId", "cssClasses"]);

        var itemClassName = classNames.apply(void 0, [baseStyles.item, styles.item].concat(_toConsumableArray(cssClasses), ["menu-item-".concat(menuItemId)]));
        return React.createElement("li", {
          id: "menu-item-".concat(menuItemId),
          className: itemClassName,
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