import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, map, omit } from 'lodash';

import { compileClassName } from '../helpers';

import './menu.scss';

const menu = ({ slug, items, SubMenu, MenuItem, ...rest }) => {
  const className = compileClassName(rest, 'menu-container', 'horizontal');
  return (
    <div id={`menu-${slug}`} {...omit(rest, 'horizontal')} className={className}>
      <ul className="nav-menu">
        { !isEmpty(items) &&
          map(items, ({ id, menuItemId, ...r }) => (
            <li
              id={`menu-item-${menuItemId}`}
              className={`menu-item menu-item-${menuItemId} ${r.cssClasses.join(' ')}`}
              key={id}
            >
              <MenuItem id={id} {...{...r, SubMenu, MenuItem }} />
            </li>
          ))
        }
      </ul>
    </div>
  );
};

menu.propTypes = {
  slug: PropTypes.string.isRequired,
  SubMenu: PropTypes.func.isRequired,
  MenuItem: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})),
  horizontal: PropTypes.bool,
}

menu.defaultProps = {
  items: [],
  horizontal: undefined,
};

export default menu;