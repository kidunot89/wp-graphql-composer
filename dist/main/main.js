import _objectWithoutProperties from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import React from 'react';
import classNames from 'classnames';
import styles from './main.module.scss';

var main = function main(_ref) {
  var Archive = _ref.Archive,
      children = _ref.children,
      added = _ref.className,
      Page = _ref.Page,
      Post = _ref.Post,
      Routes = _ref.Routes,
      topChildren = _ref.topChildren,
      rest = _objectWithoutProperties(_ref, ["Archive", "children", "className", "Page", "Post", "Routes", "topChildren"]);

  var className = classNames(styles.main, added);
  return React.createElement("main", Object.assign({
    role: "main",
    className: className
  }, rest), topChildren, React.createElement(Routes, {
    Archive: Archive,
    Page: Page,
    Post: Post
  }), children);
};

main.defaultProps = {
  className: undefined
};
export default main;