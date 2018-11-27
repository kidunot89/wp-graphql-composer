import React, { createFactory } from 'react';
import { omit } from 'lodash';
import { setDisplayName, wrapDisplayName } from 'recompose';

export default () => (BaseComponent) => {
  const BaseFactory = createFactory(BaseComponent);

  class UserStatusHandler extends React.Component {
    constructor(props) {
      super(props);
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
      this.returningUser = this.returningUser.bind(this);
      this.state = {
        loggedIn: false
      }
    }

    componentWillMount() {
      this.returningUser();
    }

    returningUser() {
      const loggedIn = localStorage.getItem('user-token');
      if (loggedIn) this.setState({ loggedIn });
    }

    login(loggedIn) {
      localStorage.setItem('user-token', loggedIn);
      this.setState({ loggedIn });
    }

    logout() {
      new Promise((resolve) =>{
        this.setState({ loggedIn: false }, () => {
          localStorage.removeItem('user-token');
          resolve();
        });
      }).then(() => this.props.client.resetStore());
    }

    render() {
      const { login, logout } = this;
      
      return BaseFactory({
        ...omit(this.props, ['client']),
        ...this.state,
        login,
        logout,
      })
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'userStatusHandler'))(UserStatusHandler)
  }

  return UserStatusHandler;
}