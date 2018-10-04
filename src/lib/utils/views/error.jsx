import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const error = ({ icon, message, type, ...rest }) => (
  <div className={`${type}-error`} {...rest}>
    <div className="error-icon" data-testid="error-icon">{icon}</div>
    <div className="error-message" data-testid="error-message">
      { Array.isArray(message) ?
        (<ul>{_.map(message, (item, i) => (<li key={`item-${i+2}`}>{item}</li>))}</ul>) : 
        message}    
    </div>
  </div>
);

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
