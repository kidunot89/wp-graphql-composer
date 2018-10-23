import _objectWithoutProperties from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import classNames from 'classnames';
import './post.global.scss';
import styles from './post.module.scss';

var post = function post(_ref) {
  var featured = _ref.featured,
      postId = _ref.postId,
      title = _ref.title,
      content = _ref.content,
      details = _ref.details,
      Attachment = _ref.Attachment,
      DetailsComponent = _ref.DetailsComponent,
      Container = _ref.as,
      added = _ref.className,
      rest = _objectWithoutProperties(_ref, ["featured", "postId", "title", "content", "details", "Attachment", "DetailsComponent", "as", "className"]);

  var className = classNames(styles.post, added);
  return React.createElement(Container, Object.assign({
    id: "post-".concat(postId),
    classNames: className
  }, rest), React.createElement(Attachment, {
    id: featured,
    "data-attachment-id": featured,
    className: "wp-post-image",
    fallback: true
  }), ReactHtmlParser(content), DetailsComponent && React.createElement(DetailsComponent, Object.assign({
    className: styles.details
  }, details)));
};

post.defaultProps = {
  featured: undefined,
  title: undefined,
  content: undefined,
  details: undefined,
  as: 'article'
};
export default post;