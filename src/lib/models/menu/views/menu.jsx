import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, map, omit } from 'lodash';

import { compileClassName } from 'lib/helpers';

const menu = ({ slug, items, itemView: MenuItem, ...rest }) => {
  const className = compileClassName(rest, 'composer-menu', 'horizontal');
  return (
    <div id={`menu-${slug}`} {...omit(rest, 'horizontal')} className={className}>
      <ul>
        { !isEmpty(items) &&
          map(items, ({ id, ...r }) => (<li className="composer-menu-item" key={`menu-item-${id}`}><MenuItem id={id} {...r} /></li>))
        }
      </ul>
    </div>
  );
};

menu.propTypes = {
  slug: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})),
  itemView: PropTypes.func,
  horizontal: PropTypes.bool,
  className: PropTypes.string,
}

menu.defaultProps = {
  items: [],
  itemView: () => null,
  horizontal: undefined,
  className: undefined,
};

export default menu;