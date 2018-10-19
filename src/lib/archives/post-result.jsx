import React from 'react'
import PropTypes from 'prop-types';
import { map } from 'lodash';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { compileClassName } from '../helpers';

export const EntryMeta = ({ author, categories, tags, date, modified }) => {
  return (
    <div className="entry-footer">
      <span className="posted-on">
        <span className="screen-reader-text">Posted On</span>
        <time className="date" dateTime={date}>
          {moment(date).format('LLL')}
        </time>
        { modified !== date && (
          <time className="modified" dateTime={modified}>
            Last updated on: {moment(modified).format('LLL')}
          </time>
        )}
      </span>
      <span className="byline">
        <span className="screen-reader-text">Author</span>
        <Link key={author.id} to={`/author/${author.nicename}`}>{author.nicename}</Link>
      </span>
      {categories.length > 0 && (
        <span className="cat-links">
          <span className="screen-reader-text">Categories</span>
          {map(categories, ({ id, name, slug }) => (
            <Link key={id} to={`/category/${slug}`}>{name}</Link>
          ))}
        </span>
      )}
      {tags.length > 0 && (
        <span className="tags-links">
          <span className="screen-reader-text">Tags</span>
          {map(tags, ({ id, name, slug }) => (
            <Link key={id} to={`/tag/${slug}`}>{name}</Link>
          ))}
        </span>
      )}
    </div>
  );
}

const postResult = ({
  Attachment,
  id,
  postId,
  showContent,
  excerpt,
  content,
  title,
  permalink,
  featuredImage,
  meta,
  ...rest
}) => {
  const hasThumbnail = {
    name: 'featuredImage',
    className: 'has-post-thumbnail'
  };

  const className = compileClassName(
    { featuredImage, meta },
    `post-${postId} post type-post`,
    hasThumbnail,
  );

  return (
    <article
      id={`post-${postId}`}
      className={className}
      {...rest}
    > 
      {featuredImage && (
        <Link className="post-thumbnail" to={`/${permalink}`}>
          <Attachment
            className="attachment-post-thumbnail"
            mediaItemId={featuredImage.mediaItemId}
            fallback
          />
        </Link>
      )}
      <div className="entry-content">
        {showContent ? ReactHtmlParser(content) : ReactHtmlParser(excerpt)}
      </div>
      <EntryMeta {...meta} />
    </article>
  )
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
    modified: PropTypes.string,
  }),
};

postResult.defaultProps = {
  content: undefined,
  title: undefined,
  featuredImage: undefined,
  showContent: true,
  meta: {},
};

export default postResult;
