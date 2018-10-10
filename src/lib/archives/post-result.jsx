import React from 'react'
import PropTypes from 'prop-types';

const postResult = ({
  id,
  postId,
  excerpt,
  title,
  date,
  modified,
  featuredImage,
  author,
  categories,
  tags,
  ...rest
}) => (
  <div className="result" {...rest}>
    
  </div>
);

postResult.propTypes = {
  id: PropTypes.string.isRequired,
  postId: PropTypes.number.isRequired,
  excerpt: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  modified: PropTypes.string,
  featuredImage: PropTypes.shape({}),
  author: PropTypes.shape({}),
  categories: PropTypes.shape({}),
  tags: PropTypes.shape({}),
};

postResult.defaultProps = {
  content: undefined,
  title: undefined,
  date: undefined,
  modified: undefined,
  featuredImage: undefined,
  author: undefined,
  categories: undefined,
  tags: undefined,
};

export default postResult;
