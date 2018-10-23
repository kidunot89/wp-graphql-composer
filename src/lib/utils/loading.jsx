import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './loading.module.scss';

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
        <div className={styles.icon}>{icon}</div>
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

export default loading;
