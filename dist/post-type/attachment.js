import _objectWithoutProperties from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import React from 'react';
import './attachment.scss';
/**
 * Attachment base stateless component
 * 
 * @param {object} props 
 */

var attachment = function attachment(_ref) {
  var src = _ref.src,
      alt = _ref.alt,
      rest = _objectWithoutProperties(_ref, ["src", "alt"]);

  return src ? React.createElement("img", Object.assign({
    src: src,
    alt: alt
  }, rest)) : null;
};

attachment.defaultProps = {
  src: undefined,
  alt: 'image'
};
export default attachment;