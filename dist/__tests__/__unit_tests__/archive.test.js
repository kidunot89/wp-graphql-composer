import _objectWithoutProperties from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import _regeneratorRuntime from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/regenerator";
import _asyncToGenerator from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import React from 'react';
import { map } from 'lodash';
import { render, cleanup, waitForElement } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { MemoryRouter } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { Archive, archive, ARCHIVE_QUERY } from 'archives';
import introspectionQueryResultData from 'fragmentTypes.json';
var fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: introspectionQueryResultData
});
var cache = new InMemoryCache({
  fragmentMatcher: fragmentMatcher
});
var contentOne = '';
var contentTwo = '';
var contentThree = '';
var contentFour = '';
var contentFive = '';
var firstThree = [{
  id: "cG9zdDoxNjA=",
  postId: 160,
  content: contentOne,
  excerpt: contentOne,
  permalink: "/2018/04/20/weed-day",
  date: "2018-04-20 08:54:25",
  modified: "2018-04-22 08:54:25",
  title: "Happy Weed Day!",
  featuredImage: null,
  tags: {
    nodes: [{
      id: "Y2F0ZWdcdnk6HP==",
      name: "Javascript",
      slug: 'javascript',
      __typename: 'Tag'
    }, {
      id: "Y2F0ZWdcdnk6BR==",
      name: "NodeJS",
      slug: 'nodejs',
      __typename: 'Tag'
    }, {
      id: "Y2F0ZWdcdnk6BT==",
      name: "Webpack",
      slug: 'webpack',
      __typename: 'Tag'
    }, {
      id: "Y2F0ZWdcdnk6BA==",
      name: "React",
      slug: 'react',
      __typename: 'Tag'
    }, {
      id: "Y2F0ZWdcdnk6BG==",
      name: "ES6",
      slug: 'es6',
      __typename: 'Tag'
    }],
    __typename: 'PostTagsConnection'
  },
  categories: {
    nodes: [{
      id: "Y2F0ZWdvcnk6MQ==",
      name: "Announcements",
      slug: 'announcements',
      __typename: 'Category'
    }, {
      id: "Y2F0ZWdvcnk6MD==",
      name: "Web Development",
      slug: 'web-dev',
      __typename: 'Category'
    }],
    __typename: 'PostCategoriesConnection'
  },
  author: {
    id: "dXNlcjox",
    userId: 1,
    nicename: "Geminaw Raddy",
    avatar: {
      url: "http://2.gravatar.com/avatar/8cbbea0504f915ea88622f97badd1bed?s=96&d=mm&r=g",
      foundAvatar: true,
      __typename: 'Avatar'
    },
    __typename: 'User'
  },
  __typename: 'Post'
}, {
  id: "cG9zdDoxNjD=",
  postId: 157,
  content: contentTwo,
  excerpt: contentTwo,
  permalink: "/2018/04/16/dank-coming-soon",
  date: "2018-04-16 08:54:25",
  modified: "2018-04-23 08:54:25",
  title: "Four days from the day of dank!",
  featuredImage: null,
  tags: {
    nodes: [],
    __typename: 'PostTagsConnection'
  },
  categories: {
    nodes: [{
      id: "Y2F0ZWdvcnk6MQ==",
      name: "Announcements",
      slug: 'announcements',
      __typename: 'Category'
    }, {
      id: "Y2F0ZWdvcnk6MD==",
      name: "Web Development",
      slug: 'web-dev',
      __typename: 'Category'
    }],
    __typename: 'PostCategoriesConnection'
  },
  author: {
    id: "dXNlcjox",
    userId: 1,
    nicename: "GeminawRaddy",
    avatar: {
      url: "http://2.gravatar.com/avatar/8cbbea0504f915ea88622f97badd1bed?s=96&d=mm&r=g",
      foundAvatar: true,
      __typename: 'Avatar'
    },
    __typename: 'User'
  },
  __typename: 'Post'
}, {
  id: "cG9zdDoxNjG=",
  postId: 156,
  content: contentThree,
  excerpt: contentThree,
  permalink: "/2018/04/12/new-project",
  date: "2018-04-12 08:54:25",
  modified: "2018-04-12 08:54:25",
  title: "New project!",
  featuredImage: null,
  tags: {
    nodes: [{
      id: "Y2F0ZWdcdnk6HP==",
      name: "Javascript",
      slug: 'javascript',
      __typename: 'Tag'
    }, {
      id: "Y2F0ZWdcdnk6HC==",
      name: "HTML",
      slug: 'html',
      __typename: 'Tag'
    }, {
      id: "Y2F0ZWdcdnk6HJ==",
      name: "CSS",
      slug: 'css',
      __typename: 'Tag'
    }],
    __typename: 'PostTagsConnection'
  },
  categories: {
    nodes: [{
      id: "Y2F0ZWdvcnk6MD==",
      name: "Web Development",
      slug: 'web-dev',
      __typename: 'Category'
    }],
    __typename: 'PostCategoriesConnection'
  },
  author: {
    id: "dXNlcjog",
    userId: 2,
    nicename: "MaxKnob",
    avatar: {
      url: "http://2.gravatar.com/avatar/8cbbea0504f915ea88622f97badd1bed?s=96&d=mm&r=g",
      foundAvatar: true,
      __typename: 'Avatar'
    },
    __typename: 'User'
  },
  __typename: 'Post'
}];
var mocks = [{
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
        nodes: firstThree.concat([{
          id: "cG9zdDoxNjY=",
          postId: 152,
          content: contentFour,
          excerpt: contentFour,
          permalink: "/2018/03/29/meditate",
          date: "2018-03-29 08:54:25",
          modified: null,
          title: "Why you should try meditating",
          featuredImage: null,
          tags: {
            nodes: [{
              id: "Y2F0ZWdcdnk6HS==",
              name: 'Tips',
              slug: 'tips',
              __typename: 'Tag'
            }],
            __typename: 'PostTagsConnection'
          },
          categories: {
            nodes: [{
              id: "Y2F0ZWdvcnk6MW==",
              name: "Relaxation",
              slug: 'relaxation',
              __typename: 'Category'
            }],
            __typename: 'PostCategoriesConnection'
          },
          author: {
            id: "dXNlcjox",
            userId: 1,
            nicename: "GeminawRaddy",
            avatar: {
              url: "http://2.gravatar.com/avatar/8cbbea0504f915ea88622f97badd1bed?s=96&d=mm&r=g",
              foundAvatar: true,
              __typename: 'Avatar'
            },
            __typename: 'User'
          },
          __typename: 'Post'
        }, {
          id: "cG9zdDoxNjK=",
          postId: 149,
          content: contentFive,
          excerpt: contentFive,
          permalink: "/2018/03/10/learn-react",
          date: "2018-03-10 08:54:25",
          modified: "2018-03-12 08:54:25",
          title: "Learn React!",
          featuredImage: null,
          tags: {
            nodes: [{
              id: "Y2F0ZWdcdnk6HP==",
              name: "Javascript",
              slug: 'javascript',
              __typename: 'Tag'
            }, {
              id: "Y2F0ZWdcdnk6BR==",
              name: "NodeJS",
              slug: 'nodejs',
              __typename: 'Tag'
            }, {
              id: "Y2F0ZWdcdnk6BT==",
              name: "Webpack",
              slug: 'webpack',
              __typename: 'Tag'
            }, {
              id: "Y2F0ZWdcdnk6BA==",
              name: "React",
              slug: 'react',
              __typename: 'Tag'
            }, {
              id: "Y2F0ZWdcdnk6BG==",
              name: "ES6",
              slug: 'es6',
              __typename: 'Tag'
            }],
            __typename: 'PostTagsConnection'
          },
          categories: {
            nodes: [{
              id: "Y2F0ZWdvcnk6MD==",
              name: "Web Development",
              slug: 'web-dev',
              __typename: 'Category'
            }],
            __typename: 'PostCategoriesConnection'
          },
          author: {
            id: "dXNlcjog",
            userId: 2,
            nicename: "MaxKnob",
            avatar: {
              url: "http://2.gravatar.com/avatar/8cbbea0504f915ea88622f97badd1bed?s=96&d=mm&r=g",
              foundAvatar: true,
              __typename: 'Avatar'
            },
            __typename: 'User'
          },
          __typename: 'Post'
        }]),
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
        nodes: firstThree.concat(),
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
        nodes: firstThree.concat(),
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
      day: 5,
      month: 4,
      year: 2018,
      author: null,
      search: null
    }
  },
  result: {
    data: {
      posts: {
        nodes: firstThree.concat(),
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
      month: 4,
      year: 2018,
      author: null,
      search: null
    }
  },
  result: {
    data: {
      posts: {
        nodes: firstThree.concat(),
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
      year: 2017,
      author: null,
      search: null
    }
  },
  result: {
    data: {
      posts: {
        nodes: firstThree.concat(),
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
      author: "MaxKnob",
      search: null
    }
  },
  result: {
    data: {
      posts: {
        nodes: firstThree.concat(),
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
        nodes: firstThree.concat(),
        __typename: 'RootPostsConnection'
      }
    }
  }
}];
var containerProps = {
  container: true,
  containerProps: {
    'data-testid': 'test-archive'
  }
};
afterEach(cleanup);
it("renders archive of first five most recent posts",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee() {
  var _render, getByTestId, getByText, results, header, count, footers, meta, postedOn, byline, catLinks, tagsLinks;

  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _render = render(React.createElement(MockedProvider, {
            mocks: mocks,
            cache: cache,
            addTypename: true
          }, React.createElement(MemoryRouter, null, React.createElement(Archive, Object.assign({
            first: 5
          }, containerProps))))), getByTestId = _render.getByTestId, getByText = _render.getByText; // Confirms results container

          _context.next = 3;
          return waitForElement(function () {
            return getByTestId(/test-archive/);
          });

        case 3:
          results = _context.sent;
          expect(results).toBeTruthy(); // Confirms header

          header = getByText('Recent Posts');
          expect(header).toBeTruthy(); // Confirms result count

          count = results.querySelectorAll('.post').length;
          expect(count).toBe(5); // Confirm all footers

          footers = results.querySelectorAll('.entry-footer');
          expect(footers.length).toBe(5); // Confirm meta data of first entry

          meta = footers[4];
          postedOn = meta.querySelector('.posted-on');
          expect(postedOn).toBeTruthy();
          byline = meta.querySelector('.byline');
          expect(byline).toBeTruthy();
          catLinks = meta.querySelector('.cat-links');
          expect(catLinks).toBeTruthy();
          tagsLinks = meta.querySelector('.tags-links');
          expect(tagsLinks).toBeTruthy();

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));
it("renders archive of first five posts by day",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee2() {
  var _render2, getByTestId, getByText, results, header, count;

  return _regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _render2 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            cache: cache,
            addTypename: true
          }, React.createElement(MemoryRouter, null, React.createElement(Archive, Object.assign({
            first: 5,
            where: {
              month: 4,
              year: 2018,
              day: 5
            }
          }, containerProps))))), getByTestId = _render2.getByTestId, getByText = _render2.getByText; // Confirms results container

          _context2.next = 3;
          return waitForElement(function () {
            return getByTestId(/test-archive/);
          });

        case 3:
          results = _context2.sent;
          expect(results).toBeTruthy(); // Confirms keywords

          header = getByText(/Posts made April 5, 2018/);
          expect(header).toBeTruthy(); // Confirms result count

          count = results.querySelectorAll('.post').length;
          expect(count).toBe(3);

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, this);
})));
it("renders archive of first five posts by month with a custom view layer component",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee3() {
  var PostResult, customArchive, CustomArchive, _render3, getByTestId, getByText, results, header, count;

  return _regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          PostResult = function PostResult(_ref4) {
            var id = _ref4.id,
                postId = _ref4.postId,
                excerpt = _ref4.excerpt,
                title = _ref4.title,
                featuredImage = _ref4.featuredImage,
                meta = _ref4.meta,
                rest = _objectWithoutProperties(_ref4, ["id", "postId", "excerpt", "title", "featuredImage", "meta"]);

            return React.createElement("article", Object.assign({
              id: "post-".concat(postId),
              className: "post-".concat(postId, " post-type-post")
            }, rest), React.createElement("div", {
              className: "entry-content"
            }, ReactHtmlParser(excerpt)));
          };

          customArchive = function customArchive(_ref5) {
            var Attachment = _ref5.Attachment,
                PostResult = _ref5.PostResult,
                header = _ref5.header,
                _ref5$resultsData = _ref5.resultsData,
                resultsData = _ref5$resultsData === void 0 ? [] : _ref5$resultsData,
                rest = _objectWithoutProperties(_ref5, ["Attachment", "PostResult", "header", "resultsData"]);

            return React.createElement("main", rest, React.createElement("h2", {
              className: "archive-header"
            }, header), map(resultsData, function (_ref6) {
              var id = _ref6.id,
                  r = _objectWithoutProperties(_ref6, ["id"]);

              return React.createElement(PostResult, Object.assign({}, r, {
                id: id,
                key: id
              }));
            }));
          };

          CustomArchive = archive.compose({
            view: customArchive,
            PostResult: PostResult
          });
          _render3 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            cache: cache,
            addTypename: true
          }, React.createElement(MemoryRouter, null, React.createElement(CustomArchive, {
            first: 5,
            where: {
              month: 4,
              year: 2018
            },
            "data-testid": "test-archive"
          })))), getByTestId = _render3.getByTestId, getByText = _render3.getByText; // Confirms results container

          _context3.next = 6;
          return waitForElement(function () {
            return getByTestId(/test-archive/);
          });

        case 6:
          results = _context3.sent;
          expect(results).toBeTruthy(); // Confirms keywords

          header = getByText(/Posts made April 2018/);
          expect(header).toBeTruthy(); // Confirms result count

          count = results.querySelectorAll('.post-type-post').length;
          expect(count).toBe(3);

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3, this);
})));
it("renders archive of first five posts by year",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee4() {
  var _render4, getByTestId, getByText, results, header, count;

  return _regeneratorRuntime.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _render4 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            cache: cache,
            addTypename: true
          }, React.createElement(MemoryRouter, null, React.createElement(Archive, Object.assign({
            first: 5,
            where: {
              year: 2017
            }
          }, containerProps))))), getByTestId = _render4.getByTestId, getByText = _render4.getByText; // Confirms results container

          _context4.next = 3;
          return waitForElement(function () {
            return getByTestId(/test-archive/);
          });

        case 3:
          results = _context4.sent;
          expect(results).toBeTruthy(); // Confirms header

          header = getByText(/Posts made last year/);
          expect(header).toBeTruthy(); // Confirms result count

          count = results.querySelectorAll('.post').length;
          expect(count).toBe(3); // Confirm all footers

          count = results.querySelectorAll('.entry-footer').length;
          expect(count).toBe(3);

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee4, this);
})));
it("renders archive of first five posts by author",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee5() {
  var _render5, getByTestId, getByText, results, header, count;

  return _regeneratorRuntime.wrap(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _render5 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            cache: cache,
            addTypename: true
          }, React.createElement(MemoryRouter, null, React.createElement(Archive, Object.assign({
            first: 5,
            where: {
              author: 'MaxKnob'
            }
          }, containerProps))))), getByTestId = _render5.getByTestId, getByText = _render5.getByText; // Confirms results container

          _context5.next = 3;
          return waitForElement(function () {
            return getByTestId(/test-archive/);
          });

        case 3:
          results = _context5.sent;
          expect(results).toBeTruthy(); // Confirms keywords

          header = getByText(/Posts made by MaxKnob/);
          expect(header).toBeTruthy(); // Confirms result count

          count = results.querySelectorAll('.post').length;
          expect(count).toBe(3); // Confirm all footers

          count = results.querySelectorAll('.entry-footer').length;
          expect(count).toBe(3);

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, _callee5, this);
})));
it("renders archive of first five posts by category",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee6() {
  var _render6, getByTestId, getByText, results, header, count;

  return _regeneratorRuntime.wrap(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _render6 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            cache: cache,
            addTypename: true
          }, React.createElement(MemoryRouter, null, React.createElement(Archive, Object.assign({
            first: 5,
            where: {
              category: 'web-dev'
            }
          }, containerProps))))), getByTestId = _render6.getByTestId, getByText = _render6.getByText; // Confirms results container

          _context6.next = 3;
          return waitForElement(function () {
            return getByTestId(/test-archive/);
          });

        case 3:
          results = _context6.sent;
          expect(results).toBeTruthy(); // Confirms header

          header = getByText(/Posts categorized in Web Development/);
          expect(header).toBeTruthy(); // Confirms result count

          count = results.querySelectorAll('.post').length;
          expect(count).toBe(3); // Confirm all footers

          count = results.querySelectorAll('.entry-footer').length;
          expect(count).toBe(3);

        case 11:
        case "end":
          return _context6.stop();
      }
    }
  }, _callee6, this);
})));
it("renders archive of first five posts by tag",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee7() {
  var _render7, getByTestId, getByText, results, header, count;

  return _regeneratorRuntime.wrap(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _render7 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            cache: cache,
            addTypename: true
          }, React.createElement(MemoryRouter, null, React.createElement(Archive, Object.assign({
            first: 5,
            where: {
              tag: 'javascript'
            }
          }, containerProps))))), getByTestId = _render7.getByTestId, getByText = _render7.getByText; // Confirms results container

          _context7.next = 3;
          return waitForElement(function () {
            return getByTestId(/test-archive/);
          });

        case 3:
          results = _context7.sent;
          expect(results).toBeTruthy(); // Confirms header

          header = getByText(/Posts tagged in Javascript/);
          expect(header).toBeTruthy(); // Confirms result count

          count = results.querySelectorAll('.post').length;
          expect(count).toBe(3); // Confirm all footers

          count = results.querySelectorAll('.entry-footer').length;
          expect(count).toBe(3);

        case 11:
        case "end":
          return _context7.stop();
      }
    }
  }, _callee7, this);
})));
it("renders archive of first five posts by search",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee8() {
  var _render8, getByTestId, getByText, results, header, count;

  return _regeneratorRuntime.wrap(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _render8 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            cache: cache,
            addTypename: true
          }, React.createElement(MemoryRouter, null, React.createElement(Archive, Object.assign({
            first: 5,
            where: {
              search: 'lorem ipsum'
            }
          }, containerProps))))), getByTestId = _render8.getByTestId, getByText = _render8.getByText; // Confirms results container

          _context8.next = 3;
          return waitForElement(function () {
            return getByTestId(/test-archive/);
          });

        case 3:
          results = _context8.sent;
          expect(results).toBeTruthy(); // Confirms header

          header = getByText(/Searching "lorem ipsum"/);
          expect(header).toBeTruthy(); // Confirms result count

          count = results.querySelectorAll('.post').length;
          expect(count).toBe(3); // Confirm all footers

          count = results.querySelectorAll('.entry-footer').length;
          expect(count).toBe(3);

        case 11:
        case "end":
          return _context8.stop();
      }
    }
  }, _callee8, this);
})));
it("renders archive of with no results",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee9() {
  var emptyMocks, _render9, getByTestId, getByText, results, header, count;

  return _regeneratorRuntime.wrap(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          emptyMocks = [{
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
                  nodes: [],
                  __typename: 'RootPostsConnection'
                }
              }
            }
          }];
          _render9 = render(React.createElement(MockedProvider, {
            mocks: emptyMocks,
            addTypename: true
          }, React.createElement(MemoryRouter, null, React.createElement(Archive, Object.assign({
            first: 5
          }, containerProps))))), getByTestId = _render9.getByTestId, getByText = _render9.getByText; // Confirms results container

          _context9.next = 4;
          return waitForElement(function () {
            return getByTestId(/test-archive/);
          });

        case 4:
          results = _context9.sent;
          expect(results).toBeTruthy(); // Confirms header

          header = getByText(/No posts found/);
          expect(header).toBeTruthy(); // Confirms result count

          count = results.querySelectorAll('.post-type-post').length;
          expect(count).toBe(0);

        case 10:
        case "end":
          return _context9.stop();
      }
    }
  }, _callee9, this);
})));
it("renders a loading state", function () {
  var _render10 = render(React.createElement(MockedProvider, {
    mocks: [],
    addTypename: false
  }, React.createElement(Archive, {
    first: 5
  }))),
      getByText = _render10.getByText,
      getByTestId = _render10.getByTestId;

  var icon = getByTestId(/loading-icon/);
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === '').toBeFalsy();
  expect(getByText(/Loading\.\.\./)).toBeTruthy();
});
it("renders error state",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee10() {
  var errorMocks, _render11, getByTestId, icon, message;

  return _regeneratorRuntime.wrap(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          errorMocks = [{
            request: {
              query: ARCHIVE_QUERY,
              variables: {
                first: 5,
                category: null,
                tag: null,
                author: null,
                search: null,
                month: null,
                year: null
              }
            },
            error: new Error('its broke')
          }];
          _render11 = render(React.createElement(MockedProvider, {
            mocks: errorMocks,
            addTypename: false
          }, React.createElement(Archive, {
            first: 5
          }))), getByTestId = _render11.getByTestId;
          _context10.next = 4;
          return waitForElement(function () {
            return getByTestId(/error-icon/);
          });

        case 4:
          icon = _context10.sent;
          expect(icon).toBeTruthy();
          expect(icon.innerHTML === '').toBeFalsy();
          message = getByTestId(/error-message/);
          expect(message).toBeTruthy();
          expect(message.innerHTML === '').toBeFalsy();

        case 10:
        case "end":
          return _context10.stop();
      }
    }
  }, _callee10, this);
})));