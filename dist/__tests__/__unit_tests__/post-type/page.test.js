import _objectWithoutProperties from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import _regeneratorRuntime from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/regenerator";
import _asyncToGenerator from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { render, cleanup, waitForElement } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';
import { PAGE_QUERY, PAGE_BY_QUERY, Page, page } from 'post-type';
afterEach(cleanup);
it("renders a page",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee() {
  var mocks, _render, getByTestId, body;

  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          mocks = [{
            request: {
              query: PAGE_QUERY,
              variables: {
                id: "W0T5R0x"
              }
            },
            result: {
              data: {
                page: {
                  id: "W0T5R0x",
                  uri: "test-page",
                  pageId: 125,
                  title: "Sample Page",
                  content: "<h1>Hello World</h1>",
                  modified: "2018-09-19 00:27:35",
                  date: "2018-09-15 23:19:11"
                }
              }
            }
          }];
          _render = render(React.createElement(MockedProvider, {
            mocks: mocks,
            addTypename: false
          }, React.createElement(Page, {
            id: "W0T5R0x",
            "data-testid": "test-page"
          }))), getByTestId = _render.getByTestId;
          _context.next = 4;
          return waitForElement(function () {
            return getByTestId(/test-page/);
          });

        case 4:
          body = _context.sent;
          expect(body).toBeTruthy();

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));
it("renders a page by uri",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee2() {
  var mocks, _render2, getByTestId, body;

  return _regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          mocks = [{
            request: {
              query: PAGE_BY_QUERY,
              variables: {
                uri: "test-page",
                pageId: null
              }
            },
            result: {
              data: {
                pageBy: {
                  id: "W0T5R0x",
                  uri: "test-page",
                  pageId: 125,
                  title: "Sample Page",
                  content: "<h1>Hello World</h1>",
                  modified: "2018-09-19 00:27:35",
                  date: "2018-09-15 23:19:11"
                }
              }
            }
          }];
          _render2 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            addTypename: false
          }, React.createElement(Page, {
            uri: "test-page",
            "data-testid": "test-page"
          }))), getByTestId = _render2.getByTestId;
          _context2.next = 4;
          return waitForElement(function () {
            return getByTestId(/test-page/);
          });

        case 4:
          body = _context2.sent;
          expect(body).toBeTruthy();

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, this);
})));
it("render a page with a custom view component",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee3() {
  var CustomPage, mocks, _render3, getByTestId, body, title, content, date, modified;

  return _regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          CustomPage = page.compose({
            view: function view(_ref4) {
              var pageId = _ref4.pageId,
                  title = _ref4.title,
                  content = _ref4.content,
                  date = _ref4.date,
                  modified = _ref4.modified,
                  rest = _objectWithoutProperties(_ref4, ["pageId", "title", "content", "date", "modified"]);

              return React.createElement("div", Object.assign({
                id: "page-".concat(pageId),
                "data-testid": "page-body"
              }, rest), React.createElement("h1", {
                "data-testid": "page-title"
              }, title), React.createElement("div", {
                "data-testid": "page-content"
              }, ReactHtmlParser(content)), React.createElement("div", null, React.createElement("span", {
                "data-testid": "page-date"
              }, date), React.createElement("span", {
                "data-testid": "page-modified"
              }, modified)));
            }
          });
          mocks = [{
            request: {
              query: PAGE_BY_QUERY,
              variables: {
                pageId: 544,
                uri: null
              }
            },
            result: {
              data: {
                pageBy: {
                  id: "W0T5R0x",
                  uri: "test-page",
                  pageId: 544,
                  title: "Sample Page",
                  content: "<h1>Hello World</h1>",
                  modified: "2018-09-19 00:27:35",
                  date: "2018-09-15 23:19:11"
                }
              }
            }
          }];
          _render3 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            addTypename: false
          }, React.createElement(CustomPage, {
            pageId: 544
          }))), getByTestId = _render3.getByTestId;
          _context3.next = 5;
          return waitForElement(function () {
            return getByTestId(/page-body/);
          });

        case 5:
          body = _context3.sent;
          expect(body).toBeTruthy();
          title = getByTestId(/page-title/);
          expect(title.innerHTML).toMatch(/Sample Page/);
          content = getByTestId(/page-content/);
          expect(content.innerHTML).toMatch(/<h1>Hello World<\/h1>/);
          date = getByTestId(/page-date/);
          expect(date.innerHTML).toMatch(/2018-09-15 23:19:11/);
          modified = getByTestId(/page-modified/);
          expect(modified.innerHTML).toMatch(/2018-09-19 00:27:35/);

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3, this);
})));
it("renders page not found",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee4() {
  var mocks, _render4, getByTestId, icon, message;

  return _regeneratorRuntime.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          mocks = [{
            request: {
              query: PAGE_QUERY,
              variables: {
                id: "W0T5R0x"
              }
            },
            result: {
              "errors": [{
                message: "The \"id\" is invalid",
                category: "user",
                locations: [{
                  line: 2,
                  column: 3
                }],
                path: ["page"]
              }],
              data: {
                page: null
              }
            }
          }];
          _render4 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            addTypename: false
          }, React.createElement(Page, {
            id: "W0T5R0x",
            "data-testid": "test-page"
          }))), getByTestId = _render4.getByTestId;
          _context4.next = 4;
          return waitForElement(function () {
            return getByTestId(/error-icon/);
          });

        case 4:
          icon = _context4.sent;
          expect(icon).toBeTruthy();
          expect(icon.innerHTML === '').toBeFalsy();
          message = getByTestId(/error-message/);
          expect(message).toBeTruthy();
          expect(message.innerHTML).toMatch(/^Sorry, we can't locate the page you're looking for. Please, try again later.$|^GraphQL error: The \"id\" is invalid$/);

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee4, this);
})));
it("renders a loading state", function () {
  var _render5 = render(React.createElement(MockedProvider, {
    mocks: [],
    addTypename: false
  }, React.createElement(Page, {
    uri: "sample-page"
  }))),
      getByText = _render5.getByText,
      getByTestId = _render5.getByTestId;

  var icon = getByTestId(/loading-icon/);
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === '').toBeFalsy();
  expect(getByText(/Loading\.\.\./)).toBeTruthy();
});
it("renders error state",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee5() {
  var mocks, _render6, getByTestId, icon, message;

  return _regeneratorRuntime.wrap(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          mocks = [{
            request: {
              query: PAGE_BY_QUERY,
              variables: {
                uri: "sample-page"
              }
            },
            error: new Error('its broke')
          }];
          _render6 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            addTypename: false
          }, React.createElement(Page, {
            uri: "sample-page"
          }))), getByTestId = _render6.getByTestId;
          _context5.next = 4;
          return waitForElement(function () {
            return getByTestId(/error-icon/);
          });

        case 4:
          icon = _context5.sent;
          expect(icon).toBeTruthy();
          expect(icon.innerHTML === '').toBeFalsy();
          message = getByTestId(/error-message/);
          expect(message).toBeTruthy();
          expect(message.innerHTML === '').toBeFalsy();

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, _callee5, this);
})));