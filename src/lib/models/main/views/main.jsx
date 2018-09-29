import React from 'react';
import PropTypes from 'prop-types';

const main = ({ className, routes, children, ...rest }) => (
  <div className={`main${className ? ' '+className : ''}`} {...rest}>
    {routes}
    {children}
  </div>
);

main.propTypes = {
  className: PropTypes.string,
  routes: PropTypes.shape({}).isRequired,
};

main.defaultProps = {
  className: undefined,
};

export default main