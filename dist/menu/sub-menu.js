var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';

var subMenu = function (_React$Component) {
  _inherits(subMenu, _React$Component);

  function subMenu(props) {
    _classCallCheck(this, subMenu);

    var _this = _possibleConstructorReturn(this, (subMenu.__proto__ || Object.getPrototypeOf(subMenu)).call(this, props));

    _this.toggle = _this.toggle.bind(_this);
    _this.state = { isCollapsed: true };
    return _this;
  }

  _createClass(subMenu, [{
    key: 'toggle',
    value: function toggle() {
      this.setState({ isCollapsed: !this.state.isCollapsed });
    }
  }, {
    key: 'render',
    value: function render() {
      var isCollapsed = this.state.isCollapsed;

      var collapse = isCollapsed ? '' : ' toggle-on';

      var _props = this.props,
          MenuItem = _props.MenuItem,
          SubMenu = _props.SubMenu,
          items = _props.items,
          rest = _objectWithoutProperties(_props, ['MenuItem', 'SubMenu', 'items']);

      return React.createElement(
        React.Fragment,
        null,
        React.createElement(
          'button',
          {
            className: 'dropdown-toggle' + collapse,
            'aria-expanded': isCollapsed,
            onClick: this.toggle
          },
          React.createElement('span', { className: 'icon-arrow-up' })
        ),
        React.createElement(
          'ul',
          Object.assign({ className: 'sub-menu' + collapse }, rest),
          map(items, function (_ref) {
            var id = _ref.id,
                menuItemId = _ref.menuItemId,
                r = _objectWithoutProperties(_ref, ['id', 'menuItemId']);

            return React.createElement(
              'li',
              {
                id: 'menu-item-' + menuItemId,
                className: 'menu-item menu-item-' + menuItemId + ' ' + r.cssClasses.join(' '),
                key: id
              },
              React.createElement(MenuItem, Object.assign({ id: id }, Object.assign({}, r, { MenuItem: MenuItem, SubMenu: SubMenu })))
            );
          })
        )
      );
    }
  }]);

  return subMenu;
}(React.Component);

subMenu.propTypes = {
  SubMenu: PropTypes.func.isRequired,
  MenuItem: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({}))
};

subMenu.defaultProps = {
  items: []
};

export default subMenu;