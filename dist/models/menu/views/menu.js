function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, map } from 'lodash';

var menu = function menu(_ref) {
  var slug = _ref.slug,
      items = _ref.items,
      MenuItem = _ref.MenuItem,
      rest = _objectWithoutProperties(_ref, ['slug', 'items', 'MenuItem']);

  return React.createElement(
    'div',
    Object.assign({ id: 'menu-' + slug }, rest),
    React.createElement(
      'ul',
      null,
      !isEmpty(items) && map(items, function (_ref2) {
        var id = _ref2.id,
            r = _objectWithoutProperties(_ref2, ['id']);

        return React.createElement(
          'li',
          { key: 'menu-item-' + id },
          React.createElement(MenuItem, Object.assign({ id: id }, r))
        );
      })
    )
  );
};

menu.propTypes = {
  slug: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})),
  MenuItem: PropTypes.func
};

menu.defaultProps = {
  items: [],
  MenuItem: function MenuItem() {
    return null;
  }
};

export default menu;