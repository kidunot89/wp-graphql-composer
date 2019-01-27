// main.jsx
/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { queryComposer } from '../composers';
import { Loading, Error } from '../utils';
import { Archive } from '../archives';
import { Page, Post } from '../post-type';
import wpRouting from './wp-routing';
import { mapLoopProps, router } from './router'; 
import { LOOP_QUERY } from './query';

/**
 * SCSS Module
 */
import styles from './main.module.scss';

/**
 * Main view component
 * 
 * @param {object} props
 * 
 * @returns {React.Component}
 */
const main = ({ Archive, children, className: added, Page, Post, Routes, topChildren, ...rest }) => {
  const className = classNames(
    styles.main,
    added,
  );
  return (
    <main role="main" className={className} {...rest}>
      {topChildren}
      <Routes archive={Archive} page={Page} post={Post} />
      {children}
    </main>
  );
};

main.propTypes = {
  Archive: PropTypes.func.isRequired,
  Page: PropTypes.func.isRequired,
  Post: PropTypes.func.isRequired,
  Routes: PropTypes.func.isRequired,
  className: PropTypes.string,
};

main.defaultProps = {
  className: undefined,
};

/**
 * Creates composer for main component
 */
main.compose = queryComposer({
  view: main,
  Archive,
  Page,
  Post,
  queries: [{ query: LOOP_QUERY, mapper: mapLoopProps }],
  whileLoading: { view: Loading },
  forError: { view: Error },
  extraHocs: [router(wpRouting)],
});

/**
 * Compose default Main Component
 * @var {React.Component} Main
 */
const Main = main.compose();

export { main, Main };