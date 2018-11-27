// menu-item.jsx
/**
 * External dependencies
 */
import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { get, omit, isEmpty } from 'lodash';

/**
 * Internal dependencies
 */
import { MENU_ITEM_QUERY } from './query';
import { queryComposer } from '../composers'
import { Error, Loading } from '../utils';
import { MenuContext } from './context';

/**
 * SCSS Module
 */
import styles from './menu-item.module.scss';

/**
 * MenuItem Link component
 * 
 * @param {object} props
 * 
 * @returns {React.Component} 
 */
const Link = ({ url, children, homeUrl, ...rest }) => {
  if (!url || url === '#') return (
    <span className={styles.text}>
      {children}
    </span>
  );

  if (url.startsWith(homeUrl)) return (
    <NavLink className={styles.link} exact to={`${url.substring(homeUrl.length)}`} {...rest}>
      {children}
    </NavLink>
  );

  return (
    <a className={styles.link} href={url} {...rest}>
      {children}
    </a>
  );
} 

/**
 * MenuItem view component
 * 
 * @param {object} props
 * 
 * @returns {React.Component} 
 */
const menuItem = ({
  url, label, items, description,
  cssClasses, SubMenu, MenuItem,
  ...rest
}) => (
  <React.Fragment>
    <MenuContext.Consumer>
      {({ homeUrl }) => (
        <Link {...{ ...rest, url, homeUrl }}>
          {label}
          {description &&
            <div className={styles.description}>
              {description}
            </div>
          }
        </Link>
      )}
    </MenuContext.Consumer>
    {!isEmpty(items) && <SubMenu {...{ items, SubMenu, MenuItem }} />}
  </React.Fragment>
);

menuItem.propTypes = {
  SubMenu: PropTypes.func.isRequired,
  MenuItem: PropTypes.func.isRequired,
  url: PropTypes.string,
  label: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({})),
};

menuItem.defaultProps = {
  url: undefined,
  label: undefined,
  items: [],
};

/**
 * Creates composer for menuItem component
 */
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

/**
 * Compose default MenuItem Component
 * @var {React.Component} MenuItem
 */
const MenuItem = menuItem.compose();

export { menuItem, MenuItem, Link };
