import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, map } from 'lodash';

const menu = ({ slug, items, MenuItem, ...rest }) => {
  return (
    <div id={`menu-${slug}`} {...rest}>
      <ul>
        { !isEmpty(items) &&
          map(items, ({ id, ...r }) => (<li key={`menu-item-${id}`}><MenuItem id={id} {...r} /></li>))
        }
      </ul>
    </div>
  )
};

menu.propTypes = {
  slug: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})),
  MenuItem: PropTypes.func,
}

menu.defaultProps = {
  items: [],
  MenuItem: () => null,
};

export default menu;