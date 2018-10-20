import _objectWithoutProperties from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import _regeneratorRuntime from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/regenerator";
import _asyncToGenerator from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import React from 'react';
import _ from 'lodash';
import ReactHtmlParser from 'react-html-parser';
import { render, cleanup, waitForElement } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';
import { POST_QUERY, POST_BY_QUERY, Post, post } from 'post-type';
afterEach(cleanup);
it("renders a post",
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
              query: POST_QUERY,
              variables: {
                id: "P0TSH0t"
              }
            },
            result: {
              data: {
                post: {
                  id: "P0TSH0t",
                  postId: 1,
                  uri: "parent-post/child-post",
                  slug: "test-post",
                  content: "<h1>Hello World</h1>",
                  date: "2018-09-12 23:02:46",
                  modified: "2018-09-19 00:26:14",
                  title: "Hello world!",
                  permalink: "2018/09/hello-world/",
                  author: {
                    id: "Bugger",
                    userId: 3,
                    nicename: "kimboChop",
                    avatar: {
                      url: "http://2.gravatar.com/avatar/8cbbea0504f915ea88622f97badd1bed?s=96&d=mm&r=g",
                      foundAvatar: true
                    }
                  },
                  categories: {
                    nodes: [{
                      id: "Y2F0ZWdvcnk6MTM=",
                      name: "testOne"
                    }, {
                      id: "Y2F0ZWdvcnk6MTQ=",
                      name: "testtwo"
                    }, {
                      id: "Y2F0ZWdvcnk6MQ==",
                      name: "Uncategorized"
                    }]
                  },
                  tags: {
                    nodes: [{
                      id: "cG9zdF90YWc6OQ==",
                      name: "Forsha"
                    }, {
                      id: "cG9zdF90YWc6MTA=",
                      name: "GetIt"
                    }, {
                      id: "cG9zdF90YWc6MTI=",
                      name: "Jane"
                    }, {
                      id: "cG9zdF90YWc6MTE=",
                      name: "Plain"
                    }, {
                      id: "cG9zdF90YWc6OA==",
                      name: "Yep"
                    }]
                  },
                  featuredImage: null
                }
              }
            }
          }];
          _render = render(React.createElement(MockedProvider, {
            mocks: mocks,
            addTypename: false
          }, React.createElement(Post, {
            id: "P0TSH0t",
            "data-testid": "test-post"
          }))), getByTestId = _render.getByTestId;
          _context.next = 4;
          return waitForElement(function () {
            return getByTestId(/test-post/);
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
it("renders a post by slug",
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
              query: POST_BY_QUERY,
              variables: {
                postId: null,
                slug: "test-post",
                uri: null
              }
            },
            result: {
              data: {
                postBy: {
                  id: "P0TSH0t",
                  postId: 1,
                  uri: "parent-post/child-post",
                  slug: "test-post",
                  content: "<h1>Hello World</h1>",
                  date: "2018-09-12 23:02:46",
                  modified: "2018-09-19 00:26:14",
                  title: "Hello world!",
                  permalink: "2018/09/hello-world/",
                  author: {
                    id: "Bugger",
                    userId: 3,
                    nicename: "kimboChop",
                    avatar: {
                      url: "http://2.gravatar.com/avatar/8cbbea0504f915ea88622f97badd1bed?s=96&d=mm&r=g",
                      foundAvatar: true
                    }
                  },
                  categories: {
                    nodes: [{
                      id: "Y2F0ZWdvcnk6MTM=",
                      name: "testOne"
                    }, {
                      id: "Y2F0ZWdvcnk6MTQ=",
                      name: "testtwo"
                    }, {
                      id: "Y2F0ZWdvcnk6MQ==",
                      name: "Uncategorized"
                    }]
                  },
                  "tags": {
                    "nodes": [{
                      id: "cG9zdF90YWc6OQ==",
                      name: "Forsha"
                    }, {
                      id: "cG9zdF90YWc6MTA=",
                      name: "GetIt"
                    }, {
                      id: "cG9zdF90YWc6MTI=",
                      name: "Jane"
                    }, {
                      id: "cG9zdF90YWc6MTE=",
                      name: "Plain"
                    }, {
                      id: "cG9zdF90YWc6OA==",
                      name: "Yep"
                    }]
                  },
                  featuredImage: null
                }
              }
            }
          }];
          _render2 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            addTypename: false
          }, React.createElement(Post, {
            slug: "test-post",
            "data-testid": "test-post"
          }))), getByTestId = _render2.getByTestId;
          _context2.next = 4;
          return waitForElement(function () {
            return getByTestId(/test-post/);
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
it("renders a post by uri with a custom view component",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee3() {
  var customDetails, CustomPost, mocks, _render3, getByTestId, body, content, meta, tags, categories;

  return _regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          customDetails = function customDetails(_ref4) {
            var date = _ref4.date,
                modified = _ref4.modified,
                _ref4$author = _ref4.author,
                userId = _ref4$author.userId,
                nicename = _ref4$author.nicename,
                tags = _ref4.tags,
                categories = _ref4.categories;
            var created = new Date(date);
            var updated = modified ? new Date(modified) : false;
            var format = {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            };
            return React.createElement(React.Fragment, null, React.createElement("div", {
              "data-testid": "post-meta"
            }, React.createElement("span", null, "Posted on ", React.createElement("time", null, created.toLocaleDateString("en-US", format)), updated && React.createElement("time", null, updated.toLocaleDateString("en-US", format))), React.createElement("span", {
              className: "byline"
            }, " by ", React.createElement("a", {
              href: "/author/".concat(userId)
            }, nicename))), React.createElement("span", {
              "data-testid": "post-tags"
            }, React.createElement("strong", null, "Tagged"), _.map(tags, function (_ref5) {
              var name = _ref5.name,
                  id = _ref5.id;
              return React.createElement("a", {
                href: "/tag/".concat(name),
                key: id
              }, name);
            })), React.createElement("span", {
              "data-testid": "post-categories"
            }, React.createElement("strong", null, "Posted in"), _.map(categories, function (_ref6) {
              var name = _ref6.name,
                  id = _ref6.id;
              return React.createElement("a", {
                href: "/category/".concat(name),
                key: id
              }, name);
            })));
          };

          CustomPost = post.compose({
            view: function view(_ref7) {
              var featured = _ref7.featured,
                  postId = _ref7.postId,
                  title = _ref7.title,
                  content = _ref7.content,
                  details = _ref7.details,
                  Attachment = _ref7.Attachment,
                  DetailsComponent = _ref7.DetailsComponent,
                  rest = _objectWithoutProperties(_ref7, ["featured", "postId", "title", "content", "details", "Attachment", "DetailsComponent"]);

              return React.createElement("article", Object.assign({
                id: "post-".concat(postId)
              }, rest), React.createElement(Attachment, {
                mediaItemId: featured,
                fallback: true
              }), React.createElement("div", {
                "data-testid": "post-content"
              }, ReactHtmlParser(content)), React.createElement("footer", null, React.createElement(DetailsComponent, details)));
            },
            DetailsComponent: customDetails
          });
          mocks = [{
            request: {
              query: POST_BY_QUERY,
              variables: {
                postId: null,
                slug: null,
                uri: "parent-post/child-post"
              }
            },
            result: {
              data: {
                postBy: {
                  id: "P0TSH0t",
                  postId: 1,
                  uri: "parent-post/child-post",
                  slug: "test-post",
                  content: "<h1>Hello World</h1>",
                  date: "2018-09-12 23:02:46",
                  modified: "2018-09-19 00:26:14",
                  title: "Hello world!",
                  permalink: "2018/09/hello-world/",
                  author: {
                    id: "Bugger",
                    userId: 3,
                    nicename: "kimboChop",
                    avatar: {
                      url: "http://2.gravatar.com/avatar/8cbbea0504f915ea88622f97badd1bed?s=96&d=mm&r=g",
                      foundAvatar: true
                    }
                  },
                  categories: {
                    nodes: [{
                      id: "Y2F0ZWdvcnk6MTM=",
                      name: "testOne"
                    }, {
                      id: "Y2F0ZWdvcnk6MTQ=",
                      name: "testtwo"
                    }, {
                      id: "Y2F0ZWdvcnk6MQ==",
                      name: "Uncategorized"
                    }]
                  },
                  "tags": {
                    "nodes": [{
                      id: "cG9zdF90YWc6OQ==",
                      name: "Forsha"
                    }, {
                      id: "cG9zdF90YWc6MTA=",
                      name: "GetIt"
                    }, {
                      id: "cG9zdF90YWc6MTI=",
                      name: "Jane"
                    }, {
                      id: "cG9zdF90YWc6MTE=",
                      name: "Plain"
                    }, {
                      id: "cG9zdF90YWc6OA==",
                      name: "Yep"
                    }]
                  },
                  featuredImage: null
                }
              }
            }
          }];
          _render3 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            addTypename: false
          }, React.createElement(CustomPost, {
            uri: "parent-post/child-post",
            "data-testid": "post-body"
          }))), getByTestId = _render3.getByTestId;
          _context3.next = 6;
          return waitForElement(function () {
            return getByTestId(/post-body/);
          });

        case 6:
          body = _context3.sent;
          expect(body).toBeTruthy();
          content = getByTestId(/post-content/);
          expect(content.innerHTML).toMatch(/<h1>Hello World<\/h1>/);
          meta = getByTestId(/post-meta/);
          expect(meta).toBeTruthy();
          tags = getByTestId(/post-tags/);
          expect(tags).toBeTruthy();
          categories = getByTestId(/post-categories/);
          expect(categories).toBeTruthy();

        case 16:
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
              query: POST_BY_QUERY,
              variables: {
                postId: null,
                slug: "fosho",
                uri: null
              }
            },
            result: {
              "errors": [{
                message: "The \"slug\" is invalid",
                category: "user",
                locations: [{
                  line: 2,
                  column: 3
                }],
                path: ["postBy"]
              }],
              data: {
                post: null
              }
            }
          }];
          _render4 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            addTypename: false
          }, React.createElement(Post, {
            slug: "fosho",
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
          expect(message.innerHTML).toMatch(/^Sorry, we can't locate the post you're looking for. Please, try again later.$|^GraphQL error: The \"slug\" is invalid$/);

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
  }, React.createElement(Post, {
    slug: "sample-post"
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
              query: POST_BY_QUERY,
              variables: {
                uri: "sample-page"
              }
            },
            error: new Error('its broke')
          }];
          _render6 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            addTypename: false
          }, React.createElement(Post, {
            uri: "sample-post"
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