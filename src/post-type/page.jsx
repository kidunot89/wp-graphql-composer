// page.jsx
/**
 * External dependencies
 */
import React from 'react'
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { Error, Loading } from '../utils'; 
import { queryComposer } from '../composers';
import { PAGE_QUERY, PAGE_BY_QUERY } from './query';
import { pageStateManager } from './state-managers';

/**
 * SCSS Module
 */
import styles from './post.module.scss';
import './post.global.scss';

/**
 * Page view component
 * 
 * @param {object} props
 * 
 * @returns {React.Component} 
 */
const page = ({
  as: Container, pageId, title, content,
  date, modified, className: added, ...rest
}) => {
  const className = classNames(
    styles.page,
    added,
  );

  return (
    <Container
      id={`page-${pageId}`}
      className={className}
      {...rest}
    >
      <div className="entry-content">{ReactHtmlParser(content)}</div>
    </Container>
  );
}

page.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  className: PropTypes.string,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

page.defaultProps = {
  title: undefined,
  content: '',
  className: undefined,
  as: 'article', 
};

/**
 * Creates composer for page component
 */
page.compose = queryComposer({
  view: page,
  queries: [{
    cond: ({ pageId, uri }) => !!pageId || !!uri,
    query: PAGE_BY_QUERY,
    config: { options: ({ pageId, uri }) => ({ pageId, uri }) }
  }, {
    cond: ({ id }) => !!id,
    query: PAGE_QUERY,
    config: { options: ({ id }) => ({ id }) }
  }],
  whileLoading: { view: Loading },
  forError: { view: Error, type: '404-page' },
  extraHocs: [pageStateManager],
});

/**
 * Compose default Page Component
 * @var {React.Component} Page
 */
const Page = page.compose();

export { page, Page };
