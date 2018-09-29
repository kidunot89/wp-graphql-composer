import { get } from 'lodash';
import {
  branch, compose,  mapProps, withHandlers,
  renderComponent
} from 'recompose';
import { graphql, withApollo } from 'react-apollo';

import { whileLoading, forError, Loading, Error } from 'lib';
import login from './views/login';
import { loginFormHandler, userStatusHandler } from './controllers';
import userControls from './views/user-controls';
import { VIEWER_QUERY, LOGIN_MUTATION } from './query';

/**
 * Composes user controls component
 * 
 * @param {React.Component} template - view layer of user controls
 * @param {React.Component} error - fallback component for handling errors
 * @param {React.Component} loading fallback component for handling loading state 
 */
userControls.compose = (template = userControls, error = Error, loading = Loading) =>
  compose(
    graphql(VIEWER_QUERY),
    whileLoading(loading),
    forError(error),
    mapProps(({ loggedIn, login, data, ...rest }) => {
      const userId = get(data, 'viewer.userId');
      const nicename = get(data, 'viewer.nicename');
      const firstName = get(data, 'viewer.firstName');

      return { userId, nicename, firstName, ...rest };
    }),
  )(template);

const UserControls = userControls.compose();

/**
 * Composes login component
 * 
 * @param {React.Component} template - view layer of login
 * @param {React.Component} userControlsTemplate - callback component for handling successful logins 
 */
login.compose = (template = login, userControlsTemplate = userControls.compose(), error = Error) => 
  compose(
    forError(error),
    withApollo,
    userStatusHandler(),
    branch(
      props => get(props, 'loggedIn'),
      renderComponent(userControlsTemplate),
    ),
    graphql(LOGIN_MUTATION),
    loginFormHandler(),
  )(template);

const Login = login.compose();

export { Login, login, UserControls, userControls, VIEWER_QUERY, LOGIN_MUTATION };
