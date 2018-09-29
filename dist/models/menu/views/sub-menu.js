function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, map } from 'lodash';

var subMenu = function subMenu(_ref) {
  var Item = _ref.Item,
      items = _ref.items,
      rest = _objectWithoutProperties(_ref, ['Item', 'items']);

  return React.createElement(
    'ul',
    rest,
    !isEmpty(items) && map(items, function (_ref2) {
      var id = _ref2.id,
          rest = _objectWithoutProperties(_ref2, ['id']);

      return React.createElement(
        'li',
        { key: id },
        React.createElement(Item, Object.assign({ id: id }, rest))
      );
    })
  );
};

subMenu.propTypes = {
  Item: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.shape({}))
};

subMenu.defaultProps = {
  Item: function Item() {
    return null;
  },
  items: []
};

export default subMenu;