import _objectWithoutProperties from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import './post.scss';

var page = function page(_ref) {
  var pageId = _ref.pageId,
      title = _ref.title,
      content = _ref.content,
      date = _ref.date,
      modified = _ref.modified,
      rest = _objectWithoutProperties(_ref, ["pageId", "title", "content", "date", "modified"]);

  return React.createElement("article", Object.assign({
    id: "page-".concat(title),
    className: "page type-page"
  }, rest), React.createElement("div", {
    className: "entry-content"
  }, ReactHtmlParser(content)));
};

page.defaultProps = {
  title: undefined,
  content: ''
};
export default page;