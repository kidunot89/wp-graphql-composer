import _objectWithoutProperties from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import classNames from 'classnames';
import './post.global.scss';
import styles from './post.module.scss';

var page = function page(_ref) {
  var Container = _ref.as,
      pageId = _ref.pageId,
      title = _ref.title,
      content = _ref.content,
      date = _ref.date,
      modified = _ref.modified,
      added = _ref.className,
      rest = _objectWithoutProperties(_ref, ["as", "pageId", "title", "content", "date", "modified", "className"]);

  var className = classNames(styles.page, added);
  return React.createElement(Container, Object.assign({
    id: "page-".concat(pageId),
    className: className
  }, rest), React.createElement("div", {
    className: "entry-content"
  }, ReactHtmlParser(content)));
};

page.defaultProps = {
  title: undefined,
  content: '',
  className: undefined,
  as: 'article'
};
export default page;