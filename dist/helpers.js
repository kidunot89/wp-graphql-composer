var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
  for (var _len = arguments.length, classes = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    classes[_key - 2] = arguments[_key];
  }

  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var className = root;

  each(classes, function (cN) {
    if ((typeof cN === 'undefined' ? 'undefined' : _typeof(cN)) === 'object') {
      if (!!get(props, cN.name)) className = className + ' ' + cN.className;
    } else if (!!get(props, cN)) className = className + ' ' + cN;
  });

  if (!!props.className) className = className + ' ' + props.className;

  return className;
};