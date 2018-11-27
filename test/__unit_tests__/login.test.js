import React from 'react';
import { render, cleanup, waitForElement, fireEvent } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';
import v3 from 'uuid/v3';

import { Login, login, UserControls, userControls, LOGIN_MUTATION, VIEWER_QUERY } from '../../dist';

// test-utils.js
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
};

global.localStorage = new LocalStorageMock();

afterEach(() => {
  localStorage.clear();
  cleanup();
});

it(`renders login form`, () => {
  const Log = login;
  const { getByTestId } = render(<Log data-testid="test-login" />)

  expect(getByTestId(/test-login/)).toBeTruthy();
});

it(`renders user controls`, () => {
  const User = userControls;
  const { getByTestId } = render(<User data-testid="test-controls" />)

  expect(getByTestId(/test-controls/)).toBeTruthy();
});

it(`renders failed login`, async () => {
  const mocks = [
    {
      request: {
        query: LOGIN_MUTATION,
        variables: {
          username: "invalid",
          password: "invalid",
          clientId: v3("invalidinvalid", v3.URL),
        }
      },
      result: {
        errors: [
          {
            message: "invalid_username",
            category: "user",
            locations: [{ line: 2, column: 3 }],
            path: ["login"]
          }
        ],
        data: { login: null }
      }
    }
  ];

  const { getByTestId, getByText, getByPlaceholderText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Login data-testid="test-login" />
    </MockedProvider>
  );

  const form = await waitForElement(() => getByTestId(/test-login/));
  expect(form).toBeTruthy();

  const userInput = getByPlaceholderText(/Username/);
  expect(userInput).toBeTruthy();
  const passInput = getByPlaceholderText(/Password/);
  expect(passInput).toBeTruthy();
  
  // Input login info
  fireEvent.change(userInput, { target: { value: "invalid" } });
  fireEvent.change(passInput, { target: { value: "invalid" } });

  // Fire click event
  fireEvent.click(getByText(/Sign In/));

  const errorMessage = await waitForElement(() => form.querySelector('.login-form-info'));
  expect(errorMessage.innerHTML).toMatch(/Invalid Login/);
  
});

it(`renders successful login action`, async () => {
  const mocks = [
    {
      request: {
        query: LOGIN_MUTATION,
        variables: {
          username: "your_login",
          password: "your_password",
          clientId: v3("your_passwordyour_login", v3.URL),
        }
      },
      result: {
        data: {
          login: {
            authToken: 'some_id',
            user: {
              id: 'YCP1V9RWz',
              nicename: 'ProxyWarrior',
            }
          }
        }
      }
    }, {
      request: {
        query: VIEWER_QUERY
      },
      result: {
        data: {
          viewer: {
            id: 'YCP1V9RWz',
            userId: 1,
            nicename: 'ProxyWarrior',
            firstName: 'Dexter'
          }
        }
      }
    } 
  ];

  const { getByTestId, getByText, getByPlaceholderText, container } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Login data-testid="test-login" />
    </MockedProvider>
  );

  const form = await waitForElement(() => getByTestId(/test-login/));
  expect(form).toBeTruthy();

  const userInput = getByPlaceholderText(/Username/);
  expect(userInput).toBeTruthy();
  const passInput = getByPlaceholderText(/Password/);
  expect(passInput).toBeTruthy();
  
  // Input login info
  fireEvent.change(userInput, { target: { value: "your_login" } });
  fireEvent.change(passInput, { target: { value: "your_password" } });

  // Fire click event
  fireEvent.click(getByText(/Sign In/));

  const controls = await waitForElement(() => container.querySelector('.user-controls'));
  expect(controls).toBeTruthy();

  const greeting = getByText(/Welcome back/);
  expect(greeting).toBeTruthy();
  const logoutButton = getByText(/Logout/);
  expect(logoutButton).toBeTruthy();
});

it(`renders successful login with custom templates`, async () => {
  const customUserControls = userControls.compose({
    view: ({ userId, nicename, firstName, logout, ...rest }) => (
      <div {...rest} data-testid="user-controls">
        <button
          data-testid="logout-button"
          onClick={logout}
        >Logout</button>
      </div>
    )
  });

  const CustomLogin = login.compose({
    view: ({
      username, password, userFieldError, passFieldError,
      formError, onChange, onSubmit, reset,
      ...rest,
    }) => (
      <form className="custom-login" {...rest} onSubmit={onSubmit}>
        <input 
          type="text"
          name="username"
          value={username}
          onChange={onChange}
          placeholder="Email"
        />
        <input 
          type="text"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Password"
        />
        <button data-testid="login-button" type="submit">Log In</button>
      </form>
    ),
    userControlsView: customUserControls,
  });

  const mocks = [
    {
      request: {
        query: LOGIN_MUTATION,
        variables: {
          username: "your_login",
          password: "your_password",
          clientId: v3("your_passwordyour_login", v3.URL),
        }
      },
      result: {
        data: {
          login: {
            authToken: 'some_id',
            user: {
              id: 'YCP1V9RWz',
              nicename: 'ProxyWarrior',
            }
          }
        }
      }
    }, {
      request: {
        query: VIEWER_QUERY
      },
      result: {
        data: {
          viewer: {
            id: 'YCP1V9RWz',
            userId: '1',
            nicename: 'ProxyWarrior',
            firstName: 'Dexter'
          }
        }
      }
    } 
  ];

  const { getByTestId, getByPlaceholderText, container } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <CustomLogin data-testid="custom-login" />
    </MockedProvider>
  );

  const form = await waitForElement(() => getByTestId(/custom-login/));
  expect(form).toBeTruthy();

  const userInput = getByPlaceholderText(/Email/);
  expect(userInput).toBeTruthy();
  const passInput = getByPlaceholderText(/Password/);
  expect(passInput).toBeTruthy();
  
  // Input login info
  fireEvent.change(userInput, { target: { value: "your_login" } });
  fireEvent.change(passInput, { target: { value: "your_password" } });

  // Fire login event
  fireEvent.click(getByTestId(/login-button/));

  // Confirm user controls
  const controls = await waitForElement(() => getByTestId(/user-controls/));
  expect(controls).toBeTruthy();
  
  // Fire logout event
  fireEvent.click(getByTestId(/logout-button/));

  // Confirm login form
  const newForm = await waitForElement(() => getByTestId(/custom-login/));
  expect(newForm).toBeTruthy();

  const newUserInput = getByPlaceholderText(/Email/);
  expect(newUserInput).toBeTruthy();
  const newPassInput = getByPlaceholderText(/Password/);
  expect(newPassInput).toBeTruthy();
});

it(`renders user controls loading state`, () => {
  localStorage.setItem('user-token', 'yes_sir_a_legit_token');
  const { getByText, getByTestId } = render(
    <MockedProvider mocks={[]} addTypename={false}>
      <Login data-testid="test-login" />
    </MockedProvider>,
  );

  const icon = getByTestId(/loading-icon/);
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === '').toBeFalsy();
  expect(getByText(/Loading\.\.\./)).toBeTruthy();
});

it(`renders user controls error state`, async () => {
  localStorage.setItem('user-token', 'yes_sir_a_legit_token');
  const mocks = [{
    request: {
      query: VIEWER_QUERY,
    },
    error: {
      message: 'Logged in user not found'
    }
  }];

  const { getByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Login data-test-id="test-user-controls" />
    </MockedProvider>,
  );

  const icon = await waitForElement(() => getByTestId(/error-icon/));
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === '').toBeFalsy();
  const message = getByTestId(/error-message/);
  expect(message).toBeTruthy()
  expect(message.innerHTML === '').toBeFalsy();
});