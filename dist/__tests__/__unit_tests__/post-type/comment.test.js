import _objectSpread from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectSpread";
import _objectWithoutProperties from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import _regeneratorRuntime from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/regenerator";
import _asyncToGenerator from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import React from 'react';
import _ from 'lodash';
import { render, cleanup, waitForElement, wait, fireEvent } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { MemoryRouter } from 'react-router-dom';
import { POST_COMMENTS_QUERY, DELETE_COMMENT_MUTATION, NEW_COMMENT_MUTATION, UPDATE_COMMENT_MUTATION, PostComments, postComments } from 'post-type';
import introspectionQueryResultData from 'fragmentTypes.json';
var fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: introspectionQueryResultData
});
var cache = new InMemoryCache({
  fragmentMatcher: fragmentMatcher
});
afterEach(cleanup);
var message = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor, autem?';
var messageTwo = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Age sane, inquam. Quid igitur, inquit, eos responsuros putas?';
var now = new Date();
var mocks = [{
  request: {
    query: POST_COMMENTS_QUERY,
    variables: {
      id: "xTWinK3L"
    }
  },
  result: {
    data: {
      post: {
        id: "xTWinK3L",
        postId: 1,
        title: 'This @%#* just got real',
        commentStatus: "open",
        comments: {
          nodes: [{
            id: "Y29tbWVudDox",
            commentId: 1,
            type: "",
            content: "<p>Welcome to the Danger Zone</p>\n",
            date: "2018-09-12 23:02:46",
            author: {
              id: "Y29tbWVudEF1dGhvcjp3YXB1dUB3b3JkcHJlc3MuZXhhbXBsZQ==",
              name: "A WordPress Commenter",
              __typename: "CommentAuthor"
            },
            __typename: "Comment"
          }, {
            id: "Y29tbWVudDoj",
            commentId: 2,
            type: "",
            content: "<p>No, welcome to the Deez Nutz</p>\n",
            date: "2018-09-12 23:02:46",
            author: {
              id: "DxjoniDx",
              userId: 3,
              nicename: "JebusDaMan",
              avatar: null,
              __typename: "User"
            },
            __typename: 'Comment'
          }],
          __typename: 'PostCommentsConnection'
        },
        __typename: 'Post'
      }
    }
  }
}, {
  request: {
    query: NEW_COMMENT_MUTATION,
    variables: {
      author: 'Jim Bean',
      authorEmail: 'beanie-w-da-zeenie@somebadplace.org',
      authorUrl: "",
      type: null,
      userId: null,
      parent: null,
      postId: 1,
      content: message,
      date: "".concat(now.getMonth(), "/").concat(now.getDate(), "/").concat(now.getFullYear()),
      clientId: '9d2a150f-e278-3a4a-81ab-45e62269c08c'
    }
  },
  result: {
    data: {
      createComment: {
        clientMutationId: '9d2a150f-e278-3a4a-81ab-45e62269c08c',
        comment: {
          id: "Y29tbWVudDoc",
          commentId: 3,
          type: "",
          content: message,
          date: "".concat(now.getMonth(), "/").concat(now.getDate(), "/").concat(now.getFullYear()),
          author: {
            id: "Y29tbWVudEF1dGhvcjp3YXB1dUB3b3JkcHJlc3MuZXhhbXBsZJ==",
            name: "Jim Bean",
            __typename: 'CommentAuthor'
          },
          __typename: 'Comment'
        },
        __typename: 'CreateCommentPayload'
      }
    }
  }
}, {
  request: {
    query: UPDATE_COMMENT_MUTATION,
    variables: {
      type: null,
      id: "Y29tbWVudDoj",
      content: messageTwo,
      clientId: 'd9ef8077-d37c-3d31-8a50-ee097a3d33f3'
    }
  },
  result: {
    data: {
      updateComment: {
        clientMutationId: 'd9ef8077-d37c-3d31-8a50-ee097a3d33f3',
        comment: {
          id: "Y29tbWVudDoj",
          commentId: 2,
          type: "",
          content: messageTwo,
          date: '2018-09-12 23:02:46',
          author: {
            id: "DxjoniDx",
            userId: 3,
            nicename: "JebusDaMan",
            avatar: null,
            __typename: 'User'
          },
          __typename: 'Comment'
        },
        __typename: 'UpdateCommentPayload'
      }
    }
  }
}, {
  request: {
    query: DELETE_COMMENT_MUTATION,
    variables: {
      id: "Y29tbWVudDoj",
      clientId: 'f6c8eba6-1d9c-30ef-8c15-973571bfc7fe'
    }
  },
  result: {
    data: {
      deleteComment: {
        clientMutationId: 'f6c8eba6-1d9c-30ef-8c15-973571bfc7fe',
        comment: {
          id: "Y29tbWVudDoj",
          commentId: 2,
          type: "",
          content: messageTwo,
          date: '2018-09-12 23:02:46',
          author: {
            id: "DxjoniDx",
            userId: 3,
            nicename: "JebusDaMan",
            avatar: null,
            __typename: 'User'
          },
          __typename: 'Comment'
        },
        __typename: 'DeleteCommentPayload'
      }
    }
  }
}];
it("renders post comments",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee() {
  var _render, getByTestId, comments, count;

  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _render = render(React.createElement(MockedProvider, {
            mocks: mocks,
            cache: cache,
            addTypename: true
          }, React.createElement(MemoryRouter, null, React.createElement(PostComments, {
            id: "xTWinK3L",
            "data-testid": "test-comments"
          })))), getByTestId = _render.getByTestId;
          _context.next = 3;
          return waitForElement(function () {
            return getByTestId(/test-comments/);
          });

        case 3:
          comments = _context.sent;
          expect(comments).toBeTruthy();
          count = comments.querySelectorAll('ol>li.comment').length;
          expect(count).toBe(2);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));
