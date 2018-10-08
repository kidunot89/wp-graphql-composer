import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, map } from 'lodash';

const subMenu = ({ className, itemView: Item, items, ...rest }) => (
  <ul {...rest} className={`sub-menu ${className}`}>
    { !isEmpty(items) &&
      map(items, ({ id, ...rest }) => (<li className="composer-menu-item" key={id}><Item id={id} {...rest} /></li>))
    }
  </ul>
);

subMenu.propTypes = {
  itemView: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.shape({})),
};

subMenu.defaultProps = {
  itemView: () => null,
  items: [],
};

export default subMenu;