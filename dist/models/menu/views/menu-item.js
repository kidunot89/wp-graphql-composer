function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

var Link = function Link(_ref) {
  var url = _ref.url,
      children = _ref.children,
      rest = _objectWithoutProperties(_ref, ['url', 'children']);

  if (url.startsWith('http')) return React.createElement(
    'a',
    Object.assign({ href: url }, rest),
    children
  );else return React.createElement(
    NavLink,
    Object.assign({ to: '/' + url }, rest),
    children
  );
};

export { Link };
var menuItem = function menuItem(_ref2) {
  var url = _ref2.url,
      label = _ref2.label,
      items = _ref2.items,
      description = _ref2.description,
      cssClasses = _ref2.cssClasses,
      SubMenu = _ref2.SubMenu,
      MenuItem = _ref2.MenuItem,
      rest = _objectWithoutProperties(_ref2, ['url', 'label', 'items', 'description', 'cssClasses', 'SubMenu', 'MenuItem']);

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      Link,
      Object.assign({}, rest, { url: url }),
      label,
      description && React.createElement(
        'div',
        { className: 'menu-item-description' },
        description
      )
    ),
    !isEmpty(items) && React.createElement(SubMenu, { items: items, SubMenu: SubMenu, MenuItem: MenuItem })
  );
};

menuItem.propTypes = {
  SubMenu: PropTypes.func.isRequired,
  MenuItem: PropTypes.func.isRequired,
  url: PropTypes.string,
  label: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({}))
};

menuItem.defaultProps = {
  url: undefined,
  label: undefined,
  items: []
};

export default menuItem;