import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './attachment.module.scss';

/**
 * Attachment base stateless component
 * 
 * @param {object} props 
 */
const attachment = ({ src, className: added, alt, ...rest }) => {
  const className = classNames(
    styles.attachment,
    added,
  );

  return (src) ?
    (
      <img
        src={src}
        classNames={className}
        alt={alt}
        {...rest}
      />) :
    null;
}

attachment.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

attachment.defaultProps = {
  src: undefined,
  alt: 'image',
};

export default attachment;
