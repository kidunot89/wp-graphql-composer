import _objectSpread from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectSpread";
import _objectWithoutProperties from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import React from 'react';
import { isEmpty, map, omit } from 'lodash';
import { compileClassName } from '../helpers';
import './menu.scss';

var menu = function menu(_ref) {
  var slug = _ref.slug,
      items = _ref.items,
      SubMenu = _ref.SubMenu,
      MenuItem = _ref.MenuItem,
      rest = _objectWithoutProperties(_ref, ["slug", "items", "SubMenu", "MenuItem"]);

  var className = compileClassName(rest, 'menu-container', 'horizontal');
  return React.createElement("div", Object.assign({
    id: "menu-".concat(slug)
  }, omit(rest, 'horizontal'), {
    className: className
  }), React.createElement("ul", {
    className: "nav-menu"
  }, !isEmpty(items) && map(items, function (_ref2) {
    var id = _ref2.id,
        menuItemId = _ref2.menuItemId,
        r = _objectWithoutProperties(_ref2, ["id", "menuItemId"]);

    return React.createElement("li", {
      id: "menu-item-".concat(menuItemId),
      className: "menu-item menu-item-".concat(menuItemId, " ").concat(r.cssClasses.join(' ')),
      key: id
    }, React.createElement(MenuItem, Object.assign({
      id: id
    }, _objectSpread({}, r, {
      SubMenu: SubMenu,
      MenuItem: MenuItem
    }))));
  })));
};

menu.defaultProps = {
  items: [],
  horizontal: undefined
};
export default menu;