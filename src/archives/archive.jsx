// archive.jsx
/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';

/**
 * Internal dependencies
 */
import { queryComposer } from '../composers';
import { Error, Loading } from '../utils';
import { Attachment } from '../post-type';
import { archiveMapper } from './archive-mapper';
import postResult from './post-result';
import { ARCHIVE_QUERY } from './query'

/**
 * SCSS Module
 */
import './archive.scss';

/**
 * Archives view component
 * 
 * @param {object} props
 * 
 * @returns {React.Component} 
 */
const archive = ({
  Attachment,
  PostResult,
  container,
  containerProps,
  header,
  noHeader,
  resultsData,
  ...rest
}) => {
  const Results = () => (
    <React.Fragment>
      { !noHeader && (
        <header className="page-header">
          <h1 className="page-title">{header}</h1>
        </header>
      )}
      {map(resultsData, ({ id, ...r}) => (
        <PostResult {...r} id={id} key={id} {...{ ...rest, Attachment }} />
      ))}
    </React.Fragment>
  );

  if (container === true) {
    return (
      <div {...containerProps }>
        <Results />
      </div>
    )
  } else if ( container ) {
    const Container = container;

    return (
      <Container {...containerProps }>
        <Results />
      </Container>
    );
  }

  return (<Results />);
};

archive.propTypes = {
  Attachment: PropTypes.func.isRequired,
  PostResult: PropTypes.func.isRequired,
  container: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.func]),
  containerProps: PropTypes.shape({}),
  noHeader: PropTypes.bool,
  header: PropTypes.string,
  resultsData: PropTypes.arrayOf(PropTypes.shape({})),
}

archive.defaultProps = {
  container: undefined,
  containerProps: {},
  noHeader: false,
  header: undefined,
  resultsData: [],
}

/**
 * Default where args for ARCHIVE_QUERY
 */
const whereArgsDefaults = {
  category: null,
  tag: null,
  year: null,
  month: null,
  day: null,
  author: null,
  search: null,
};

/**
 * Creates composer for archive component
 */
archive.compose = queryComposer({
  view: archive,
  PostResult: postResult,
  Attachment,
  queries: [{ 
    query: ARCHIVE_QUERY,
    config: {
      options: ({ first, where }) => ({ variables: { first, ...whereArgsDefaults, ...where } })
    }
  }],
  whileLoading: { view: Loading },
  forError: { view: Error },
  sharedMapper: archiveMapper,
});

/**
 * Compose default Archive Component
 * @var {React.Component} Archive
 */
const Archive = archive.compose();

export { archive, Archive };
