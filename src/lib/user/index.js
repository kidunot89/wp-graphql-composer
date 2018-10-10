import { get } from 'lodash';
import {
  branch, compose, renderComponent,
} from 'recompose';
import { graphql, withApollo } from 'react-apollo';

import { forError, queryComposer } from '../composers';
import { Loading, Error } from '../utils';

import { VIEWER_QUERY, LOGIN_MUTATION } from './query';

import loginFormHandler from './login-form-handler';
import userStatusHandler from './user-status-handler';

import login from './login';
import userControls from './user-controls';

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

const UserControls = userControls.compose({});

login.compose = ({
  view = login,
  userControlsView = UserControls,
  forError: error = { view: Error },
  loginCond = props => get(props, 'loggedIn'),
}) => 
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

const Login = login.compose({});

export { Login, login, UserControls, userControls, VIEWER_QUERY, LOGIN_MUTATION };
