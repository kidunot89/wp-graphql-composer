import _objectSpread from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectSpread";
import _regeneratorRuntime from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/regenerator";
import _asyncToGenerator from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _objectWithoutProperties from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import _taggedTemplateLiteral from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral";

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\nquery QueryTwo($location: String!) {\n  test(location: $location){\n    testField\n    testField2\n  }\n}\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\nquery QueryOne($id: ID!) {\n  test(id: $id){\n    testField\n    testField2\n  }\n}\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  query TestQuery{\n    test{\n      testField\n      testField2\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import React from 'react';
import { get } from 'lodash';
import { render, cleanup, waitForElement, wait } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { mapProps, compose } from 'recompose';
import { whileLoading, forError, composeQuery, queryComposer } from 'composers';
import { loading, error, progressMapper, errorMapper } from 'utils';
afterEach(cleanup);
/**
 * Test queries
 */

var TEST_QUERY = gql(_templateObject());
var QUERY_ONE = gql(_templateObject2());
var QUERY_TWO = gql(_templateObject3());
/**
 * Test responses
 */

var testMocks = [{
  request: {
    query: QUERY_ONE,
    variables: {
      id: "1"
    }
  },
  result: {
    data: {
      test: {
        testField: 100,
        testField2: 100
      }
    }
  }
}, {
  request: {
    query: QUERY_TWO,
    variables: {
      location: "primary"
    }
  },
  result: {
    data: {
      test: {
        testField: 400,
        testField2: 400
      }
    }
  }
}];
/**
 * Test component
 */

var testComponent = function testComponent(_ref) {
  var children = _ref.children,
      _ref$message = _ref.message,
      message = _ref$message === void 0 ? "TestComponent" : _ref$message;
  return React.createElement("div", null, message, children);
};

it("composes and renders a loading component with progress counter using \n  utilComposer and whileLoading", function () {
  /**
   * Composes loading component with new view layer component
   * using instance of utilComposer assigned to loading.compose
   */
  var view = loading.compose({
    view: function view(_ref2) {
      var icon = _ref2.icon,
          message = _ref2.message,
          _ref2$progress = _ref2.progress,
          min = _ref2$progress.min,
          max = _ref2$progress.max,
          total = _ref2$progress.total,
          rest = _objectWithoutProperties(_ref2, ["icon", "message", "progress"]);

      return React.createElement("div", Object.assign({
        "data-testid": "loading-component"
      }, rest), React.createElement("div", {
        "data-testid": "loading-icon"
      }, icon), React.createElement("p", {
        "data-testid": "loading-message"
      }, message, ' ', Math.floor(total * 100 / max), "%"));
    },
    mapper: progressMapper
  });
  /**
   * Creates conditional function for loading to be called
   * @param {object} props - component props
   */

  var cond = function cond(props) {
    return !!get(props, 'data.loading');
  };
  /**
   * Wraps test component in query layer and loading layer using whileLoading
   */


  var WrappedComponent = compose(graphql(TEST_QUERY), whileLoading({
    view: view,
    cond: cond
  }))(testComponent); // Renders WrappedComponent

  var _render = render(React.createElement(MockedProvider, {
    mocks: [],
    addTypename: false
  }, React.createElement(WrappedComponent, null))),
      getByTestId = _render.getByTestId; // Confirms container


  var container = getByTestId(/loading-component/);
  expect(container).toBeTruthy(); // Confirms icon

  var icon = getByTestId(/loading-icon/);
  expect(icon).toBeTruthy(); // Confirms message

  var message = getByTestId(/loading-message/);
  expect(message.innerHTML).toMatch(/^.+ ?\d+%$/);
});
it("composes and renders a error component when specified prop is found\n  using utilComposer",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee() {
  var mocks, view, WrappedComponent, _render2, getByTestId, component;

  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          /**
           * Mock error response for test query
           */
          mocks = [{
            request: {
              query: TEST_QUERY
            },
            error: new Error('its broke')
          }];
          /**
           * Composes error component with new view layer component
           * using instance of utilComposer assigned to error.compose
           */

          view = error.compose({
            view: function view(_ref4) {
              var message = _ref4.message;
              return React.createElement("div", {
                "data-testid": "error-component"
              }, message);
            },
            mapper: errorMapper
          });
          /**
           * Wraps test component in query layer and error-handling layer using forError
           */

          WrappedComponent = compose(graphql(TEST_QUERY), forError({
            view: view,
            type: 'query',
            errorProp: 'data.error.message'
          }))(testComponent); // Renders WrappedComponent

          _render2 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            addTypename: false
          }, React.createElement(WrappedComponent, null))), getByTestId = _render2.getByTestId; // Confirms Container

          _context.next = 6;
          return waitForElement(function () {
            return getByTestId(/error-component/);
          });

        case 6:
          component = _context.sent;
          expect(component).toBeTruthy(); // Confirms Message

          expect(component.innerHTML).toMatch(/its broke/);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));
