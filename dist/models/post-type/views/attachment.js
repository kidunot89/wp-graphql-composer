function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Attachment base stateless component
 * 
 * @param {object} props 
 */
var attachment = function attachment(_ref) {
  var src = _ref.src,
      alt = _ref.alt,
      rest = _objectWithoutProperties(_ref, ['src', 'alt']);

  return src ? React.createElement('img', Object.assign({ src: src, alt: alt }, rest)) : null;
};

attachment.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string
};

attachment.defaultProps = {
  src: undefined,
  alt: 'image'
};

export default attachment;