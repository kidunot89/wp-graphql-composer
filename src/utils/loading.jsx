// loading.jsx
/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { baseComposer } from '../composers';
import progressMapper from './process-loading';

/**
 * SCSS Module
 */
import styles from './loading.module.scss';

/**
 * Loading view component
 * 
 * @param {object} props
 * 
 * @returns {React.Component}
 */
const loading = ({ icon, message, progress: { total, max } }) => {
  const className = classNames(
    styles.loading,
    styles.on,
  );
  
  const percentage = (total && max) ?
    `${Math.ceil(total / max)}%` :
    undefined;
  return (
    <div className={className}>
      <div className={styles.content}>
        <div className={styles.icon} data-testid="loading-icon">{icon}</div>
        <div className={styles.message}>{message} {percentage}</div>
      </div>
    </div>
  )
}

loading.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.string,
  ]),
  message: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
  progress: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
    total: PropTypes.number,
  }),
};

loading.defaultProps = {
  icon: undefined,
  message: 'Loading...',
  progress: { min: 0, max: 0, total: 0 },
};

/**
 * Creates composer for loading component
 */
loading.compose = baseComposer({ view: loading, mapper: progressMapper });
const Loading = loading.compose();

export {
  loading,
  Loading,
  progressMapper
};
