import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './icon.module.scss';

const icon = ({
  as: Element, name, size, className: added,
  color, dark, light, inactive
}) => {
  const className = classNames(
    styles.icon,
    styles[size],
    { [styles.dark]: dark },
    { [styles.light]: light },
    { [styles.inactive]: inactive },
    added
  );
  
  const style = (color) ? (inactive) ?
    { color: `${color}30` } :
    { color } :
    undefined;
  return (
    <Element className={className} style={style}>{name}</Element>
  )};

icon.propTypes = {
  name: PropTypes.string,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  className: PropTypes.string,
  size: PropTypes.oneOf([
    'tiny', 'small', 'medium', 'large'
  ]),
  color: PropTypes.string,
  light: PropTypes.bool,
  dark: PropTypes.bool,
  inactive: PropTypes.bool,
};

icon.defaultProps = {
  name: undefined,
  as: 'i',
  className: undefined,
  size: 'small',
  color: undefined,
  light: undefined,
  dark: undefined,
  inactive: undefined
};

export default icon;
