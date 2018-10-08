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
export const compileClassName = (props, root = '', ...classes) => {
  let className = root;
  
  each(classes, cN => {
    if(!!props[cN]) className = `${className} ${cN}`;
  });

  if(!!props.className) className = `${className} ${props.className}`;

  return className;
}