function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import { get, omit } from 'lodash';
import { compose, mapProps } from 'recompose';
import { graphql } from 'react-apollo';

import { whileLoading, forError, composeQuery, Error, Loading } from 'lib';

import { MENU_WHERE_QUERY, MENU_QUERY, MENU_ITEM_QUERY } from './query';
import menu from './views/menu';
import menuItem from './views/menu-item';
import subMenu from './views/sub-menu';

subMenu.compose = function () {
  var template = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : subMenu;
  var itemTemplate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : menuItem;
  var loading = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Loading;
  var error = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Error;
  return compose(whileLoading(loading), forError(error), mapProps(function (props) {
    return Object.assign({ Item: itemTemplate }, props);
  }))(template);
};

var SubMenu = subMenu.compose();

menuItem.compose = function () {
  var template = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : menuItem;
  var subMenuTemplate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SubMenu;
  var loading = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Loading;
  var error = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Error;
  return compose(graphql(MENU_ITEM_QUERY, {
    options: function options(_ref) {
      var id = _ref.id;
      return { id: id };
    },
    skip: function skip(_ref2) {
      var noSubMenu = _ref2.noSubMenu;
      return !!noSubMenu;
    }
  }), whileLoading(loading), forError(error, 'query'), mapProps(function (_ref3) {
    var data = _ref3.data,
        rest = _objectWithoutProperties(_ref3, ['data']);

    var items = get(data, 'menuItem.childItems.nodes');
    return Object.assign({ items: items, SubMenu: subMenuTemplate }, omit(rest, 'id'));
  }))(template);
};

var MenuItem = menuItem.compose();

menu.compose = function () {
  var template = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : menu;
  var itemTemplate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : MenuItem;
  var loading = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Loading;
  var error = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Error;
  return compose(composeQuery([{
    cond: function cond(_ref4) {
      var menuId = _ref4.menuId,
          location = _ref4.location,
          slug = _ref4.slug;
      return !!menuId || !!location || !!slug;
    },
    query: MENU_WHERE_QUERY,
    config: {
      options: function options(_ref5) {
        var menuId = _ref5.menuId,
            location = _ref5.location,
            slug = _ref5.slug;
        return { menuId: menuId, location: location, slug: slug };
      },
      skip: function skip(_ref6) {
        var optional = _ref6.optional,
            location = _ref6.location,
            menuId = _ref6.menuId,
            slug = _ref6.slug;
        return !location && !menuId && !slug && optional;
      }
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
        return { id: id };
      },
      skip: function skip(_ref9) {
        var optional = _ref9.optional,
            id = _ref9.id;
        return !id && optional;
      }
    }
  }]), whileLoading(loading), forError(error, 'query'), mapProps(function (_ref10) {
    var data = _ref10.data,
        rest = _objectWithoutProperties(_ref10, ['data']);

    var menu = get(data, 'menu') || get(data, 'menus.nodes[0]');
    var items = get(menu, 'menuItems.nodes');
    return Object.assign({
      items: items
    }, omit(menu, 'id', 'menuItems'), {
      MenuItem: itemTemplate
    }, omit(rest, 'id'));
  }))(template);
};

var Menu = menu.compose();

export { Menu, menu, MenuItem, menuItem, SubMenu, subMenu, MENU_WHERE_QUERY, MENU_QUERY, MENU_ITEM_QUERY };