import _objectWithoutProperties from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import React from 'react';
import classNames from 'classnames';
import styles from './attachment.module.scss';
/**
 * Attachment base stateless component
 * 
 * @param {object} props 
 */

var attachment = function attachment(_ref) {
  var src = _ref.src,
      added = _ref.className,
      alt = _ref.alt,
      rest = _objectWithoutProperties(_ref, ["src", "className", "alt"]);

  var className = classNames(styles.attachment, added);
  return src ? React.createElement("img", Object.assign({
    src: src,
    classNames: className,
    alt: alt
  }, rest)) : null;
};

attachment.defaultProps = {
  src: undefined,
  alt: 'image'
};
export default attachment;