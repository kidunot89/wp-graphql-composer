import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';

import styles from './error.module.scss';



const error = ({ icon, message, type, ...rest }) => {
  const className = classNames(
    styles.error,
    `${type}-error`,
    styles.on,
  );

  return (
    <div className={className} {...rest}>
      <div className={styles.content}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.message}>
          { Array.isArray(message) ?
            (<ul>{_.map(message, (item, i) => (<li key={`item-${i+2}`}>{item}</li>))}</ul>) : 
            message}    
        </div>
      </div>
    </div>
  );
}

error.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.string,
  ]),
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

error.defaultProps = {
  icon: undefined,
  message: 'Hold it, there has been a problem!'
};

export default error;
