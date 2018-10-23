import React from 'react'
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import classNames from 'classnames';

import './post.global.scss';
import styles from './post.module.scss';

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
      classNames={className}
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

export default post;
