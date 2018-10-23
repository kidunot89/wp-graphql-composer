import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './main.module.scss';

const main = ({ Archive, children, className: added, Page, Post, Routes, topChildren, ...rest }) => {
  const className = classNames(
    styles.main,
    added,
  );
  return (
    <main role="main" className={className} {...rest}>
      {topChildren}
      <Routes {...{ Archive, Page, Post }} />
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

export default main;