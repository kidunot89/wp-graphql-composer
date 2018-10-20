import _objectWithoutProperties from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import _regeneratorRuntime from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/regenerator";
import _asyncToGenerator from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { MemoryRouter } from 'react-router-dom';
import introspectionQueryResultData from 'fragmentTypes.json';
import { Main, main, LOOP_QUERY } from 'main';
import { PAGE_QUERY, PAGE_BY_QUERY, POST_BY_QUERY } from 'post-type';
import { ARCHIVE_QUERY } from 'archives';
afterEach(cleanup);
var fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: introspectionQueryResultData
});
var loopQueryResults = {
  request: {
    query: LOOP_QUERY
  },
  result: {
    data: {
      allSettings: {
        pageForPosts: 'blog',
        pageOnFront: "W0T5R0x",
        permalinkStructure: '/%monthnum%/%year%/%day%/%postname%/',
        readingSettingsPostsPerPage: 5,
        __typename: 'Settings'
      }
    }
  }
};
var archiveResults = [{
  id: "P0TSH0t",
  postId: 7,
  uri: "parent-post/child-post",
  slug: "test-post",
  content: "<h1>Hello World</h1>",
  excerpt: "<h1>Hello World</h1>",
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
      foundAvatar: true,
      __typename: 'Avatar'
    },
    __typename: 'User'
  },
  categories: {
    nodes: [{
      id: "Y2F0ZWdvcnk6MTM=",
      name: "Test One",
      slug: "test-one",
      __typename: 'Category'
    }, {
      id: "Y2F0ZWdvcnk6MTQ=",
      name: "Test Two",
      slug: "test-two",
      __typename: 'Category'
    }, {
      id: "Y2F0ZWdvcnk6MQ==",
      name: "Uncategorized",
      slug: "uncategorized",
      __typename: 'Category'
    }, {
      id: "Y2F0ZWfvxwk6MQ==",
      name: "Web Development",
      slug: "web-dev",
      __typename: 'Category'
    }],
    __typename: 'PostCategoriesConnection'
  },
  tags: {
    nodes: [{
      id: "cG9zdF90YWc6OQ==",
      name: "Forsha",
      slug: "forsha",
      __typename: 'Tag'
    }, {
      id: "cG9zdF90YWc6MTA=",
      name: "GetIt",
      slug: 'get-it',
      __typename: 'Tag'
    }, {
      id: "cG9zdF90YWc6MTI=",
      name: "Jane",
      slug: "jane",
      __typename: 'Tag'
    }, {
      id: "cG9zdF90YWc6MTE=",
      name: "Plain",
      slug: "plain",
      __typename: 'Tag'
    }, {
      id: "cG9zdF90YWc6OA==",
      name: "Yep",
      slug: "yep",
      __typename: 'Tag'
    }, {
      id: "cG9zdF90YWc6OS==",
      name: "Javascript",
      slug: "javascript",
      __typename: 'Tag'
    }],
    __typename: 'PostTagsConnection'
  },
  featuredImage: null,
  __typename: 'Post'
}];
var mocks = [loopQueryResults, {
  request: {
    query: POST_BY_QUERY,
    variables: {
      uri: null,
      postId: null,
      slug: 'test-post'
    }
  },
  result: {
    data: {
      postBy: {
        id: "P0TSH0t",
        postId: 7,
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
            foundAvatar: true,
            __typename: 'Avatar'
          },
          __typename: 'User'
        },
        categories: {
          nodes: [{
            id: "Y2F0ZWdvcnk6MTM=",
            name: "testOne",
            __typename: 'Category'
          }, {
            id: "Y2F0ZWdvcnk6MTQ=",
            name: "testtwo",
            __typename: 'Category'
          }, {
            id: "Y2F0ZWdvcnk6MQ==",
            name: "Uncategorized",
            __typename: 'Category'
          }],
          __typename: 'PostCategoriesConnection'
        },
        tags: {
          nodes: [{
            id: "cG9zdF90YWc6OQ==",
            name: "Forsha",
            __typename: 'Tag'
          }, {
            id: "cG9zdF90YWc6MTA=",
            name: "GetIt",
            __typename: 'Tag'
          }, {
            id: "cG9zdF90YWc6MTI=",
            name: "Jane",
            __typename: 'Tag'
          }, {
            id: "cG9zdF90YWc6MTE=",
            name: "Plain",
            __typename: 'Tag'
          }, {
            id: "cG9zdF90YWc6OA==",
            name: "Yep",
            __typename: 'Tag'
          }],
          __typename: 'PostTagsConnection'
        },
        featuredImage: null,
        __typename: 'Post'
      }
    }
  }
}, {
  request: {
    query: PAGE_BY_QUERY,
    variables: {
      pageId: null,
      uri: 'sample-page'
    }
  },
  result: {
    data: {
      pageBy: {
        id: "W0T5R0x",
        uri: "sample-page",
        pageId: 3,
        title: "Sample Page",
        content: "<h1>Hello World</h1>",
        modified: "2018-09-19 00:27:35",
        date: "2018-09-15 23:19:11",
        __typename: 'Page'
      }
    }
  }
}, {
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
        uri: "sample-page",
        pageId: 3,
        title: "Sample Page",
        content: "<h1>Hello World</h1>",
        modified: "2018-09-19 00:27:35",
        date: "2018-09-15 23:19:11",
        __typename: 'Page'
      }
    }
  }
}, {
  request: {
    query: ARCHIVE_QUERY,
    variables: {
      first: 5,
      category: null,
      tag: null,
      day: null,
      month: null,
      year: null,
      author: null,
      search: null
    }
  },
  result: {
    data: {
      posts: {
        nodes: archiveResults,
        __typename: 'RootPostsConnection'
      }
    }
  }
}, {
  request: {
    query: ARCHIVE_QUERY,
    variables: {
      first: 5,
      category: null,
      tag: null,
      day: 1,
      month: 9,
      year: 2018,
      author: null,
      search: null
    }
  },
  result: {
    data: {
      posts: {
        nodes: archiveResults,
        __typename: 'RootPostsConnection'
      }
    }
  }
}, {
  request: {
    query: ARCHIVE_QUERY,
    variables: {
      first: 5,
      category: null,
      tag: null,
      day: null,
      month: 9,
      year: 2018,
      author: null,
      search: null
    }
  },
  result: {
    data: {
      posts: {
        nodes: archiveResults,
        __typename: 'RootPostsConnection'
      }
    }
  }
}, {
  request: {
    query: ARCHIVE_QUERY,
    variables: {
      first: 5,
      category: null,
      tag: null,
      day: null,
      month: null,
      year: 2018,
      author: null,
      search: null
    }
  },
  result: {
    data: {
      posts: {
        nodes: archiveResults,
        __typename: 'RootPostsConnection'
      }
    }
  }
}, {
  request: {
    query: ARCHIVE_QUERY,
    variables: {
      first: 5,
      category: null,
      tag: null,
      day: null,
      month: null,
      year: null,
      author: 'punch45',
      search: null
    }
  },
  result: {
    data: {
      posts: {
        nodes: archiveResults,
        __typename: 'RootPostsConnection'
      }
    }
  }
}, {
  request: {
    query: ARCHIVE_QUERY,
    variables: {
      first: 5,
      category: 'web-dev',
      tag: null,
      day: null,
      month: null,
      year: null,
      author: null,
      search: null
    }
  },
  result: {
    data: {
      posts: {
        nodes: archiveResults,
        __typename: 'RootPostsConnection'
      }
    }
  }
}, {
  request: {
    query: ARCHIVE_QUERY,
    variables: {
      first: 5,
      category: null,
      tag: 'javascript',
      day: null,
      month: null,
      year: null,
      author: null,
      search: null
    }
  },
  result: {
    data: {
      posts: {
        nodes: archiveResults,
        __typename: 'RootPostsConnection'
      }
    }
  }
}, {
  request: {
    query: ARCHIVE_QUERY,
    variables: {
      first: 5,
      category: null,
      tag: null,
      day: null,
      month: null,
      year: null,
      author: null,
      search: 'lorem ipsum'
    }
  },
  result: {
    data: {
      posts: {
        nodes: archiveResults,
        __typename: 'RootPostsConnection'
      }
    }
  }
}, {
  request: {
    query: PAGE_BY_QUERY,
    variables: {
      pageId: null,
      uri: 'nothing'
    }
  },
  result: {
    errors: [{
      message: "The \"uri\" is invalid",
      category: "user",
      locations: [{
        line: 2,
        column: 3
      }],
      path: ["page"]
    }],
    data: {
      pageBy: null
    }
  }
}];
var cache = new InMemoryCache({
  fragmentMatcher: fragmentMatcher
});
it("navigates to a post",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee() {
  var _render, getByTestId, getByText, mainElement, content;

  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _render = render(React.createElement(MockedProvider, {
            mocks: mocks,
            cache: cache,
            addTypename: true
          }, React.createElement(MemoryRouter, {
            initialEntries: ['/09/2018/12/test-post']
          }, React.createElement(Main, {
            "data-testid": "test-main"
          })))), getByTestId = _render.getByTestId, getByText = _render.getByText; // Confirms Main

          _context.next = 3;
          return waitForElement(function () {
            return getByTestId(/test-main/);
          });

        case 3:
          mainElement = _context.sent;
          expect(mainElement).toBeTruthy(); // Confirms Content

          _context.next = 7;
          return waitForElement(function () {
            return getByText(/Hello World/);
          });

        case 7:
          content = _context.sent;
          expect(content).toBeTruthy();

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));
it("navigates to a page",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee2() {
  var _render2, getByTestId, getByText, mainElement, content;

  return _regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _render2 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            cache: cache,
            addTypename: true
          }, React.createElement(MemoryRouter, {
            initialEntries: ['/sample-page']
          }, React.createElement(Main, {
            "data-testid": "test-main"
          })))), getByTestId = _render2.getByTestId, getByText = _render2.getByText; // Confirms Main

          _context2.next = 3;
          return waitForElement(function () {
            return getByTestId(/test-main/);
          });

        case 3:
          mainElement = _context2.sent;
          expect(mainElement).toBeTruthy(); // Confirms Content

          _context2.next = 7;
          return waitForElement(function () {
            return getByText(/Hello World/);
          });

        case 7:
          content = _context2.sent;
          expect(content).toBeTruthy();

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, this);
})));
it("navigates to homepage",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee3() {
  var _render3, getByTestId, getByText, mainElement, content;

  return _regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _render3 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            cache: cache,
            addTypename: true
          }, React.createElement(MemoryRouter, {
            initialEntries: ['/']
          }, React.createElement(Main, {
            "data-testid": "test-main"
          })))), getByTestId = _render3.getByTestId, getByText = _render3.getByText; // Confirms Main

          _context3.next = 3;
          return waitForElement(function () {
            return getByTestId(/test-main/);
          });

        case 3:
          mainElement = _context3.sent;
          expect(mainElement).toBeTruthy(); // Confirms Content

          _context3.next = 7;
          return waitForElement(function () {
            return getByText(/Hello World/);
          });

        case 7:
          content = _context3.sent;
          expect(content).toBeTruthy();

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3, this);
})));
it("navigates to an posts archive of the most recent posts\n  with custom view layer component",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee4() {
  var customMain, CustomMain, _render4, getByTestId, getByText, mainElement, content;

  return _regeneratorRuntime.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          customMain = function customMain(_ref5) {
            var Archive = _ref5.Archive,
                Page = _ref5.Page,
                Post = _ref5.Post,
                Routes = _ref5.Routes,
                rest = _objectWithoutProperties(_ref5, ["Archive", "Page", "Post", "Routes"]);

            return React.createElement("main", rest, React.createElement(Routes, {
              Archive: Archive,
              Page: Page,
              Post: Post
            }));
          };

          CustomMain = main.compose({
            view: customMain
          });
          _render4 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            cache: cache,
            addTypename: true
          }, React.createElement(MemoryRouter, {
            initialEntries: ['/']
          }, React.createElement(CustomMain, {
            "data-testid": "test-main"
          })))), getByTestId = _render4.getByTestId, getByText = _render4.getByText; // Confirms Main

          _context4.next = 5;
          return waitForElement(function () {
            return getByTestId(/test-main/);
          });

        case 5:
          mainElement = _context4.sent;
          expect(mainElement).toBeTruthy(); // Confirms Content

          _context4.next = 9;
          return waitForElement(function () {
            return getByText(/Hello World/);
          });

        case 9:
          content = _context4.sent;
          expect(content).toBeTruthy();

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee4, this);
})));
it("navigates to an posts archive by month",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee5() {
  var _render5, getByTestId, getByText, mainElement, content;

  return _regeneratorRuntime.wrap(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _render5 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            cache: cache,
            addTypename: true
          }, React.createElement(MemoryRouter, {
            initialEntries: ['/2018/09/01']
          }, React.createElement(Main, {
            "data-testid": "test-main"
          })))), getByTestId = _render5.getByTestId, getByText = _render5.getByText; // Confirms Main

          _context5.next = 3;
          return waitForElement(function () {
            return getByTestId(/test-main/);
          });

        case 3:
          mainElement = _context5.sent;
          expect(mainElement).toBeTruthy(); // Confirms Content

          _context5.next = 7;
          return waitForElement(function () {
            return getByText(/Posts made September 1, 2018/);
          });

        case 7:
          content = _context5.sent;
          expect(content).toBeTruthy();

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  }, _callee5, this);
})));
it("navigates to an posts archive by month",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee6() {
  var _render6, getByTestId, getByText, mainElement, content;

  return _regeneratorRuntime.wrap(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _render6 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            cache: cache,
            addTypename: true
          }, React.createElement(MemoryRouter, {
            initialEntries: ['/2018/09']
          }, React.createElement(Main, {
            "data-testid": "test-main"
          })))), getByTestId = _render6.getByTestId, getByText = _render6.getByText; // Confirms Main

          _context6.next = 3;
          return waitForElement(function () {
            return getByTestId(/test-main/);
          });

        case 3:
          mainElement = _context6.sent;
          expect(mainElement).toBeTruthy(); // Confirms Content

          _context6.next = 7;
          return waitForElement(function () {
            return getByText(/Posts made September 2018/);
          });

        case 7:
          content = _context6.sent;
          expect(content).toBeTruthy();

        case 9:
        case "end":
          return _context6.stop();
      }
    }
  }, _callee6, this);
})));
it("navigates to an posts archive by year",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee7() {
  var _render7, getByTestId, getByText, mainElement, content;

  return _regeneratorRuntime.wrap(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _render7 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            cache: cache,
            addTypename: true
          }, React.createElement(MemoryRouter, {
            initialEntries: ['/2018']
          }, React.createElement(Main, {
            "data-testid": "test-main"
          })))), getByTestId = _render7.getByTestId, getByText = _render7.getByText; // Confirms Main

          _context7.next = 3;
          return waitForElement(function () {
            return getByTestId(/test-main/);
          });

        case 3:
          mainElement = _context7.sent;
          expect(mainElement).toBeTruthy(); // Confirms Content

          _context7.next = 7;
          return waitForElement(function () {
            return getByText(/Posts made this year/);
          });

        case 7:
          content = _context7.sent;
          expect(content).toBeTruthy();

        case 9:
        case "end":
          return _context7.stop();
      }
    }
  }, _callee7, this);
})));
it("navigates to an posts archive by author",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee8() {
  var _render8, getByTestId, getByText, mainElement, content;

  return _regeneratorRuntime.wrap(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _render8 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            cache: cache,
            addTypename: true
          }, React.createElement(MemoryRouter, {
            initialEntries: ['/author/punch45']
          }, React.createElement(Main, {
            "data-testid": "test-main"
          })))), getByTestId = _render8.getByTestId, getByText = _render8.getByText; // Confirms Main

          _context8.next = 3;
          return waitForElement(function () {
            return getByTestId(/test-main/);
          });

        case 3:
          mainElement = _context8.sent;
          expect(mainElement).toBeTruthy(); // Confirms Content

          _context8.next = 7;
          return waitForElement(function () {
            return getByText(/Posts made by punch45/);
          });

        case 7:
          content = _context8.sent;
          expect(content).toBeTruthy();

        case 9:
        case "end":
          return _context8.stop();
      }
    }
  }, _callee8, this);
})));
it("navigates to an posts archive by category",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee9() {
  var _render9, getByTestId, getByText, mainElement, content;

  return _regeneratorRuntime.wrap(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _render9 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            cache: cache,
            addTypename: true
          }, React.createElement(MemoryRouter, {
            initialEntries: ['/category/web-dev']
          }, React.createElement(Main, {
            "data-testid": "test-main"
          })))), getByTestId = _render9.getByTestId, getByText = _render9.getByText; // Confirms Main

          _context9.next = 3;
          return waitForElement(function () {
            return getByTestId(/test-main/);
          });

        case 3:
          mainElement = _context9.sent;
          expect(mainElement).toBeTruthy(); // Confirms Content

          _context9.next = 7;
          return waitForElement(function () {
            return getByText(/Posts categorized in Web Development/);
          });

        case 7:
          content = _context9.sent;
          expect(content).toBeTruthy();

        case 9:
        case "end":
          return _context9.stop();
      }
    }
  }, _callee9, this);
})));
it("navigates to an posts archive by tag",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee10() {
  var _render10, getByTestId, getByText, mainElement, content;

  return _regeneratorRuntime.wrap(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _render10 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            cache: cache,
            addTypename: true
          }, React.createElement(MemoryRouter, {
            initialEntries: ['/tag/javascript']
          }, React.createElement(Main, {
            "data-testid": "test-main"
          })))), getByTestId = _render10.getByTestId, getByText = _render10.getByText; // Confirms Main

          _context10.next = 3;
          return waitForElement(function () {
            return getByTestId(/test-main/);
          });

        case 3:
          mainElement = _context10.sent;
          expect(mainElement).toBeTruthy(); // Confirms Content

          _context10.next = 7;
          return waitForElement(function () {
            return getByText(/Posts tagged in Javascript/);
          });

        case 7:
          content = _context10.sent;
          expect(content).toBeTruthy();

        case 9:
        case "end":
          return _context10.stop();
      }
    }
  }, _callee10, this);
})));
it("navigates to an posts archive by search",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee11() {
  var _render11, getByTestId, getByText, mainElement, content;

  return _regeneratorRuntime.wrap(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _render11 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            cache: cache,
            addTypename: true
          }, React.createElement(MemoryRouter, {
            initialEntries: ['/search/lorem ipsum']
          }, React.createElement(Main, {
            "data-testid": "test-main"
          })))), getByTestId = _render11.getByTestId, getByText = _render11.getByText; // Confirms Main

          _context11.next = 3;
          return waitForElement(function () {
            return getByTestId(/test-main/);
          });

        case 3:
          mainElement = _context11.sent;
          expect(mainElement).toBeTruthy(); // Confirms Content

          _context11.next = 7;
          return waitForElement(function () {
            return getByText(/Searching "lorem ipsum"/);
          });

        case 7:
          content = _context11.sent;
          expect(content).toBeTruthy();

        case 9:
        case "end":
          return _context11.stop();
      }
    }
  }, _callee11, this);
})));
it("navigates to an 404 error",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee12() {
  var _render12, getByTestId, getByText, mainElement, content;

  return _regeneratorRuntime.wrap(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _render12 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            cache: cache,
            addTypename: true
          }, React.createElement(MemoryRouter, {
            initialEntries: ['/nothing']
          }, React.createElement(Main, {
            "data-testid": "test-main"
          })))), getByTestId = _render12.getByTestId, getByText = _render12.getByText; // Confirms Main

          _context12.next = 3;
          return waitForElement(function () {
            return getByTestId(/test-main/);
          });

        case 3:
          mainElement = _context12.sent;
          expect(mainElement).toBeTruthy(); // Confirms Content

          _context12.next = 7;
          return waitForElement(function () {
            return getByText(/^Sorry, we can't locate the page you're looking for. Please, try again later.$|^GraphQL error: The "uri" is invalid$/);
          });

        case 7:
          content = _context12.sent;
          expect(content).toBeTruthy();

        case 9:
        case "end":
          return _context12.stop();
      }
    }
  }, _callee12, this);
})));
it("renders loading state", function () {
  var _render13 = render(React.createElement(MockedProvider, {
    mocks: [],
    addTypename: false
  }, React.createElement(MemoryRouter, {
    initialEntries: ['/']
  }, React.createElement(Main, null)))),
      getByText = _render13.getByText,
      getByTestId = _render13.getByTestId;

  var icon = getByTestId(/loading-icon/);
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === '').toBeFalsy();
  expect(getByText(/Loading\.\.\./)).toBeTruthy();
});
it("renders error state",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee13() {
  var errorMocks, _render14, getByTestId, icon, message;

  return _regeneratorRuntime.wrap(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          errorMocks = [{
            request: {
              query: LOOP_QUERY
            },
            error: new Error('its broke')
          }];
          _render14 = render(React.createElement(MockedProvider, {
            mocks: errorMocks,
            addTypename: false
          }, React.createElement(MemoryRouter, {
            initialEntries: ['/']
          }, React.createElement(Main, null)))), getByTestId = _render14.getByTestId;
          _context13.next = 4;
          return waitForElement(function () {
            return getByTestId(/error-icon/);
          });

        case 4:
          icon = _context13.sent;
          expect(icon).toBeTruthy();
          expect(icon.innerHTML === '').toBeFalsy();
          message = getByTestId(/error-message/);
          expect(message).toBeTruthy();
          expect(message.innerHTML === '').toBeFalsy();

        case 10:
        case "end":
          return _context13.stop();
      }
    }
  }, _callee13, this);
})));