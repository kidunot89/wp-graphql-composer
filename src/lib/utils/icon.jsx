import React from 'react';
import PropTypes from 'prop-types';

import './icon.scss';

const icon = ({as: Element, name, size, className="" }) => (
  <Element className={`${size} material-icons ${className}`}>{name}</Element>
);

icon.propTypes = {
  name: PropTypes.string.isRequired,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  className: PropTypes.string,
  size: PropTypes.oneOf([
    'tiny', 'small', 'medium', 'large'
  ]),
};

icon.defaultProps = {
  as: 'i',
  className: undefined,
  size: 'small'
};

export default icon;
