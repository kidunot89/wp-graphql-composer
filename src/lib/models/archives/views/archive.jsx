import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';

const archive = ({
  className,
  header,
  resultsData,
  postResultView: PostResult,
  pageResultView: PageResult,
  ...rest
}) => (
  <div className={`archive ${className}`} {...rest}>
    <h2 className="archive-header">{header}</h2>
    {map(resultsData, ({ id, ...r}) => (
      <PostResult {...r} id={id} key={id} />
    ))}
  </div>
);

archive.propTypes = {
  resultsData: PropTypes.arrayOf(PropTypes.shape({

  })),
  postResultView: PropTypes.func.isRequired,
  pageResultView: PropTypes.func,
  header: PropTypes.string,
}

archive.defaultProps = {
  resultsData: [],
  pageResultView: undefined,
  header: undefined,
}

export default archive;