it("render post comments with a custom view component",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee2() {
  var CustomPostComments, _render2, getByTestId, comments, list;

  return _regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          CustomPostComments = postComments.compose({
            /**
             * Post Comments view component
             */
            view: function view(_ref3) {
              var postId = _ref3.postId,
                  commentsData = _ref3.commentsData,
                  newCommentState = _ref3.newCommentState,
                  CommentView = _ref3.commentView,
                  EditCommentView = _ref3.editCommentView,
                  open = _ref3.open,
                  rest = _objectWithoutProperties(_ref3, ["postId", "commentsData", "newCommentState", "commentView", "editCommentView", "open"]);

              return React.createElement(React.Fragment, null, React.createElement("div", Object.assign({
                id: "post-".concat(postId, "-comments")
              }, rest), _.map(commentsData, function (_ref4) {
                var commentId = _ref4.id,
                    rest = _objectWithoutProperties(_ref4, ["id"]);

                return React.createElement(CommentView, Object.assign({}, _objectSpread({}, rest, {
                  EditCommentView: EditCommentView
                }), {
                  key: commentId,
                  className: "comment"
                }));
              })), open && React.createElement(EditCommentView, newCommentState));
            },

            /**
             * Comment view component
             */
            commentView: function commentView(_ref5) {
              var id = _ref5.id,
                  commentId = _ref5.commentId,
                  type = _ref5.type,
                  content = _ref5.content,
                  date = _ref5.date,
                  author = _ref5.author,
                  onEdit = _ref5.onEdit,
                  onDelete = _ref5.onDelete,
                  editing = _ref5.editing,
                  EditCommentView = _ref5.EditCommentView,
                  onUpdate = _ref5.onUpdate,
                  onChange = _ref5.onChange,
                  rest = _objectWithoutProperties(_ref5, ["id", "commentId", "type", "content", "date", "author", "onEdit", "onDelete", "editing", "EditCommentView", "onUpdate", "onChange"]);

              if (editing) return React.createElement(EditCommentView, {
                comment: commentId,
                message: content,
                onChange: onChange,
                onSubmit: onUpdate
              });
              return React.createElement("div", Object.assign({
                id: "comment-".concat(commentId)
              }, rest), onEdit && React.createElement("button", {
                className: "edit-button",
                "data-target": "comment-".concat(id),
                onClick: onEdit
              }), onDelete && React.createElement("button", {
                className: "delete-button",
                "data-target": "comment-".concat(id),
                onClick: onDelete
              }), React.createElement("div", null, content));
            },

            /**
             * Edit commment view component
             */
            editCommentView: function editCommentView(_ref6) {
              var id = _ref6.id,
                  message = _ref6.message,
                  onChange = _ref6.onChange,
                  onSubmit = _ref6.onSubmit,
                  submitButtonText = _ref6.submitButtonText,
                  author = _ref6.author,
                  email = _ref6.email,
                  rest = _objectWithoutProperties(_ref6, ["id", "message", "onChange", "onSubmit", "submitButtonText", "author", "email"]);

              return React.createElement("form", Object.assign({
                id: id
              }, rest), author && React.createElement("input", {
                type: "text",
                name: "author",
                value: author,
                onChange: onChange
              }), author && React.createElement("input", {
                type: "text",
                name: "email",
                value: email,
                onChange: onChange
              }), React.createElement("textarea", {
                name: "message",
                value: message,
                onChange: onChange
              }), React.createElement("button", {
                onClick: onSubmit
              }, submitButtonText));
            }
          });
          _render2 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            addTypename: true,
            cache: cache
          }, React.createElement(MemoryRouter, null, React.createElement(CustomPostComments, {
            id: "xTWinK3L",
            "data-testid": "test-comments"
          })))), getByTestId = _render2.getByTestId;
          _context2.next = 4;
          return waitForElement(function () {
            return getByTestId(/test-comments/);
          });

        case 4:
          comments = _context2.sent;
          expect(comments).toBeTruthy();
          list = comments.querySelectorAll('.comment');
          expect(list.length).toBe(2);

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, this);
})));
it("create a new post comment",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee3() {
  var _render3, getByPlaceholderText, getByTestId, getByText, comments, list, authorInput, emailInput, messageBox, newComment;

  return _regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _render3 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            addTypename: true,
            cache: cache
          }, React.createElement(MemoryRouter, null, React.createElement(PostComments, {
            id: "xTWinK3L",
            "data-testid": "test-comments"
          })))), getByPlaceholderText = _render3.getByPlaceholderText, getByTestId = _render3.getByTestId, getByText = _render3.getByText;
          _context3.next = 3;
          return waitForElement(function () {
            return getByTestId(/test-comments/);
          });

        case 3:
          comments = _context3.sent;
          expect(comments).toBeTruthy();
          list = comments.querySelectorAll('ol>li.comment');
          expect(list.length).toBe(2); // Fire add event

          fireEvent.click(getByText(/Add Comment/));
          _context3.next = 10;
          return waitForElement(function () {
            return getByPlaceholderText(/Name/);
          });

        case 10:
          authorInput = _context3.sent;
          expect(authorInput).toBeTruthy();
          emailInput = getByPlaceholderText(/Email/);
          expect(emailInput).toBeTruthy();
          messageBox = getByPlaceholderText(/Message/);
          expect(messageBox).toBeTruthy(); // Input login info

          fireEvent.change(authorInput, {
            target: {
              value: 'Jim Bean'
            }
          });
          fireEvent.change(emailInput, {
            target: {
              value: 'beanie-w-da-zeenie@somebadplace.org'
            }
          });
          fireEvent.change(messageBox, {
            target: {
              value: message
            }
          }); // Fire save event

          fireEvent.click(getByText(/Leave Comment/));
          _context3.next = 22;
          return waitForElement(function () {
            return comments.querySelector('#comment-3');
          });

        case 22:
          _context3.next = 24;
          return waitForElement(function () {
            return getByText(message);
          });

        case 24:
          newComment = _context3.sent;
          expect(newComment).toBeTruthy();

        case 26:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3, this);
})));
it("updates an existing post comment",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee4() {
  var _render4, getByTestId, getByText, comments, list, messageBox, updatedComment;

  return _regeneratorRuntime.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _render4 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            addTypename: true,
            cache: cache
          }, React.createElement(MemoryRouter, null, React.createElement(PostComments, {
            id: "xTWinK3L",
            userId: 3,
            "data-testid": "test-comments"
          })))), getByTestId = _render4.getByTestId, getByText = _render4.getByText;
          _context4.next = 3;
          return waitForElement(function () {
            return getByTestId(/test-comments/);
          });

        case 3:
          comments = _context4.sent;
          expect(comments).toBeTruthy();
          list = comments.querySelectorAll('.comment');
          expect(list.length).toBe(3); // Fire edit event

          fireEvent.click(getByText(/Edit/));
          _context4.next = 10;
          return waitForElement(function () {
            return comments.querySelector('#comment-2 textarea');
          });

        case 10:
          messageBox = _context4.sent;
          expect(messageBox).toBeTruthy(); // Input login info

          fireEvent.change(messageBox, {
            target: {
              value: messageTwo
            }
          }); // Fire update event

          fireEvent.click(getByText(/Save Changes/));
          _context4.next = 16;
          return waitForElement(function () {
            return comments.querySelector('#comment-2 .comment-content');
          });

        case 16:
          updatedComment = _context4.sent;
          expect(updatedComment.innerHTML).toEqual(messageTwo);

        case 18:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee4, this);
})));
it("deletes an existing post comment",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee5() {
  var _render5, getByText, getByTestId, comments, target;

  return _regeneratorRuntime.wrap(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _render5 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            addTypename: true,
            cache: cache
          }, React.createElement(MemoryRouter, null, React.createElement(PostComments, {
            id: "xTWinK3L",
            userId: 3,
            "data-testid": "test-comments"
          })))), getByText = _render5.getByText, getByTestId = _render5.getByTestId;
          _context5.next = 3;
          return waitForElement(function () {
            return getByTestId(/test-comments/);
          });

        case 3:
          comments = _context5.sent;
          expect(comments).toBeTruthy();
          expect(comments.querySelectorAll('.comment-content').length).toBe(3);
          target = comments.querySelector('#comment-2');
          expect(target).toBeTruthy(); // Fire delete event

          fireEvent.click(getByText(/Delete/));
          _context5.next = 11;
          return wait(function () {
            return expect(getByTestId(/test-comments/).querySelectorAll('.comment-content').length).toBe(2);
          }, {
            timeout: 4500
          });

        case 11:
          console.log(comments.innerHTML);

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, _callee5, this);
})));
it("renders a loading state", function () {
  var _render6 = render(React.createElement(MockedProvider, {
    mocks: [],
    addTypename: false
  }, React.createElement(PostComments, {
    id: "xUP0Sho"
  }))),
      getByText = _render6.getByText,
      getByTestId = _render6.getByTestId;

  var icon = getByTestId(/loading-icon/);
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === '').toBeFalsy();
  expect(getByText(/Loading\.\.\./)).toBeTruthy();
});
it("renders error state",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee6() {
  var mocks, _render7, getByTestId, icon, message;

  return _regeneratorRuntime.wrap(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          mocks = [{
            request: {
              query: POST_COMMENTS_QUERY,
              variables: {
                id: "xUP0Sho"
              }
            },
            error: new Error('its broke')
          }];
          _render7 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            addTypename: false,
            cache: cache
          }, React.createElement(PostComments, {
            id: "xUP0Sho"
          }))), getByTestId = _render7.getByTestId;
          _context6.next = 4;
          return waitForElement(function () {
            return getByTestId(/error-icon/);
          });

        case 4:
          icon = _context6.sent;
          expect(icon).toBeTruthy();
          expect(icon.innerHTML === '').toBeFalsy();
          message = getByTestId(/error-message/);
          expect(message).toBeTruthy();
          expect(message.innerHTML === '').toBeFalsy();

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, _callee6, this);
})));