function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import { get, omit } from 'lodash';

import { baseComposer, queryComposer } from '../composers';
import { Error, Loading } from '../utils';

import { MENU_WHERE_QUERY, MENU_QUERY, MENU_ITEM_QUERY } from './query';
import menu from './menu';
import menuItem, { Link } from './menu-item';
import subMenu from './sub-menu';

subMenu.compose = baseComposer({
  view: subMenu,
  whileLoading: { view: Loading },
  forError: { view: Error },
  mapper: function mapper(props) {
    return props;
  }
});

var SubMenu = subMenu.compose({});

menuItem.compose = queryComposer({
  view: menuItem,
  whileLoading: { view: Loading },
  forError: { view: Error },
  queries: [{
    query: MENU_ITEM_QUERY,
    config: {
      options: function options(_ref) {
        var id = _ref.id;
        return { id: id };
      },
      skip: function skip(_ref2) {
        var noSubMenu = _ref2.noSubMenu;
        return !!noSubMenu;
      }
    }
  }],
  sharedMapper: function sharedMapper(_ref3) {
    var data = _ref3.data,
        rest = _objectWithoutProperties(_ref3, ['data']);

    var items = get(data, 'menuItem.childItems.nodes');
    return Object.assign({ items: items }, omit(rest, 'id'));
  }
});

var MenuItem = menuItem.compose({});

menu.compose = queryComposer({
  view: menu,
  MenuItem: MenuItem,
  SubMenu: SubMenu,
  whileLoading: { view: Loading },
  forError: { view: Error },
  queries: [{
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
    },
    mapper: function mapper(_ref7) {
      var data = _ref7.data,
          rest = _objectWithoutProperties(_ref7, ['data']);

      return Object.assign({ menu: get(data, 'menus.nodes[0]') }, rest);
    }
  }, {
    cond: function cond(_ref8) {
      var id = _ref8.id;
      return !!id;
    },
    query: MENU_QUERY,
    config: {
      options: function options(_ref9) {
        var id = _ref9.id;
        return { id: id };
      },
      skip: function skip(_ref10) {
        var optional = _ref10.optional,
            id = _ref10.id;
        return !id && optional;
      }
    },
    mapper: function mapper(_ref11) {
      var data = _ref11.data,
          rest = _objectWithoutProperties(_ref11, ['data']);

      return Object.assign({ menu: get(data, 'menu') }, rest);
    }
  }],
  sharedMapper: function sharedMapper(_ref12) {
    var menu = _ref12.menu,
        rest = _objectWithoutProperties(_ref12, ['menu']);

    return Object.assign({
      items: get(menu, 'menuItems.nodes')
    }, omit(menu, 'id', 'menuItems'), omit(rest, 'id'));
  }
});

var Menu = menu.compose({});

export { Menu, menu, MenuItem, menuItem, SubMenu, subMenu, Link, MENU_WHERE_QUERY, MENU_QUERY, MENU_ITEM_QUERY };