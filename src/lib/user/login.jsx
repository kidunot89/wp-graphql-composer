import React from 'react';
import PropTypes from 'prop-types';

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

export default login;
