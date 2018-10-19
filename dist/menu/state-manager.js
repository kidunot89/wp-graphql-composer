var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import { get, omit } from 'lodash';
import { setDisplayName, wrapDisplayName } from 'recompose';
import { MenuContext, menuInitialState } from './context';

var menuStateManager = function menuStateManager(BaseComponent) {
  var BaseFactory = React.createFactory(BaseComponent);

  var MenuStateManager = function (_React$Component) {
    _inherits(MenuStateManager, _React$Component);

    function MenuStateManager(props) {
      _classCallCheck(this, MenuStateManager);

      var _this = _possibleConstructorReturn(this, (MenuStateManager.__proto__ || Object.getPrototypeOf(MenuStateManager)).call(this, props));

      _this.state = menuInitialState;
      return _this;
    }

    _createClass(MenuStateManager, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            menu = _props.menu,
            homeUrl = _props.homeUrl,
            rest = _objectWithoutProperties(_props, ['menu', 'homeUrl']);

        var newProps = Object.assign({
          items: get(menu, 'menuItems.nodes')
        }, omit(menu, 'id', 'menuItems'), omit(rest, 'id'));

        return React.createElement(
          MenuContext.Provider,
          { value: { homeUrl: homeUrl } },
          React.createElement(BaseFactory, newProps)
        );
      }
    }]);

    return MenuStateManager;
  }(React.Component);

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'menuStateManager'))(MenuStateManager);
  }

  return MenuStateManager;
};
export { menuStateManager };