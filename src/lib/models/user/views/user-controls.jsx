import React from 'react';
import PropTypes from 'prop-types';

const userControls = ({ className, userId, nicename, firstName, logout, ...rest }) => (
  <div className={`user-controls${className ? ' '+className : ''}`} {...rest}>
    <div className="greeting">
      <h3>Welcome back, {' '} <strong>{nicename ? nicename : firstName}</strong>!</h3>
    </div>
    <div className="logout">
      <button
        className="logout-button"
        onClick={logout}
      >Logout</button>
    </div>
  </div>
);

userControls.propTypes = {
  userId: PropTypes.number,
  nicename: PropTypes.string,
  firstName: PropTypes.string,
  logout: PropTypes.func,
};

userControls.defaultProps = {
  userId: undefined,
  nicename: undefined,
  firstName: undefined,
  logout: undefined,
};

export default userControls
