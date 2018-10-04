import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, map } from 'lodash';

const menu = ({ className, slug, items, itemView: MenuItem, ...rest }) => (
  <div id={`menu-${slug}`} {...rest} className={`menu ${className}`}>
    <ul>
      { !isEmpty(items) &&
        map(items, ({ id, ...r }) => (<li className="menu-item" key={`menu-item-${id}`}><MenuItem id={id} {...r} /></li>))
      }
    </ul>
  </div>
);

menu.propTypes = {
  slug: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})),
  itemView: PropTypes.func,
}

menu.defaultProps = {
  items: [],
  itemView: () => null,
};

export default menu;