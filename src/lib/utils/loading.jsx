import React from 'react';
import PropTypes from 'prop-types';

const loading = ({ icon, message, progress: { total, max } }) => {
  return (
    <div className="loading">
      <div className="loading-icon" data-testid="loading-icon">{icon}</div>
      <div className="loading-message">{message}</div>
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
