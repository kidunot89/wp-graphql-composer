import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isEmpty, map } from 'lodash';

import styles from './menu.module.scss';

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

export default menu;