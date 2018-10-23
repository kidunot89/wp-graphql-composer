import React from 'react';
import classNames from 'classnames';
import styles from './loading.module.scss';

var loading = function loading(_ref) {
  var icon = _ref.icon,
      message = _ref.message,
      _ref$progress = _ref.progress,
      total = _ref$progress.total,
      max = _ref$progress.max;
  var className = classNames(styles.loading, styles.on);
  var percentage = total && max ? "".concat(Math.ceil(total / max), "%") : undefined;
  return React.createElement("div", {
    className: className
  }, React.createElement("div", {
    className: styles.content
  }, React.createElement("div", {
    className: styles.icon
  }, icon), React.createElement("div", {
    className: styles.message
  }, message, " ", percentage)));
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