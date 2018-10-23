import _objectSpread from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectSpread";
import _toConsumableArray from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/toConsumableArray";
import _objectWithoutProperties from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import React from 'react';
import classNames from 'classnames';
import { isEmpty, map } from 'lodash';
import styles from './menu.module.scss';

var menu = function menu(_ref) {
  var Element = _ref.as,
      addedCN = _ref.className,
      slug = _ref.slug,
      items = _ref.items,
      SubMenu = _ref.SubMenu,
      MenuItem = _ref.MenuItem,
      rest = _objectWithoutProperties(_ref, ["as", "className", "slug", "items", "SubMenu", "MenuItem"]);

  var className = classNames(styles.menu, addedCN);
  return React.createElement(Element, Object.assign({
    id: "menu-".concat(slug),
    className: className
  }, rest), !isEmpty(items) && map(items, function (_ref2) {
    var id = _ref2.id,
        menuItemId = _ref2.menuItemId,
        cssClasses = _ref2.cssClasses,
        r = _objectWithoutProperties(_ref2, ["id", "menuItemId", "cssClasses"]);

    var itemClassName = classNames.apply(void 0, [styles.item].concat(_toConsumableArray(cssClasses), ["menu-item-".concat(menuItemId)]));
    return React.createElement("li", {
      id: "menu-item-".concat(menuItemId),
      className: itemClassName,
      key: id
    }, React.createElement(MenuItem, Object.assign({
      id: id
    }, _objectSpread({}, r, {
      SubMenu: SubMenu,
      MenuItem: MenuItem
    }))));
  }));
};

menu.defaultProps = {
  items: [],
  as: 'ul',
  className: undefined
};
export default menu;