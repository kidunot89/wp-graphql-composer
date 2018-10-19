var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import { get, omit } from 'lodash';
import { setDisplayName, wrapDisplayName } from 'recompose';

var pageStateManager = function pageStateManager(BaseComponent) {
  var BaseFactory = React.createFactory(BaseComponent);

  var PageStateManager = function (_React$Component) {
    _inherits(PageStateManager, _React$Component);

    function PageStateManager() {
      _classCallCheck(this, PageStateManager);

      return _possibleConstructorReturn(this, (PageStateManager.__proto__ || Object.getPrototypeOf(PageStateManager)).apply(this, arguments));
    }

    _createClass(PageStateManager, [{
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        var _props = this.props,
            id = _props.id,
            pageId = _props.pageId,
            uri = _props.uri;

        if (prevProps.id !== id || prevProps.pageId !== pageId || prevProps.uri !== uri) {
          this.props.data.refetch();
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _props2 = this.props,
            _props2$data = _props2.data,
            page = _props2$data.page,
            pageBy = _props2$data.pageBy,
            rest = _objectWithoutProperties(_props2, ['data']);

        var newProps = Object.assign({}, page, pageBy, rest);

        return BaseFactory(newProps);
      }
    }]);

    return PageStateManager;
  }(React.Component);

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'pageStateManager'))(PageStateManager);
  }

  return PageStateManager;
};

export { pageStateManager };
var postStateManager = function postStateManager(BaseComponent) {
  var BaseFactory = React.createFactory(BaseComponent);

  var PostStateManager = function (_React$Component2) {
    _inherits(PostStateManager, _React$Component2);

    function PostStateManager() {
      _classCallCheck(this, PostStateManager);

      return _possibleConstructorReturn(this, (PostStateManager.__proto__ || Object.getPrototypeOf(PostStateManager)).apply(this, arguments));
    }

    _createClass(PostStateManager, [{
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        var _props3 = this.props,
            id = _props3.id,
            pageId = _props3.pageId,
            uri = _props3.uri,
            slug = _props3.slug;

        if (prevProps.id !== id || prevProps.pageId !== pageId || prevProps.uri !== uri || prevProps.slug !== slug) {
          this.props.data.refetch();
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _props4 = this.props,
            data = _props4.data,
            rest = _objectWithoutProperties(_props4, ['data']);

        var post = get(data, 'post') || get(data, 'postBy');
        var featured = get(post, 'featuredImage.mediaItemId');
        var details = {
          author: get(post, 'author'),
          categories: get(post, 'categories.nodes'),
          date: get(post, 'date'),
          modified: get(post, 'modified'),
          tags: get(post, 'tags.nodes')
        };

        var newProps = Object.assign({
          details: details,
          featured: featured
        }, omit(post, ['author', 'categories', 'featuredImage', 'tags', 'date', 'modified']), rest);

        return BaseFactory(newProps);
      }
    }]);

    return PostStateManager;
  }(React.Component);

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'postStateManager'))(PostStateManager);
  }

  return PostStateManager;
};
export { postStateManager };