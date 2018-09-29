function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

var menuItem = function menuItem(_ref) {
  var url = _ref.url,
      label = _ref.label,
      items = _ref.items,
      SubMenu = _ref.SubMenu,
      rest = _objectWithoutProperties(_ref, ['url', 'label', 'items', 'SubMenu']);

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'a',
      Object.assign({ href: url }, rest),
      label
    ),
    !isEmpty(items) && React.createElement(SubMenu, { className: 'sub-menu', items: items })
  );
};

menuItem.propTypes = {
  url: PropTypes.string,
  label: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({})),
  SubMenu: PropTypes.func
};

menuItem.defaultProps = {
  url: undefined,
  label: undefined,
  items: [],
  SubMenu: function SubMenu() {
    return null;
  }
};

export default menuItem;