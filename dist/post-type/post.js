import _objectWithoutProperties from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import styles from './post.scss';

var post = function post(_ref) {
  var featured = _ref.featured,
      postId = _ref.postId,
      title = _ref.title,
      content = _ref.content,
      details = _ref.details,
      Attachment = _ref.Attachment,
      DetailsComponent = _ref.DetailsComponent,
      rest = _objectWithoutProperties(_ref, ["featured", "postId", "title", "content", "details", "Attachment", "DetailsComponent"]);

  return React.createElement("article", Object.assign({
    id: "post-".concat(postId),
    className: "post type-post"
  }, rest), React.createElement(Attachment, {
    id: featured,
    "data-attachment-id": featured,
    className: "wp-post-image",
    fallback: true
  }), ReactHtmlParser(content));
};

post.defaultProps = {
  featured: undefined,
  title: undefined,
  content: undefined,
  details: undefined
};
export default post;