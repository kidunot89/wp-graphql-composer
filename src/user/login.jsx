// login.jsx
/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { graphql, withApollo } from 'react-apollo';
import { branch, compose, renderComponent } from 'recompose';
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import { forError } from '../composers';
import { Error } from '../utils';
import { LOGIN_MUTATION } from './query';
import loginFormHandler from './login-form-handler';
import userStatusHandler from './user-status-handler';
import { UserControls } from './user-controls';

/**
 * SCSS Module
 */
import './login.scss';

/**
 * Login view component
 * 
 * @param {object} props
 * 
 * @returns { React.Component } 
 */
const login = ({
  username, password, userFieldError, passFieldError,
  formError, onChange, onSubmit, className, reset,
  ...rest
}) => (
  <form className={`login-form${className ? ' ' + className : ''} `} onSubmit={onSubmit} {...rest}>
    { formError && <legend className="login-form-info">{formError}</legend> }
    {/* Login */}
    <div className={`username-field${userFieldError ? ' error' : ''}`}>
      <input
        type="text"
        name="username"
        value={username}
        onChange={onChange}
        placeholder="Enter Username"
      />
      { userFieldError && <small className="field-info">{userFieldError}</small> }
    </div>
    {/* Password */}
    <div className={`password-field${passFieldError ? ' error' : ''}`}>
      <input
        type="password"
        name="password"
        value={password}
        onChange={onChange}
        placeholder="Enter Password"
      />
      { passFieldError && <small className="field-info">{passFieldError}</small> }
    </div>
    <button className="login-submit" type="submit">Sign In</button>
  </form>
);

login.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  userFieldError: PropTypes.string,
  passFieldError: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

login.defaultProps = {
  username: '',
  password: '',
  userFieldError: undefined,
  passFieldError: undefined,
  onChange: () => null,
  onSubmit: () => null,
};

/**
 * Creates composer for login component
 */
login.compose = ({
  view = login,
  userControlsView = UserControls,
  forError: error = { view: Error },
  loginCond = props => get(props, 'loggedIn'),
} = {}) => 
  compose(
    forError(error),
    withApollo,
    userStatusHandler(),
    branch(
      props => loginCond(props),
      renderComponent(userControlsView),
    ),
    graphql(LOGIN_MUTATION),
    loginFormHandler(),
  )(view);

/**
 * Compose default Login Component
 * @var {React.Component} Login
 */
const Login = login.compose();

export { login, Login };
