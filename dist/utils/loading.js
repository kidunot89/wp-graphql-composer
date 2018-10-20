import React from 'react';

var loading = function loading(_ref) {
  var icon = _ref.icon,
      message = _ref.message,
      _ref$progress = _ref.progress,
      total = _ref$progress.total,
      max = _ref$progress.max;
  return React.createElement("div", {
    className: "loading"
  }, React.createElement("div", {
    className: "loading-icon",
    "data-testid": "loading-icon"
  }, icon), React.createElement("div", {
    className: "loading-message"
  }, message));
};

loading.defaultProps = {
  icon: undefined,
  message: 'Loading...',
  progress: {
    min: 0,
    max: 0,
    total: 0
  }
};
export default loading;