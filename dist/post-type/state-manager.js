import _objectSpread from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectSpread";
import _objectWithoutProperties from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import _classCallCheck from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/inherits";
import React from 'react';
import { get, omit } from 'lodash';
import { setDisplayName, wrapDisplayName } from 'recompose';
export var pageStateManager = function pageStateManager(BaseComponent) {
  var BaseFactory = React.createFactory(BaseComponent);

  var PageStateManager =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(PageStateManager, _React$Component);

    function PageStateManager() {
      _classCallCheck(this, PageStateManager);

      return _possibleConstructorReturn(this, _getPrototypeOf(PageStateManager).apply(this, arguments));
    }

    _createClass(PageStateManager, [{
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        var _this$props = this.props,
            id = _this$props.id,
            pageId = _this$props.pageId,
            uri = _this$props.uri;

        if (prevProps.id !== id || prevProps.pageId !== pageId || prevProps.uri !== uri) {
          this.props.data.refetch();
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props2 = this.props,
            _this$props2$data = _this$props2.data,
            page = _this$props2$data.page,
            pageBy = _this$props2$data.pageBy,
            rest = _objectWithoutProperties(_this$props2, ["data"]);

        var newProps = _objectSpread({}, page, pageBy, rest);

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
export var postStateManager = function postStateManager(BaseComponent) {
  var BaseFactory = React.createFactory(BaseComponent);

  var PostStateManager =
  /*#__PURE__*/
  function (_React$Component2) {
    _inherits(PostStateManager, _React$Component2);

    function PostStateManager() {
      _classCallCheck(this, PostStateManager);

      return _possibleConstructorReturn(this, _getPrototypeOf(PostStateManager).apply(this, arguments));
    }

    _createClass(PostStateManager, [{
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        var _this$props3 = this.props,
            id = _this$props3.id,
            pageId = _this$props3.pageId,
            uri = _this$props3.uri,
            slug = _this$props3.slug;

        if (prevProps.id !== id || prevProps.pageId !== pageId || prevProps.uri !== uri || prevProps.slug !== slug) {
          this.props.data.refetch();
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props4 = this.props,
            data = _this$props4.data,
            rest = _objectWithoutProperties(_this$props4, ["data"]);

        var post = get(data, 'post') || get(data, 'postBy');
        var featured = get(post, 'featuredImage.id');
        var details = {
          author: get(post, 'author'),
          categories: get(post, 'categories.nodes'),
          date: get(post, 'date'),
          modified: get(post, 'modified'),
          tags: get(post, 'tags.nodes')
        };

        var newProps = _objectSpread({
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