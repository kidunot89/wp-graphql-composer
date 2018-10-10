import { get, omit } from 'lodash';

import { baseComposer, queryComposer } from 'lib/composers'
import { Error, Loading } from 'lib/utils';

import { MENU_WHERE_QUERY, MENU_QUERY, MENU_ITEM_QUERY } from './query';
import menu from './views/menu';
import menuItem, { Link } from './views/menu-item';
import subMenu from './views/sub-menu'

subMenu.compose = baseComposer({
  view: subMenu,
  whileLoading: { view: Loading },
  forError: { view: Error },
  mapper: props => props,
});

const SubMenu = subMenu.compose({});

menuItem.compose = queryComposer({
  view: menuItem,
  whileLoading: { view: Loading },
  forError: { view: Error },
  queries: [{
    query: MENU_ITEM_QUERY,
    config: {
      options: ({ id }) => ({ id }),
      skip: ({ noSubMenu }) => !!noSubMenu,
    }
  }],
  sharedMapper: ({ data, ...rest, }) => {
    const items = get(data, 'menuItem.childItems.nodes');
    return { items, ...omit(rest, 'id') };
  },
});

const MenuItem = menuItem.compose({});

menu.compose = queryComposer({
  view: menu,
  MenuItem,
  SubMenu,
  whileLoading: { view: Loading },
  forError: { view: Error },
  queries: [{
    cond: ({ menuId, location, slug }) => !!menuId || !!location || !!slug,
    query: MENU_WHERE_QUERY,
    config: {
      options: ({ menuId, location, slug }) => ({ menuId, location, slug }),
      skip: ({ optional, location, menuId, slug }) => !location && !menuId && !slug && optional ,
    },
    mapper: ({ data, ...rest }) => ({ menu: get(data, 'menus.nodes[0]'), ...rest }),
  }, {
    cond: ({ id }) => !!id,
    query: MENU_QUERY,
    config: {
      options: ({ id }) => ({ id }),
      skip: ({ optional, id }) => !id && optional 
    },
    mapper: ({ data, ...rest }) => ({ menu: get(data, 'menu'), ...rest }),
  }],
  sharedMapper: ({ menu, ...rest }) => ({
    items: get(menu, 'menuItems.nodes'),
    ...omit(menu, 'id', 'menuItems'),
    ...omit(rest, 'id'),
  }),
});

const Menu = menu.compose({});

export {
  Menu, menu, MenuItem, menuItem,
  SubMenu, subMenu, Link,
  MENU_WHERE_QUERY, MENU_QUERY, MENU_ITEM_QUERY,
};

