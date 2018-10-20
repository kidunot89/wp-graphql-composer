import _objectWithoutProperties from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import _regeneratorRuntime from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/regenerator";
import _asyncToGenerator from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _classCallCheck from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/createClass";
import React from 'react';
import { render, cleanup, waitForElement, fireEvent } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';
import v3 from 'uuid/v3';
import { Login, login, UserControls, userControls, LOGIN_MUTATION, VIEWER_QUERY } from 'user'; // test-utils.js

var LocalStorageMock =
/*#__PURE__*/
function () {
  function LocalStorageMock() {
    _classCallCheck(this, LocalStorageMock);

    this.store = {};
  }

  _createClass(LocalStorageMock, [{
    key: "clear",
    value: function clear() {
      this.store = {};
    }
  }, {
    key: "getItem",
    value: function getItem(key) {
      return this.store[key] || null;
    }
  }, {
    key: "setItem",
    value: function setItem(key, value) {
      this.store[key] = value.toString();
    }
  }, {
    key: "removeItem",
    value: function removeItem(key) {
      delete this.store[key];
    }
  }]);

  return LocalStorageMock;
}();

;
global.localStorage = new LocalStorageMock();
afterEach(function () {
  localStorage.clear();
  cleanup();
});
it("renders login form", function () {
  var Log = login;

  var _render = render(React.createElement(Log, {
    "data-testid": "test-login"
  })),
      getByTestId = _render.getByTestId;

  expect(getByTestId(/test-login/)).toBeTruthy();
});
it("renders user controls", function () {
  var User = userControls;

  var _render2 = render(React.createElement(User, {
    "data-testid": "test-controls"
  })),
      getByTestId = _render2.getByTestId;

  expect(getByTestId(/test-controls/)).toBeTruthy();
});
it("renders failed login",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee() {
  var mocks, _render3, getByTestId, getByText, getByPlaceholderText, form, userInput, passInput, errorMessage;

  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          mocks = [{
            request: {
              query: LOGIN_MUTATION,
              variables: {
                username: "invalid",
                password: "invalid",
                clientId: v3("invalidinvalid", v3.URL)
              }
            },
            result: {
              errors: [{
                message: "invalid_username",
                category: "user",
                locations: [{
                  line: 2,
                  column: 3
                }],
                path: ["login"]
              }],
              data: {
                login: null
              }
            }
          }];
          _render3 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            addTypename: false
          }, React.createElement(Login, {
            "data-testid": "test-login"
          }))), getByTestId = _render3.getByTestId, getByText = _render3.getByText, getByPlaceholderText = _render3.getByPlaceholderText;
          _context.next = 4;
          return waitForElement(function () {
            return getByTestId(/test-login/);
          });

        case 4:
          form = _context.sent;
          expect(form).toBeTruthy();
          userInput = getByPlaceholderText(/Username/);
          expect(userInput).toBeTruthy();
          passInput = getByPlaceholderText(/Password/);
          expect(passInput).toBeTruthy(); // Input login info

          fireEvent.change(userInput, {
            target: {
              value: "invalid"
            }
          });
          fireEvent.change(passInput, {
            target: {
              value: "invalid"
            }
          }); // Fire click event

          fireEvent.click(getByText(/Sign In/));
          _context.next = 15;
          return waitForElement(function () {
            return form.querySelector('.login-form-info');
          });

        case 15:
          errorMessage = _context.sent;
          expect(errorMessage.innerHTML).toMatch(/Invalid Login/);

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));
it("renders successful login action",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee2() {
  var mocks, _render4, getByTestId, getByText, getByPlaceholderText, container, form, userInput, passInput, controls, greeting, logoutButton;

  return _regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          mocks = [{
            request: {
              query: LOGIN_MUTATION,
              variables: {
                username: "your_login",
                password: "your_password",
                clientId: v3("your_passwordyour_login", v3.URL)
              }
            },
            result: {
              data: {
                login: {
                  authToken: 'some_id',
                  user: {
                    id: 'YCP1V9RWz',
                    nicename: 'ProxyWarrior'
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
          }];
          _render4 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            addTypename: false
          }, React.createElement(Login, {
            "data-testid": "test-login"
          }))), getByTestId = _render4.getByTestId, getByText = _render4.getByText, getByPlaceholderText = _render4.getByPlaceholderText, container = _render4.container;
          _context2.next = 4;
          return waitForElement(function () {
            return getByTestId(/test-login/);
          });

        case 4:
          form = _context2.sent;
          expect(form).toBeTruthy();
          userInput = getByPlaceholderText(/Username/);
          expect(userInput).toBeTruthy();
          passInput = getByPlaceholderText(/Password/);
          expect(passInput).toBeTruthy(); // Input login info

          fireEvent.change(userInput, {
            target: {
              value: "your_login"
            }
          });
          fireEvent.change(passInput, {
            target: {
              value: "your_password"
            }
          }); // Fire click event

          fireEvent.click(getByText(/Sign In/));
          _context2.next = 15;
          return waitForElement(function () {
            return container.querySelector('.user-controls');
          });

        case 15:
          controls = _context2.sent;
          expect(controls).toBeTruthy();
          greeting = getByText(/Welcome back/);
          expect(greeting).toBeTruthy();
          logoutButton = getByText(/Logout/);
          expect(logoutButton).toBeTruthy();

        case 21:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, this);
})));
it("renders successful login with custom templates",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee3() {
  var customUserControls, CustomLogin, mocks, _render5, getByTestId, getByPlaceholderText, container, form, userInput, passInput, controls, newForm, newUserInput, newPassInput;

  return _regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          customUserControls = userControls.compose({
            view: function view(_ref4) {
              var userId = _ref4.userId,
                  nicename = _ref4.nicename,
                  firstName = _ref4.firstName,
                  logout = _ref4.logout,
                  rest = _objectWithoutProperties(_ref4, ["userId", "nicename", "firstName", "logout"]);

              return React.createElement("div", Object.assign({}, rest, {
                "data-testid": "user-controls"
              }), React.createElement("button", {
                "data-testid": "logout-button",
                onClick: logout
              }, "Logout"));
            }
          });
          CustomLogin = login.compose({
            view: function view(_ref5) {
              var username = _ref5.username,
                  password = _ref5.password,
                  userFieldError = _ref5.userFieldError,
                  passFieldError = _ref5.passFieldError,
                  formError = _ref5.formError,
                  onChange = _ref5.onChange,
                  onSubmit = _ref5.onSubmit,
                  reset = _ref5.reset,
                  rest = _objectWithoutProperties(_ref5, ["username", "password", "userFieldError", "passFieldError", "formError", "onChange", "onSubmit", "reset"]);

              return React.createElement("form", Object.assign({
                className: "custom-login"
              }, rest, {
                onSubmit: onSubmit
              }), React.createElement("input", {
                type: "text",
                name: "username",
                value: username,
                onChange: onChange,
                placeholder: "Email"
              }), React.createElement("input", {
                type: "text",
                name: "password",
                value: password,
                onChange: onChange,
                placeholder: "Password"
              }), React.createElement("button", {
                "data-testid": "login-button",
                type: "submit"
              }, "Log In"));
            },
            userControlsView: customUserControls
          });
          mocks = [{
            request: {
              query: LOGIN_MUTATION,
              variables: {
                username: "your_login",
                password: "your_password",
                clientId: v3("your_passwordyour_login", v3.URL)
              }
            },
            result: {
              data: {
                login: {
                  authToken: 'some_id',
                  user: {
                    id: 'YCP1V9RWz',
                    nicename: 'ProxyWarrior'
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
          }];
          _render5 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            addTypename: false
          }, React.createElement(CustomLogin, {
            "data-testid": "custom-login"
          }))), getByTestId = _render5.getByTestId, getByPlaceholderText = _render5.getByPlaceholderText, container = _render5.container;
          _context3.next = 6;
          return waitForElement(function () {
            return getByTestId(/custom-login/);
          });

        case 6:
          form = _context3.sent;
          expect(form).toBeTruthy();
          userInput = getByPlaceholderText(/Email/);
          expect(userInput).toBeTruthy();
          passInput = getByPlaceholderText(/Password/);
          expect(passInput).toBeTruthy(); // Input login info

          fireEvent.change(userInput, {
            target: {
              value: "your_login"
            }
          });
          fireEvent.change(passInput, {
            target: {
              value: "your_password"
            }
          }); // Fire login event

          fireEvent.click(getByTestId(/login-button/)); // Confirm user controls

          _context3.next = 17;
          return waitForElement(function () {
            return getByTestId(/user-controls/);
          });

        case 17:
          controls = _context3.sent;
          expect(controls).toBeTruthy(); // Fire logout event

          fireEvent.click(getByTestId(/logout-button/)); // Confirm login form

          _context3.next = 22;
          return waitForElement(function () {
            return getByTestId(/custom-login/);
          });

        case 22:
          newForm = _context3.sent;
          expect(newForm).toBeTruthy();
          newUserInput = getByPlaceholderText(/Email/);
          expect(newUserInput).toBeTruthy();
          newPassInput = getByPlaceholderText(/Password/);
          expect(newPassInput).toBeTruthy();

        case 28:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3, this);
})));
it("renders user controls loading state", function () {
  localStorage.setItem('user-token', 'yes_sir_a_legit_token');

  var _render6 = render(React.createElement(MockedProvider, {
    mocks: [],
    addTypename: false
  }, React.createElement(Login, {
    "data-testid": "test-login"
  }))),
      getByText = _render6.getByText,
      getByTestId = _render6.getByTestId;

  var icon = getByTestId(/loading-icon/);
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === '').toBeFalsy();
  expect(getByText(/Loading\.\.\./)).toBeTruthy();
});
it("renders user controls error state",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee4() {
  var mocks, _render7, getByTestId, icon, message;

  return _regeneratorRuntime.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          localStorage.setItem('user-token', 'yes_sir_a_legit_token');
          mocks = [{
            request: {
              query: VIEWER_QUERY
            },
            error: {
              message: 'Logged in user not found'
            }
          }];
          _render7 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            addTypename: false
          }, React.createElement(Login, {
            "data-test-id": "test-user-controls"
          }))), getByTestId = _render7.getByTestId;
          _context4.next = 5;
          return waitForElement(function () {
            return getByTestId(/error-icon/);
          });

        case 5:
          icon = _context4.sent;
          expect(icon).toBeTruthy();
          expect(icon.innerHTML === '').toBeFalsy();
          message = getByTestId(/error-message/);
          expect(message).toBeTruthy();
          expect(message.innerHTML === '').toBeFalsy();

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee4, this);
})));