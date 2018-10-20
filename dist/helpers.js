/**
 * Helper functions for preparing prop/attribute values
 */
import { each, get } from 'lodash';
/**
 * Return compiled className prop
 * 
 * @param {object} props - component props 
 * @param {string} root - base class 
 * @param  {...string} classes - boolean props to be converted to class names
 */

export var compileClassName = function compileClassName(props) {
  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var className = root;

  for (var _len = arguments.length, classes = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    classes[_key - 2] = arguments[_key];
  }

  each(classes, function (cN) {
    if (typeof cN === 'object') {
      if (!!get(props, cN.name)) className = "".concat(className, " ").concat(cN.className);
    } else if (!!get(props, cN)) className = "".concat(className, " ").concat(cN);
  });
  if (!!props.className) className = "".concat(className, " ").concat(props.className);
  return className;
};