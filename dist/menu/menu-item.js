import _objectSpread from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectSpread";
import _objectWithoutProperties from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import React from 'react';
import { NavLink } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { MenuContext } from './context';
export var Link = function Link(_ref) {
  var url = _ref.url,
      children = _ref.children,
      homeUrl = _ref.homeUrl,
      rest = _objectWithoutProperties(_ref, ["url", "children", "homeUrl"]);

  if (!url || url === '#') return React.createElement("span", {
    className: "menu-item-text"
  }, children);
  if (url.startsWith(homeUrl)) return React.createElement(NavLink, Object.assign({
    exact: true,
    to: "".concat(url.substring(homeUrl.length))
  }, rest), children);
  return React.createElement("a", Object.assign({
    href: url
  }, rest), children);
};

var menuItem = function menuItem(_ref2) {
  var url = _ref2.url,
      label = _ref2.label,
      items = _ref2.items,
      description = _ref2.description,
      cssClasses = _ref2.cssClasses,
      SubMenu = _ref2.SubMenu,
      MenuItem = _ref2.MenuItem,
      rest = _objectWithoutProperties(_ref2, ["url", "label", "items", "description", "cssClasses", "SubMenu", "MenuItem"]);

  return React.createElement(React.Fragment, null, React.createElement(MenuContext.Consumer, null, function (_ref3) {
    var homeUrl = _ref3.homeUrl;
    return React.createElement(Link, _objectSpread({}, rest, {
      url: url,
      homeUrl: homeUrl
    }), label, description && React.createElement("div", {
      className: "menu-item-description"
    }, description));
  }), !isEmpty(items) && React.createElement(SubMenu, {
    items: items,
    SubMenu: SubMenu,
    MenuItem: MenuItem
  }));
};

menuItem.defaultProps = {
  url: undefined,
  label: undefined,
  items: []
};
export default menuItem;