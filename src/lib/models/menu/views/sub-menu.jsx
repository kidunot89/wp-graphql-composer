import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, map } from 'lodash';

const subMenu = ({ Item, items, ...rest }) => (
  <ul {...rest}>
    { !isEmpty(items) &&
      map(items, ({ id, ...rest }) => (<li key={id}><Item id={id} {...rest} /></li>))
    }
  </ul>
);

subMenu.propTypes = {
  Item: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.shape({})),
};

subMenu.defaultProps = {
  Item: () => null,
  items: [],
};

export default subMenu;