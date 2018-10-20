import _objectWithoutProperties from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import React from 'react';
import './main.scss';

var main = function main(_ref) {
  var Archive = _ref.Archive,
      children = _ref.children,
      className = _ref.className,
      Page = _ref.Page,
      Post = _ref.Post,
      Routes = _ref.Routes,
      rest = _objectWithoutProperties(_ref, ["Archive", "children", "className", "Page", "Post", "Routes"]);

  return React.createElement("main", Object.assign({
    role: "main",
    className: "site-main".concat(className ? ' ' + className : '')
  }, rest), React.createElement(Routes, {
    Archive: Archive,
    Page: Page,
    Post: Post
  }), children);
};

main.defaultProps = {
  className: undefined
};
export default main;