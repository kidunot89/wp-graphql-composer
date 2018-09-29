import React from 'react';
import PropTypes from 'prop-types';

var loading = function loading(_ref) {
  var icon = _ref.icon,
      message = _ref.message,
      _ref$progress = _ref.progress,
      total = _ref$progress.total,
      max = _ref$progress.max;

  return React.createElement(
    'div',
    { className: 'loading' },
    React.createElement(
      'div',
      { className: 'loading-icon', 'data-testid': 'loading-icon' },
      icon
    ),
    React.createElement(
      'div',
      { className: 'loading-message' },
      message
    )
  );
};

loading.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
  message: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  progress: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
    total: PropTypes.number
  })
};

loading.defaultProps = {
  icon: undefined,
  message: 'Loading...',
  progress: { min: 0, max: 0, total: 0 }
};

export default loading;