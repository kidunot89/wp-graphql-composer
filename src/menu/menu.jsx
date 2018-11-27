// menu.jsx
/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { get, isEmpty, map } from 'lodash';

/**
 * Internal dependencies
 */
import { queryComposer } from '../composers'
import { Error, Loading } from '../utils';
import { MENU_WHERE_QUERY, MENU_QUERY } from './query';
import { MenuItem } from './menu-item';
import { SubMenu } from './sub-menu';
import { menuStateManager } from './state-manager';

/**
 * SCSS Module
 */
import styles from './menu.module.scss';

/**
 * Menu view component
 * 
 * @param {object} props
 * 
 * @returns {React.Component} 
 */
const menu = ({ as: Element, className: addedCN, slug, items, SubMenu, MenuItem, ...rest }) => {
  const className = classNames(styles.menu, addedCN);
  
  return (
    <Element id={`menu-${slug}`} className={className} {...rest}>
      { !isEmpty(items) &&
        map(items, ({ id, menuItemId, cssClasses, ...r }) => {
          const itemClassName = classNames(
            styles.item,
            ...cssClasses,
            `menu-item-${menuItemId}`,
          );

          return (
            <li
              id={`menu-item-${menuItemId}`}
              className={itemClassName}
              key={id}
            >
              <MenuItem id={id} {...{...r, SubMenu, MenuItem }} />
            </li>
          );
        })
      }
    </Element>
  );
};

menu.propTypes = {
  slug: PropTypes.string.isRequired,
  SubMenu: PropTypes.func.isRequired,
  MenuItem: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})),
  as: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  className: PropTypes.string,
}

menu.defaultProps = {
  items: [],
  as: 'ul',
  className: undefined,
};

/**
 * Creates composer for menu component
 */
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
    mapper: ({ data, ...rest }) => ({ 
      homeUrl: get(data, 'generalSettings.url'),
      menu: get(data, 'menus.nodes[0]'),
      ...rest
    }),
  }, {
    cond: ({ id }) => !!id,
    query: MENU_QUERY,
    config: {
      options: ({ id }) => ({ id }),
      skip: ({ optional, id }) => !id && optional 
    },
    mapper: ({ data, ...rest }) => ({
      homeUrl: get(data, 'generalSettings.url'),
      menu: get(data, 'menu'),
      ...rest
    }),
  }],
  extraHocs: [menuStateManager],
});

/**
 * Compose default Menu Component
 * @var {React.Component} Menu
 */
const Menu = menu.compose();

export { menu, Menu };