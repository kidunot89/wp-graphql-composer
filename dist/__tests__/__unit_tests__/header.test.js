import _regeneratorRuntime from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/regenerator";
import _asyncToGenerator from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { MemoryRouter } from 'react-router-dom';
import introspectionQueryResultData from 'fragmentTypes.json';
import { HEADER_QUERY, Header, header } from 'header';
import { ATTACHMENT_QUERY } from 'post-type';
afterEach(cleanup);
var fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: introspectionQueryResultData
});
var mocks = [{
  request: {
    query: HEADER_QUERY
  },
  result: {
    data: {
      allSettings: {
        generalSettingsTitle: 'ChumBucket',
        generalSettingsDescription: 'Eat here, dammit!!',
        homeUrl: 'https://buccogrease.net',
        __typename: 'Settings'
      },
      themeMods: {
        customLogo: 1,
        __typename: 'ThemeMods'
      }
    }
  }
}, {
  request: {
    query: ATTACHMENT_QUERY,
    variables: {
      mediaItemId: 1,
      id: null,
      slug: null,
      uri: null
    }
  },
  result: {
    data: {
      mediaItemBy: {
        id: "YXR0YWNobWVudDoxNTk=",
        altText: 'dummy-image',
        mediaType: "image",
        sourceUrl: "https://source.unsplash.com/1250x833",
        mediaDetails: {
          sizes: [{
            width: "150",
            height: "150",
            sourceUrl: "https://source.unsplash.com/150x150",
            __typename: 'MediaSizes'
          }, {
            width: "300",
            height: "200",
            sourceUrl: "https://source.unsplash.com/300x200",
            __typename: 'MediaSizes'
          }, {
            width: "768",
            height: "512",
            sourceUrl: "https://source.unsplash.com/768x512",
            __typename: 'MediaSizes'
          }, {
            width: "1024",
            height: "682",
            sourceUrl: "https://source.unsplash.com/1024x682",
            __typename: 'MediaSizes'
          }],
          __typename: 'MediaDetails'
        },
        __typename: 'MediaItem'
      }
    }
  }
}];
var cache = new InMemoryCache({
  fragmentMatcher: fragmentMatcher
});
it("renders a header component with a logo, title, and description loaded with mock data",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee() {
  var _render, getByText, getByTestId, getByAltText, title, image;

  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _render = render(React.createElement(MockedProvider, {
            mocks: mocks,
            cache: cache,
            addTypename: true
          }, React.createElement(MemoryRouter, null, React.createElement(Header, null)))), getByText = _render.getByText, getByTestId = _render.getByTestId, getByAltText = _render.getByAltText;
          _context.next = 3;
          return waitForElement(function () {
            return getByText('ChumBucket');
          });

        case 3:
          title = _context.sent;
          expect(title).toBeTruthy();
          expect(getByText('Eat here, dammit!!')).toBeTruthy();
          expect(getByTestId('home-link')).toBeTruthy();
          _context.next = 9;
          return waitForElement(function () {
            return getByAltText(/ChumBucket/);
          });

        case 9:
          image = _context.sent;
          expect(image).toBeTruthy();
          expect(image.getAttribute('class')).toEqual('custom-logo');
          expect(image.getAttribute('srcSet')).toEqual('https://source.unsplash.com/150x150 150w, https://source.unsplash.com/300x200 300w, https://source.unsplash.com/768x512 768w, https://source.unsplash.com/1024x682 1024w');
          expect(image.getAttribute('sizes')).toEqual('(max-width: 768px) 768px, (max-width: 1200px) 1024px');

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));
it("render a header component with a custom view layer",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee2() {
  var view, CustomHeader, _render2, getByTestId, title, description;

  return _regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          view = function view(_ref3) {
            var title = _ref3.title,
                description = _ref3.description,
                url = _ref3.url;
            return React.createElement("div", null, React.createElement("h1", {
              "data-testid": "header-title"
            }, title), React.createElement("h1", null, React.createElement("small", {
              "data-testid": "header-description"
            }, description)));
          };

          CustomHeader = header.compose({
            view: view
          });
          _render2 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            cache: cache,
            addTypename: true
          }, React.createElement(MemoryRouter, null, React.createElement(CustomHeader, null)))), getByTestId = _render2.getByTestId;
          _context2.next = 5;
          return waitForElement(function () {
            return getByTestId(/header-title/);
          });

        case 5:
          title = _context2.sent;
          expect(title).toBeTruthy();
          expect(title.innerHTML).toMatch(/ChumBucket/);
          description = getByTestId(/header-description/);
          expect(description).toBeTruthy();
          expect(description.innerHTML).toMatch(/Eat here, dammit!!/);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, this);
})));
it("renders loading state initially", function () {
  var _render3 = render(React.createElement(MockedProvider, {
    mocks: [],
    addTypename: false
  }, React.createElement(MemoryRouter, null, React.createElement(Header, null)))),
      getByText = _render3.getByText,
      getByTestId = _render3.getByTestId;

  var icon = getByTestId(/loading-icon/);
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === '').toBeFalsy();
  expect(getByText(/Loading\.\.\./)).toBeTruthy();
});
it("renders error state",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee3() {
  var errorMocks, _render4, getByTestId, icon, message;

  return _regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          errorMocks = [{
            request: {
              query: HEADER_QUERY
            },
            error: new Error('its broke')
          }];
          _render4 = render(React.createElement(MockedProvider, {
            mocks: errorMocks,
            addTypename: false
          }, React.createElement(MemoryRouter, null, React.createElement(Header, null)))), getByTestId = _render4.getByTestId;
          _context3.next = 4;
          return waitForElement(function () {
            return getByTestId(/error-icon/);
          });

        case 4:
          icon = _context3.sent;
          expect(icon).toBeTruthy();
          expect(icon.innerHTML === '').toBeFalsy();
          message = getByTestId(/error-message/);
          expect(message).toBeTruthy();
          expect(message.innerHTML === '').toBeFalsy();

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3, this);
})));