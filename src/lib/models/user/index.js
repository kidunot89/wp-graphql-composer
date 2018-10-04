import { get } from 'lodash';
import {
  branch, compose,  mapProps, renderComponent,
} from 'recompose';
import { graphql, withApollo } from 'react-apollo';

import { whileLoading, forError, queryComposer } from 'lib/composers';
import { Loading, Error } from 'lib/utils';
import login from './views/login';
import { loginFormHandler, userStatusHandler } from './controllers';
import userControls from './views/user-controls';
import { VIEWER_QUERY, LOGIN_MUTATION } from './query';

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
