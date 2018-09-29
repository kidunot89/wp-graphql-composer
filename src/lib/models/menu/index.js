import { get, omit } from 'lodash';
import { compose, mapProps } from 'recompose';
import { graphql } from 'react-apollo';

import { whileLoading, forError, composeQuery, Error, Loading } from 'lib';

import { MENU_WHERE_QUERY, MENU_QUERY, MENU_ITEM_QUERY } from './query';
import menu from './views/menu';
import menuItem from './views/menu-item';
import subMenu from './views/sub-menu'

subMenu.compose = (template = subMenu, itemTemplate = menuItem, loading = Loading, error = Error) =>
  compose(
    whileLoading(loading),
    forError(error),
    mapProps(props => {
      return { Item: itemTemplate, ...props };
    }),
  )(template)

const SubMenu = subMenu.compose();

menuItem.compose = (template = menuItem, subMenuTemplate = SubMenu, loading = Loading, error = Error) => compose(
  graphql(
    MENU_ITEM_QUERY,
    {
      options: ({ id }) => ({ id }),
      skip: ({ noSubMenu }) => !!noSubMenu,
    }
  ),
  whileLoading(loading),
  forError(error, 'query'),
  mapProps(({ data, ...rest, }) => {
    const items = get(data, 'menuItem.childItems.nodes');
    return { items, SubMenu: subMenuTemplate, ...omit(rest, 'id') };
  }),
)(template);

const MenuItem = menuItem.compose();

menu.compose = (template = menu, itemTemplate = MenuItem, loading = Loading, error = Error) => compose(
  composeQuery([
    {
      cond: ({ menuId, location, slug }) => !!menuId || !!location || !!slug,
      query: MENU_WHERE_QUERY,
      config: {
        options: ({ menuId, location, slug }) => ({ menuId, location, slug }),
        skip: ({ optional, location, menuId, slug }) => !location && !menuId && !slug && optional 
      }
    }, {
      cond: ({ id }) => !!id,
      query: MENU_QUERY,
      config: {
        options: ({ id }) => ({ id }),
        skip: ({ optional, id }) => !id && optional 
      }
    },
  ]),
  whileLoading(loading),
  forError(error, 'query'),
  mapProps(({ data, ...rest }) => {
    const menu = get(data, 'menu') || get(data, 'menus.nodes[0]');
    const items = get(menu, 'menuItems.nodes');
    return {
      items,
      ...omit(menu, 'id', 'menuItems'),
      MenuItem: itemTemplate,
      ...omit(rest, 'id')
    }
  }),
  )(template)

const Menu = menu.compose();

export {
  Menu, menu, MenuItem, menuItem,
  SubMenu, subMenu, MENU_WHERE_QUERY, MENU_QUERY,
  MENU_ITEM_QUERY,
};

