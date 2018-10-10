function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, map, omit } from 'lodash';

import { compileClassName } from '../helpers';

var menu = function menu(_ref) {
  var slug = _ref.slug,
      items = _ref.items,
      SubMenu = _ref.SubMenu,
      MenuItem = _ref.MenuItem,
      rest = _objectWithoutProperties(_ref, ['slug', 'items', 'SubMenu', 'MenuItem']);

  var className = compileClassName(rest, 'menu-container', 'horizontal');
  return React.createElement(
    'div',
    Object.assign({ id: 'menu-' + slug }, omit(rest, 'horizontal'), { className: className }),
    React.createElement(
      'ul',
      { className: 'nav-menu' },
      !isEmpty(items) && map(items, function (_ref2) {
        var id = _ref2.id,
            menuItemId = _ref2.menuItemId,
            r = _objectWithoutProperties(_ref2, ['id', 'menuItemId']);

        return React.createElement(
          'li',
          {
            id: 'menu-item-' + menuItemId,
            className: 'menu-item menu-item-' + menuItemId + ' ' + r.cssClasses.join(' '),
            key: id
          },
          React.createElement(MenuItem, Object.assign({ id: id }, Object.assign({}, r, { SubMenu: SubMenu, MenuItem: MenuItem })))
        );
      })
    )
  );
};

menu.propTypes = {
  slug: PropTypes.string.isRequired,
  SubMenu: PropTypes.func.isRequired,
  MenuItem: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})),
  horizontal: PropTypes.bool
};

menu.defaultProps = {
  items: [],
  horizontal: undefined
};

export default menu;