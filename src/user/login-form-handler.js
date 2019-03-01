import React, { createFactory } from 'react';
import { omit, isEmpty } from 'lodash';
import { setDisplayName, wrapDisplayName } from 'recompose';
import v3 from 'uuid/v3';
import { VIEWER_QUERY } from './query';

export default () => (BaseComponent) => {
  const BaseFactory = createFactory(BaseComponent);

  class LoginFormHandler extends React.PureComponent {
    constructor(props) {
      super(props);
      this.reset = this.reset.bind(this);
      this.valid = this.valid.bind(this);
      this.printErrors = this.printErrors.bind(this);
      this.processResults = this.processResults.bind(this);
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.state = {};
    }

    componentWillMount() {
      this.reset();
    }
    
    valid() {
      const { username, password } = this.state.form;
      const errors = {};

      if (username.length < 1) errors.user = true;
      if (password.length < 1) errors.pass = true;
      if (!isEmpty(errors)) {
        this.setState({form: this.printErrors(errors)});
        return false;
      };

      this.setState({ form: { username, password } });
      return true;
    }

    printErrors({ user, pass }) {
      const formError = undefined
      const userFieldError = (user) ? 'You must enter a username': undefined;
      const passFieldError = (pass) ? 'You must enter a password': undefined;
      return Object.assign(this.state.form, { formError, userFieldError, passFieldError });
    }

    processResults(payload) {
      const { data: { login } } = payload;

      if (login && login.authToken) {
        this.props.login(login.authToken);
      }

    }

    onChange({ target: { name, value } }) {
      const form = Object.assign(this.state.form, { [name]: value });
      this.setState(form);
    }

    onSubmit(event) {
      event.preventDefault();
      const { mutate } = this.props;
      const { password, username } = this.state.form;

      // Validate
      if(!this.valid()) return;

      // Mutate
      mutate({ 
        variables: { clientId: v3(`${password}${username}`, v3.URL), username, password },
        refetchQueries: [{ query: VIEWER_QUERY }],
      })
        .then(payload => {
          this.processResults(payload)
        })
        .catch(err => {
          const form = Object.assign({ formError: 'Invalid Login' }, this.state.form)
          this.setState({ form });
        });
    }

    reset(event) {
      this.setState({ 
        form: {
          username: '',
          password: '',
        }
      });
    }

    render() {
      const { onChange, onSubmit } = this;
      const { form } = this.state;
      const newProps = {
        ...omit(this.props, [
          'login', 'logout', 'mutate', 'loggedIn',
          'data'
        ]),
        ...form,
        onChange,
        onSubmit,
      };

      return <BaseFactory {...newProps} />;
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'loginFormHandler'))(LoginFormHandler)
  }

  return LoginFormHandler;
}