// user-controls.jsx
/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import { queryComposer } from '../composers';
import { Loading, Error } from '../utils';
import { VIEWER_QUERY } from './query';

/**
 * SCSS Module
 */
import './user-controls.scss';

/**
 * UserControls view component
 * 
 * @param {object} props
 * 
 * @returns {React.Component} 
 */
const userControls = ({ className, userId, nicename, firstName, logout, ...rest }) => (
  <div className={`user-controls${className ? ' '+className : ''}`} {...rest}>
    <div className="greeting">
      <h3>Welcome back, {' '} <strong>{nicename ? nicename : firstName}</strong>!</h3>
    </div>
    <div className="logout">
      <button onClick={logout}>Logout</button>
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

/**
 * Creates composer for userControls component
 */
userControls.compose = queryComposer({
  view: userControls,
  queries:[{ query: VIEWER_QUERY }],
  whileLoading: { view: Loading },
  forError: { view: Error },
  sharedMapper: ({ loggedIn, login, data, ...rest }) => {
    const userId = get(data, 'viewer.userId');
    const nicename = get(data, 'viewer.nicename');
    const firstName = get(data, 'viewer.firstName');

    return { userId, nicename, firstName, ...rest };
  },
});

/**
 * Compose default UserControls Component
 * @var {React.Component} UserControls
 */
const UserControls = userControls.compose();

export { userControls, UserControls };
