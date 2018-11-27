// post.jsx
/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { Error, Loading } from '../utils'; 
import { queryComposer } from '../composers';
import { Attachment } from './attachment';
import { POST_QUERY, POST_BY_QUERY } from './query';
import { postStateManager } from './state-manager';

/**
 * SCSS Module
 */
import './post.global.scss';
import styles from './post.module.scss';

/**
 * Post view component
 * 
 * @param {object} props
 * 
 * @returns {React.Component}
 */
const post = ({
  featured, postId, title, content,
  details, Attachment, DetailsComponent,
  as: Container, className: added, ...rest }) => {
  const className = classNames( 
    styles.post,
    added,
  );

  return (
    <Container
      id={`post-${postId}`}
      className={className}
      {...rest}
    >
      <Attachment
        id={featured}
        data-attachment-id={featured}
        className="wp-post-image"
        fallback
      />
      {ReactHtmlParser(content)}
      { DetailsComponent && <DetailsComponent className={styles.details} {...details} />}
    </Container>
  );
};

post.propTypes = {
  Attachment: PropTypes.func.isRequired,
  featured: PropTypes.number,
  postId: PropTypes.number.isRequired,
  title: PropTypes.string,
  content: PropTypes.string,
  details: PropTypes.shape({
    author: PropTypes.shape({}),
    date: PropTypes.string,
    modified: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.shape({})),
    categories: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

post.defaultProps = {
  featured: undefined,
  title: undefined,
  content: undefined,
  details: undefined,
  as: 'article',
};

/**
 * Creates composer for page component
 */
post.compose = queryComposer({
  view: post,
  Attachment,
  queries: [{
    cond: ({ postId, uri, slug }) => !!postId || !!uri || !!slug,
    query: POST_BY_QUERY,
    config: { options: ({ postId, uri, slug }) => ({ postId, uri, slug }) }
  }, {
    cond: ({ id }) => !!id,
    query: POST_QUERY,
    config: { options: ({ id }) => ({ id }) }
  }],
  whileLoading: { view: Loading },
  forError: { view: Error, type: '404-post' },
  extraHocs: [postStateManager],
});

/**
 * Compose default Post Component
 * @var {React.Component} Post
 */
const Post = post.compose();

export { post, Post };