it("composes and renders an error when view layer component throws an error",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee2() {
  var view, WrappedComponent, BrokeComponent, _render3, getByText;

  return _regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          /**
           * Composes error component with new view layer component
           * using instance of utilComposer assigned to error.compose
           */
          view = error.compose({
            view: function view(_ref6) {
              var message = _ref6.message;
              return React.createElement("div", {
                "data-testid": "error-component"
              }, message);
            },
            mapper: errorMapper
          });
          /**
           * Wraps test component in error-handling layer using forError
           */

          WrappedComponent = forError({
            view: view
          })(testComponent);
          /**
           * Throws an error upon mounting
           */

          BrokeComponent = function BrokeComponent(_ref7) {
            var message = _ref7.message;
            throw new Error(message);
          }; // Renders WrappedComponent


          _render3 = render(React.createElement(WrappedComponent, null, React.createElement(BrokeComponent, {
            message: "It broke"
          }))), getByText = _render3.getByText; // Confirms error message

          _context2.next = 6;
          return wait(function () {
            return expect(getByText(/It broke/)).toBeTruthy();
          });

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, this);
})));
it("composes and renders a component wrapped in multiple \"graphql\" HOCs when specified conditions are met",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee3() {
  var testComponent, view, QueryComponent, _render4, getByTestId, rerender, fieldOne, fieldTwo;

  return _regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          testComponent = function testComponent(_ref9) {
            var testField = _ref9.testField,
                testField2 = _ref9.testField2;
            return React.createElement(React.Fragment, null, React.createElement("span", {
              "data-testid": "field-1"
            }, testField), React.createElement("span", {
              "data-testid": "field-2"
            }, testField2));
          };

          view = function view() {
            return null;
          };

          QueryComponent = compose(composeQuery([{
            cond: function cond(_ref10) {
              var location = _ref10.location;
              return !!location;
            },
            query: QUERY_TWO,
            config: {
              options: function options(_ref11) {
                var location = _ref11.location;
                return {
                  location: location
                };
              }
            }
          }, {
            cond: function cond(_ref12) {
              var id = _ref12.id;
              return !!id;
            },
            query: QUERY_ONE,
            config: {
              options: function options(_ref13) {
                var id = _ref13.id;
                return {
                  id: id
                };
              }
            }
          }]), whileLoading({
            view: view
          }), mapProps(function (_ref14) {
            var data = _ref14.data,
                rest = _objectWithoutProperties(_ref14, ["data"]);

            var testField = get(data, 'test.testField');
            var testField2 = get(data, 'test.testField2');
            return _objectSpread({
              testField: testField,
              testField2: testField2
            }, rest);
          }))(testComponent);
          _render4 = render(React.createElement(MockedProvider, {
            mocks: testMocks,
            addTypename: false
          }, React.createElement(QueryComponent, {
            id: "1"
          }))), getByTestId = _render4.getByTestId, rerender = _render4.rerender;
          _context3.next = 6;
          return waitForElement(function () {
            return getByTestId(/field-1/);
          });

        case 6:
          fieldOne = _context3.sent;
          expect(fieldOne).toBeTruthy();
          expect(fieldOne.innerHTML).toMatch(/100/);
          _context3.next = 11;
          return waitForElement(function () {
            return getByTestId(/field-2/);
          });

        case 11:
          fieldTwo = _context3.sent;
          expect(fieldTwo).toBeTruthy();
          expect(fieldTwo.innerHTML).toMatch(/100/);
          rerender(React.createElement(MockedProvider, {
            mocks: testMocks,
            addTypename: false
          }, React.createElement(QueryComponent, {
            location: "primary"
          })));
          _context3.next = 17;
          return waitForElement(function () {
            return getByTestId(/field-1/);
          });

        case 17:
          fieldOne = _context3.sent;
          expect(fieldOne).toBeTruthy();
          expect(fieldOne.innerHTML).toMatch(/400/);
          _context3.next = 22;
          return waitForElement(function () {
            return getByTestId(/field-2/);
          });

        case 22:
          fieldTwo = _context3.sent;
          expect(fieldTwo).toBeTruthy();
          expect(fieldTwo.innerHTML).toMatch(/400/);

        case 25:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3, this);
})));
it("composes, maps, and render a component wrapped in conditional graphql HOCs\n  using queryComposer",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee4() {
  var loadingView, errorView, composer, ComposedComponent, _render5, getByTestId, rerender, fieldOne, fieldTwo;

  return _regeneratorRuntime.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          /**
           * Composes loading component with new view layer component
           * using instance of utilComposer assigned to loading.compose
           */
          loadingView = loading.compose({
            view: function view(_ref16) {
              var icon = _ref16.icon,
                  message = _ref16.message,
                  _ref16$progress = _ref16.progress,
                  min = _ref16$progress.min,
                  max = _ref16$progress.max,
                  total = _ref16$progress.total,
                  rest = _objectWithoutProperties(_ref16, ["icon", "message", "progress"]);

              return React.createElement("div", Object.assign({
                "data-testid": "loading-component"
              }, rest), React.createElement("div", {
                "data-testid": "loading-icon"
              }, icon), React.createElement("p", {
                "data-testid": "loading-message"
              }, message, ' ', Math.floor(total * 100 / max), "%"));
            },
            mapper: progressMapper
          });
          /**
           * Composes error component with new view layer component
           * using instance of utilComposer assigned to error.compose
           */

          errorView = error.compose({
            view: function view(_ref17) {
              var message = _ref17.message;
              return React.createElement("div", {
                "data-testid": "error-component"
              }, message);
            },
            mapper: errorMapper
          });
          composer = queryComposer({
            queries: [{
              cond: function cond(_ref18) {
                var location = _ref18.location;
                return !!location;
              },
              query: QUERY_TWO,
              config: {
                options: function options(_ref19) {
                  var location = _ref19.location;
                  return {
                    location: location
                  };
                }
              }
            }, {
              cond: function cond(_ref20) {
                var id = _ref20.id;
                return !!id;
              },
              query: QUERY_ONE,
              config: {
                options: function options(_ref21) {
                  var id = _ref21.id;
                  return {
                    id: id
                  };
                }
              }
            }],
            whileLoading: {
              view: loadingView
            },
            forError: {
              view: errorView
            },
            sharedMapper: function sharedMapper(_ref22) {
              var data = _ref22.data,
                  rest = _objectWithoutProperties(_ref22, ["data"]);

              var testField = get(data, 'test.testField');
              var testField2 = get(data, 'test.testField2');
              return _objectSpread({
                testField: testField,
                testField2: testField2
              }, rest);
            },
            view: function view(_ref23) {
              var testField = _ref23.testField,
                  testField2 = _ref23.testField2;
              return React.createElement(React.Fragment, null, React.createElement("span", {
                "data-testid": "field-1"
              }, testField), React.createElement("span", {
                "data-testid": "field-2"
              }, testField2));
            }
          });
          ComposedComponent = composer({}); // Renders ComposedComponent

          _render5 = render(React.createElement(MockedProvider, {
            mocks: testMocks,
            addTypename: false
          }, React.createElement(ComposedComponent, {
            id: "1"
          }))), getByTestId = _render5.getByTestId, rerender = _render5.rerender; // Confirms first field's value

          _context4.next = 7;
          return waitForElement(function () {
            return getByTestId(/field-1/);
          });

        case 7:
          fieldOne = _context4.sent;
          expect(fieldOne).toBeTruthy();
          expect(fieldOne.innerHTML).toMatch(/100/); // Confirms second field's value

          _context4.next = 12;
          return waitForElement(function () {
            return getByTestId(/field-2/);
          });

        case 12:
          fieldTwo = _context4.sent;
          expect(fieldTwo).toBeTruthy();
          expect(fieldTwo.innerHTML).toMatch(/100/); // Rerenders ComposedComponent

          rerender(React.createElement(MockedProvider, {
            mocks: testMocks,
            addTypename: false
          }, React.createElement(ComposedComponent, {
            location: "primary"
          }))); // Confirms first field's value

          _context4.next = 18;
          return waitForElement(function () {
            return getByTestId(/field-1/);
          });

        case 18:
          fieldOne = _context4.sent;
          expect(fieldOne).toBeTruthy();
          expect(fieldOne.innerHTML).toMatch(/400/); // Confirms second field's value

          _context4.next = 23;
          return waitForElement(function () {
            return getByTestId(/field-2/);
          });

        case 23:
          fieldTwo = _context4.sent;
          expect(fieldTwo).toBeTruthy();
          expect(fieldTwo.innerHTML).toMatch(/400/);

        case 26:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee4, this);
})));