import React from 'react'
import PropTypes from 'prop-types';

import './attachment.scss';

/**
 * Attachment base stateless component
 * 
 * @param {object} props 
 */
const attachment = ({ src, alt, ...rest }) => (src) ?
  (<img src={src} alt={alt} {...rest} />) :
  null;

attachment.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

attachment.defaultProps = {
  src: undefined,
  alt: 'image',
};

export default attachment;
