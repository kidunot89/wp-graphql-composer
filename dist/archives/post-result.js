function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { compileClassName } from '../helpers';

export var EntryMeta = function EntryMeta(_ref) {
  var author = _ref.author,
      categories = _ref.categories,
      tags = _ref.tags,
      date = _ref.date,
      modified = _ref.modified;

  return React.createElement(
    'div',
    { className: 'entry-footer' },
    React.createElement(
      'span',
      { className: 'posted-on' },
      React.createElement(
        'span',
        { className: 'screen-reader-text' },
        'Posted On'
      ),
      React.createElement(
        'time',
        { className: 'date', dateTime: date },
        moment(date).format('LLL')
      ),
      modified !== date && React.createElement(
        'time',
        { className: 'modified', dateTime: modified },
        'Last updated on: ',
        moment(modified).format('LLL')
      )
    ),
    React.createElement(
      'span',
      { className: 'byline' },
      React.createElement(
        'span',
        { className: 'screen-reader-text' },
        'Author'
      ),
      React.createElement(
        Link,
        { key: author.id, to: '/author/' + author.nicename },
        author.nicename
      )
    ),
    categories.length > 0 && React.createElement(
      'span',
      { className: 'cat-links' },
      React.createElement(
        'span',
        { className: 'screen-reader-text' },
        'Categories'
      ),
      map(categories, function (_ref2) {
        var id = _ref2.id,
            name = _ref2.name,
            slug = _ref2.slug;
        return React.createElement(
          Link,
          { key: id, to: '/category/' + slug },
          name
        );
      })
    ),
    tags.length > 0 && React.createElement(
      'span',
      { className: 'tags-links' },
      React.createElement(
        'span',
        { className: 'screen-reader-text' },
        'Tags'
      ),
      map(tags, function (_ref3) {
        var id = _ref3.id,
            name = _ref3.name,
            slug = _ref3.slug;
        return React.createElement(
          Link,
          { key: id, to: '/tag/' + slug },
          name
        );
      })
    )
  );
};

var postResult = function postResult(_ref4) {
  var Attachment = _ref4.Attachment,
      id = _ref4.id,
      postId = _ref4.postId,
      showContent = _ref4.showContent,
      excerpt = _ref4.excerpt,
      content = _ref4.content,
      title = _ref4.title,
      permalink = _ref4.permalink,
      featuredImage = _ref4.featuredImage,
      meta = _ref4.meta,
      rest = _objectWithoutProperties(_ref4, ['Attachment', 'id', 'postId', 'showContent', 'excerpt', 'content', 'title', 'permalink', 'featuredImage', 'meta']);

  var hasThumbnail = {
    name: 'featuredImage',
    className: 'has-post-thumbnail'
  };

  var className = compileClassName({ featuredImage: featuredImage, meta: meta }, 'post-' + postId + ' post type-post', hasThumbnail);

  return React.createElement(
    'article',
    Object.assign({
      id: 'post-' + postId,
      className: className
    }, rest),
    featuredImage && React.createElement(
      Link,
      { className: 'post-thumbnail', to: '/' + permalink },
      React.createElement(Attachment, {
        className: 'attachment-post-thumbnail',
        mediaItemId: featuredImage.mediaItemId,
        fallback: true
      })
    ),
    React.createElement(
      'div',
      { className: 'entry-content' },
      showContent ? ReactHtmlParser(content) : ReactHtmlParser(excerpt)
    ),
    React.createElement(EntryMeta, meta)
  );
};

postResult.propTypes = {
  Attachment: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  postId: PropTypes.number.isRequired,
  excerpt: PropTypes.string,
  title: PropTypes.string,
  featuredImage: PropTypes.shape({}),
  showContent: PropTypes.bool,
  meta: PropTypes.shape({
    author: PropTypes.shape({}),
    categories: PropTypes.arrayOf(PropTypes.shape({})),
    tags: PropTypes.arrayOf(PropTypes.shape({})),
    date: PropTypes.string,
    modified: PropTypes.string
  })
};

postResult.defaultProps = {
  content: undefined,
  title: undefined,
  featuredImage: undefined,
  showContent: true,
  meta: {}
};

export default postResult;