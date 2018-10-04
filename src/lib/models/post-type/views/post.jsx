import React from 'react'
import PropTypes from 'prop-types';
import { Parser as ReactParser } from 'html-to-react';

const parser = new ReactParser();
const post = ({ featured, postId, title, content, details, DetailsComponent, ...rest }) => (
  <article id={`post-${postId}`} {...rest}>
    {parser.parse(content)}
  </article>
);

post.propTypes = {
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
  })
};

post.defaultProps = {
  featured: undefined,
  title: undefined,
  content: undefined,
  details: undefined, 
};

export default post;
