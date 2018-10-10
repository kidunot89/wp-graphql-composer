/**
 * Helper functions for preparing prop/attribute values
 */
import { each } from 'lodash';

/**
 * Return compiled className prop
 * 
 * @param {object} props - component props 
 * @param {string} root - base class 
 * @param  {...string} classes - boolean props to be converted to class names
 */
export var compileClassName = function compileClassName(props) {
  for (var _len = arguments.length, classes = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    classes[_key - 2] = arguments[_key];
  }

  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var className = root;

  each(classes, function (cN) {
    if (!!props[cN]) className = className + ' ' + cN;
  });

  if (!!props.className) className = className + ' ' + props.className;

  return className;
};