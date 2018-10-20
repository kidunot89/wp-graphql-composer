import _regeneratorRuntime from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/regenerator";
import _asyncToGenerator from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import React from 'react';
import { render, cleanup, waitForElement, wait } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';
import { ATTACHMENT_QUERY, Attachment, attachment } from 'post-type';
afterEach(cleanup);
it("renders mock image at different sizes while maintaining the image's aspect ratio",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee() {
  var mocks, _render, getByAltText, image;

  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          mocks = [{
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
                      sourceUrl: "https://source.unsplash.com/150x150"
                    }, {
                      width: "300",
                      height: "200",
                      sourceUrl: "https://source.unsplash.com/300x200"
                    }, {
                      width: "768",
                      height: "512",
                      sourceUrl: "https://source.unsplash.com/768x512"
                    }, {
                      width: "1024",
                      height: "682",
                      sourceUrl: "https://source.unsplash.com/1024x682"
                    }]
                  }
                }
              }
            }
          }];
          /**
           * Original Size and className
           */

          _render = render(React.createElement(MockedProvider, {
            mocks: mocks,
            addTypename: false
          }, React.createElement(Attachment, {
            mediaItemId: 1,
            className: "dummy-image",
            alt: "dummy-image"
          }))), getByAltText = _render.getByAltText;
          _context.next = 4;
          return waitForElement(function () {
            return getByAltText(/dummy-image/);
          });

        case 4:
          image = _context.sent;
          expect(image).toBeTruthy();
          expect(image.getAttribute('class')).toEqual('dummy-image');
          expect(image.getAttribute('srcSet')).toEqual('https://source.unsplash.com/150x150 150w, https://source.unsplash.com/300x200 300w, https://source.unsplash.com/768x512 768w, https://source.unsplash.com/1024x682 1024w');
          expect(image.getAttribute('sizes')).toEqual('(max-width: 768px) 768px, (max-width: 1200px) 1024px');
          /**
           * custom alt attribute
           */

          render(React.createElement(MockedProvider, {
            mocks: mocks,
            addTypename: false
          }, React.createElement(Attachment, {
            mediaItemId: 1,
            alt: "test image"
          })));
          _context.next = 12;
          return waitForElement(function () {
            return getByAltText(/test image/);
          });

        case 12:
          image = _context.sent;
          expect(image).toBeTruthy();

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));
it("renders fallback image",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee2() {
  var mocks, _render2, getByAltText, image;

  return _regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          mocks = [{
            request: {
              query: ATTACHMENT_QUERY,
              variables: {
                mediaItemId: 1
              }
            },
            result: {
              data: {
                mediaItemBy: null
              }
            },
            error: new Error('not found')
          }];
          _render2 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            addTypename: false
          }, React.createElement(Attachment, {
            src: "https://source.unsplash.com/768x512",
            alt: "dummy-image",
            fallback: true
          }))), getByAltText = _render2.getByAltText;
          _context2.next = 4;
          return waitForElement(function () {
            return getByAltText(/dummy-image/);
          });

        case 4:
          image = _context2.sent;
          expect(image).toBeTruthy();
          expect(image.getAttribute('src') === 'https://source.unsplash.com/768x512').toBeTruthy();

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, this);
})));
it("renders nothing if fallback flag set and no src attribute is provided",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee3() {
  var mocks, _render3, container, getByAltText;

  return _regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          mocks = [{
            request: {
              query: ATTACHMENT_QUERY,
              variables: {
                mediaItemId: 1
              }
            },
            data: {
              mediaItemBy: null
            },
            error: new Error('not found')
          }];
          _render3 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            addTypename: false
          }, React.createElement(Attachment, {
            alt: "dummy-image",
            fallback: true
          }))), container = _render3.container, getByAltText = _render3.getByAltText;
          _context3.next = 4;
          return wait(function () {
            return expect(container.querySelector('img')).toBeFalsy();
          });

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3, this);
})));
it("renders fallback image with a custom attachment template component",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee4() {
  var NewAttachment, mocks, _render4, getByTestId, container, image;

  return _regeneratorRuntime.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          NewAttachment = attachment.compose({
            view: function view(props) {
              return React.createElement("div", {
                "data-testid": "container"
              }, React.createElement("img", props));
            }
          });
          mocks = [{
            request: {
              query: ATTACHMENT_QUERY,
              variables: {
                mediaItemId: 1
              }
            },
            result: {
              data: {
                mediaItemBy: null
              }
            },
            error: new Error('not found')
          }];
          _render4 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            addTypename: false
          }, React.createElement(NewAttachment, {
            src: "https://source.unsplash.com/768x512",
            alt: "dummy-image",
            fallback: true
          }))), getByTestId = _render4.getByTestId;
          _context4.next = 5;
          return waitForElement(function () {
            return getByTestId(/container/);
          });

        case 5:
          container = _context4.sent;
          expect(container).toBeTruthy();
          image = container.querySelector('img[alt="dummy-image"]');
          expect(image).toBeTruthy();
          expect(image.getAttribute('src') === 'https://source.unsplash.com/768x512').toBeTruthy();

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee4, this);
})));
it("renders loading state initially", function () {
  var _render5 = render(React.createElement(MockedProvider, {
    mocks: [],
    addTypename: false
  }, React.createElement(Attachment, {
    mediaItemId: 1
  }))),
      getByText = _render5.getByText,
      getByTestId = _render5.getByTestId;

  var icon = getByTestId(/loading-icon/);
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === '').toBeFalsy();
  expect(getByText(/Loading\.\.\./)).toBeTruthy();
});
it("render error state",
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
              query: ATTACHMENT_QUERY,
              variables: {
                mediaItemId: 1
              }
            },
            error: new Error('its broke')
          }];
          _render6 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            addTypename: false
          }, React.createElement(Attachment, {
            mediaItemId: 1
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