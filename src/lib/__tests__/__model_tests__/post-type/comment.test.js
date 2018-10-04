import React from 'react';
import v3 from 'uuid/v3';
import _ from 'lodash';
import {
  render, cleanup, waitForElement, wait,
  fireEvent,
} from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';

import { 
  POST_COMMENTS_QUERY, DELETE_COMMENT_MUTATION,
  NEW_COMMENT_MUTATION, UPDATE_COMMENT_MUTATION,
  PostComments, postComments,
} from 'lib';
import introspectionQueryResultData from 'lib/fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const cache = new InMemoryCache({ fragmentMatcher });

afterEach(cleanup);

const message = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor, autem?';

const now = new Date();

it(`renders post comments`, async () => {
  const mocks = [
    {
      request: {
        query: POST_COMMENTS_QUERY,
        variables: { id: "xTWinK3L" }
      },
      result: {
        data: {
          viewer: null,
          post: {
            id: "xTWinK3L",
            postId: 1,
            commentStatus: "open",
            comments: {
              nodes: [
                {
                  id: "Y29tbWVudDox",
                  commentId: 1,
                  type: "",
                  content: "<p>Welcome to the Danger Zone</p>\n",
                  date: "2018-09-12 23:02:46",
                  author: {
                    id: "Y29tbWVudEF1dGhvcjp3YXB1dUB3b3JkcHJlc3MuZXhhbXBsZQ==",
                    name: "A WordPress Commenter",
                    __typename: "CommentAuthor",
                  },
                  __typename: 'Comment',
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
                    __typename: "User",
                  },
                  __typename: 'Comment',
                },
              ],
              __typename: 'PostCommentsConnection',
            },
            __typename: 'Post',
          }
        }
      }
    }
  ];

  const { getByTestId } = render(
    <MockedProvider mocks={mocks} cache={cache} addTypename>
      <PostComments id="xTWinK3L" data-testid="test-comments" />
    </MockedProvider>
  );

  const comments = await waitForElement(() => getByTestId(/test-comments/));
  expect(comments).toBeTruthy();

  const count = comments.querySelectorAll('.comment').length;
  expect(count).toBe(2);
});


it(`render post comments with a custom view component`, async () => {
  const CustomPostComments = postComments.compose({
    /**
     * Post Comments view component
     */
    view: ({
      postId, commentsData, newCommentState,
      commentView: CommentView, editCommentView: EditCommentView,
      open,
      ...rest
    }) => (
      <React.Fragment>
        <div id={`post-${postId}-comments`} {...rest}>
          {_.map(
            commentsData,
            ({ id: commentId, ...rest }) => (
              <CommentView {...{ ...rest, EditCommentView }} key={commentId} className="comment" />
            ))}
        </div>
        { open &&
          <EditCommentView
            {...newCommentState}
          />
        }
      </React.Fragment>
    ),
    /**
     * Comment view component
     */
    commentView: ({
      id, commentId, type, content,
      date, author, onEdit, onDelete,
      editing, EditCommentView, onUpdate,
      onChange, ...rest
    }) => {
      if (editing) return (
        <EditCommentView
          comment={commentId}
          message={content}
          onChange={onChange}
          onSubmit={onUpdate}
        />)
      return (
        <div id={`comment-${commentId}`} {...rest}>
          {onEdit && <button className="edit-button" data-target={`comment-${id}`} onClick={onEdit}></button>}
          {onDelete && <button className="delete-button" data-target={`comment-${id}`} onClick={onDelete}></button>}
          <div>{content}</div>
        </div>
      );
    },
    /**
     * Edit commment view component
     */
    editCommentView: ({
      id, message, onChange, onSubmit,
      submitButtonText, author, email, ...rest
    }) => (
      <form id={id} {...rest}>
        {author && <input type="text" name="author" value={author} onChange={onChange} />}
        {author && <input type="text" name="email" value={email} onChange={onChange} />}
        <textarea name="message" value={message} onChange={onChange} />
        <button onClick={onSubmit}>{submitButtonText}</button>      
      </form>
    ),
  });

  const mocks = [
    {
      request: {
        query: POST_COMMENTS_QUERY,
        variables: { id: "xTWinK3L" }
      },
      result: {
        data: {
          viewer: null,
          post: {
            id: "xTWinK3L",
            postId: 1,
            commentStatus: "open",
            comments: {
              nodes: [
                {
                  id: "Y29tbWVudDox",
                  commentId: 1,
                  type: "",
                  content: "<p>Welcome to the Danger Zone</p>\n",
                  date: "2018-09-12 23:02:46",
                  author: {
                    id: "Y29tbWVudEF1dGhvcjp3YXB1dUB3b3JkcHJlc3MuZXhhbXBsZQ==",
                    name: "A WordPress Commenter",
                    __typename: 'CommentAuthor'
                  }
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
                    __typename: "User",
                  },
                  __typename: 'Comment',
                },
              ],
              __typename: 'PostCommentsConnection',
            },
            __typename: 'Post',
          }
        }
      }
    }
  ];

  const { getByTestId } = render(
    <MockedProvider mocks={mocks} addTypename cache={cache}>
      <CustomPostComments id="xTWinK3L" data-testid="test-comments" />
    </MockedProvider>
  );

  const comments = await waitForElement(() => getByTestId(/test-comments/));
  expect(comments).toBeTruthy();

  const list = comments.querySelectorAll('.comment');
  expect(list.length).toBe(2)
});


it(`create a new post comment`, async () => {
  const mocks = [
    {
      request: {
        query: POST_COMMENTS_QUERY,
        variables: { id: "xTWinK3L" }
      },
      result: {
        data: {
          viewer: null,
          post: {
            id: "xTWinK3L",
            postId: 1,
            commentStatus: "open",
            comments: {
              nodes: [
                {
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
                    __typename: "User",
                  },
                  __typename: 'Comment',
                },
              ],
              __typename: 'PostCommentsConnection',
            },
            __typename: 'Post',
          }
        }
      }
    }, {
      request: {
        query: NEW_COMMENT_MUTATION,
        variables: {
          agent: null,
          approved: null,
          author: 'Jim Bean',
          authorEmail: 'beanie-w-da-zeenie@somebadplace.org',
          authorIp: null,
          authorUrl: null,
          type: null,
          userId: null,
          parent: null,
          postId: 1,
          content: message,
          date: `${now.getMonth()}/${now.getDate()}/${now.getFullYear()}`,
          clientId: '7daa4945-72cd-3911-a79b-408100c44b19',
        }
      },
      result: {
        data: {
          createComment: {
            clientMutationId: '7daa4945-72cd-3911-a79b-408100c44b19',
            comment: {
              id: "Y29tbWVudDoc",
              commentId: 3,
              type: "",
              content: message,
              date: `${now.getMonth()}/${now.getDate()}/${now.getFullYear()}`,
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
        query: POST_COMMENTS_QUERY,
        variables: { id: "xTWinK3L" }
      },
      result: {
        data: {
          viewer: null,
          post: {
            id: "xTWinK3L",
            postId: 1,
            commentStatus: "open",
            comments: {
              nodes: [
                {
                  id: "Y29tbWVudDox",
                  commentId: 1,
                  type: "",
                  content: "Welcome to the Danger Zone",
                  date: "2018-09-12 23:02:46",
                  author: {
                    id: "Y29tbWVudEF1dGhvcjp3YXB1dUB3b3JkcHJlc3MuZXhhbXBsZQ==",
                    name: "A WordPress Commenter",
                    __typename: "CommentAuthor"
                  },
                  __typename: 'Comment',
                }, {
                  id: "Y29tbWVudDoj",
                  commentId: 2,
                  type: "",
                  content: "No, welcome to the Deez Nutz",
                  date: "2018-09-12 23:02:46",
                  author: {
                    id: "DxjoniDx",
                    userId: 3,
                    nicename: "JebusDaMan",
                    __typename: "User",
                  },
                  __typename: 'Comment',
                }, {
                  id: "Y29tbWVudDoc",
                  commentId: 3,
                  type: "",
                  content: message,
                  date: `${now.getMonth()}/${now.getDate()}/${now.getFullYear()}`,
                  author: {
                    id: "Y29tbWVudEF1dGhvcjp3YXB1dUB3b3JkcHJlc3MuZXhhbXBsZJ==",
                    name: "Jim Bean",
                    __typename: 'CommentAuthor'
                  },
                  __typename: 'Comment',
                },
              ],
              __typename: 'PostCommentsConnection',
            },
            __typename: 'Post',
          }
        }
      }
    }
  ];

  const { getByPlaceholderText, getByTestId, getByText } = render(
    <MockedProvider mocks={mocks} addTypename cache={cache}>
      <PostComments id="xTWinK3L" data-testid="test-comments" />
    </MockedProvider>
  );

  const comments = await waitForElement(() => getByTestId(/test-comments/));
  expect(comments).toBeTruthy();

  let list = comments.querySelectorAll('.comment');
  expect(list.length).toBe(2);

  const authorInput = getByPlaceholderText(/Name/);
  expect(authorInput).toBeTruthy();

  const emailInput = getByPlaceholderText(/Email/);
  expect(emailInput).toBeTruthy();

  const messageBox = getByPlaceholderText(/Message/);
  expect(messageBox).toBeTruthy();

  // Input login info
  fireEvent.change(authorInput, { target: { value: 'Jim Bean' } });
  fireEvent.change(emailInput, { target: { value: 'beanie-w-da-zeenie@somebadplace.org' } });
  fireEvent.change(messageBox, { target: { value: message } });

  // Fire click event
  fireEvent.click(getByText(/Leave Comment/));

  await waitForElement(() => comments.querySelector('#comment-3'));

  const newComment = await waitForElement(() => getByText(message));
  expect(newComment).toBeTruthy();
  console.log(newComment.outerHTML)
});


it(`updates an existing post comment`, async () => {
  const mocks = [
    {
      request: {
        query: POST_COMMENTS_QUERY,
        variables: { id: "xTWinK3L" }
      },
      result: {
        data: {
          viewer: {
            id: "DxjoniDx",
            userId: 3,
            nicename: "JebusDaMan",
            firstName: 'Dexter'
          },
          post: {
            id: "xTWinK3L",
            postId: 1,
            commentStatus: "open",
            comments: {
              nodes: [
                {
                  id: "Y29tbWVudDox",
                  commentId: 1,
                  type: "",
                  content: "<p>Welcome to the Danger Zone</p>\n",
                  date: "2018-09-12 23:02:46",
                  author: {
                    id: "Y29tbWVudEF1dGhvcjp3YXB1dUB3b3JkcHJlc3MuZXhhbXBsZQ==",
                    name: "A WordPress Commenter"
                  }
                }, {
                  id: "Y29tbWVudDoj",
                  commentId: 2,
                  type: "",
                  content: "<p>No, welcome to the Deez Nutz</p>\n",
                  date: "2018-09-12 23:02:46",
                  author: {
                    id: "DxjoniDx",
                    userId: 3,
                    nicename: "JebusDaMan"
                  }
                }
              ]
            }
          }
        }
      }
    },{
      request: {
        query: UPDATE_COMMENT_MUTATION,
        variables: {
          id: "Y29tbWVudDoj",
          content: message,
          clientId: v3('Y29tbWVudDojupdate', v3.URL),
          date: `${now.getMonth()}/${now.getDate()}/${now.getFullYear()}`,
        }
      },
      result: {
        data: {
          createComment: {
            clientMutationId: 'some_id',
            comment: {
              id: "Y29tbWVudDoc",
              commentId: 3,
              type: "",
              content: message,
              date: "2018-09-12 23:05:46",
              author: {
                id: "DxjoniDx",
                userId: 3,
                nicename: "JebusDaMan"
              }
            }
          }
        }
      }
    }
  ];

  const { getByPlaceholderText, getByTestId, getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false} cache={cache}>
      <PostComments  id="xTWinK3L" data-testid="test-comments" />
    </MockedProvider>
  );

  const comments = await waitForElement(() => getByTestId(/test-comments/));
  expect(comments).toBeTruthy();

  const list = comments.querySelectorAll('.comment');
  expect(list.length).toBe(2);

  // Fire click event
  fireEvent.click(comments.querySelector('.edit-button'));

  const messageBox = await waitForElement(() => comments.querySelector('#comment-1 textarea'));
  expect(messageBox).toBeTruthy();

  // Input login info
  fireEvent.change(messageBox, { target: { value: message } });

  // Fire click event
  fireEvent.click(getByText(/Save Changes/));

  const updatedComment = await waitForElement(() => getByText(message));
  expect(updatedComment).toBeTruthy();
});


it(`deletes an existing post comment`, async () => {
  const mocks = [
    {
      request: {
        query: POST_COMMENTS_QUERY,
        variables: { id: "xTWinK3L" }
      },
      result: {
        data: {
          viewer: {
            id: "DxjoniDx",
            userId: 3,
            nicename: "JebusDaMan",
            firstName: 'Dexter'
          },
          post: {
            id: "xTWinK3L",
            postId: 1,
            commentStatus: "open",
            comments: {
              nodes: [
                {
                  id: "Y29tbWVudDox",
                  commentId: 1,
                  type: "",
                  content: "<p>Welcome to the Danger Zone</p>\n",
                  date: "2018-09-12 23:02:46",
                  author: {
                    id: "Y29tbWVudEF1dGhvcjp3YXB1dUB3b3JkcHJlc3MuZXhhbXBsZQ==",
                    name: "A WordPress Commenter"
                  }
                }, {
                  id: "Y29tbWVudDoj",
                  commentId: 1,
                  type: "",
                  content: "<p>No, welcome to the Deez Nutz</p>\n",
                  date: "2018-09-12 23:02:46",
                  author: {
                    id: "DxjoniDx",
                    userId: 3,
                    nicename: "JebusDaMan"
                  }
                }
              ]
            }
          }
        }
      }
    },{
      request: {
        query: DELETE_COMMENT_MUTATION,
        variables: {
          id: "Y29tbWVudDox",
          clientId: v3('Y29tbWVudDoxdelete', v3.URL),
        }
      },
      result: {
        data: {
          createComment: {
            clientMutationId: 'some_id',
            comment: {
              id: "Y29tbWVudDoc",
              commentId: 3,
              type: "",
              content: message,
              date: "2018-09-12 23:05:46",
              author: {
                id: "DxjoniDx",
                userId: 3,
                nicename: "JebusDaMan"
              }
            }
          }
        }
      }
    }
  ];

  const { getByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false} cache={cache}>
      <PostComments id="xTWinK3L" data-testid="test-comments" />
    </MockedProvider>
  );

  const comments = await waitForElement(() => getByTestId(/test-comments/));
  expect(comments).toBeTruthy();

  const list = comments.querySelectorAll('.comment');
  expect(list.length).toBe(2);

  // Fire click event
  fireEvent.click(comments.querySelector('.delete-button'));

  await wait(() => expect(list.length).toBe(1));
});


it(`renders a loading state`, () => {
  const { getByText, getByTestId } = render(
    <MockedProvider mocks={[]} addTypename={false}>
      <PostComments id="xUP0Sho" />
    </MockedProvider>,
  );

  const icon = getByTestId(/loading-icon/);
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === '').toBeFalsy();
  expect(getByText(/Loading\.\.\./)).toBeTruthy();
});


it(`renders error state`, async () => {
  const mocks = [{
    request: {
      query: POST_COMMENTS_QUERY,
      variables: { id: "xUP0Sho" },
    },
    error: new Error('its broke'),
  }];

  const { getByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false} cache={cache}>
      <PostComments id="xUP0Sho" />
    </MockedProvider>,
  );

  const icon = await waitForElement(() => getByTestId(/error-icon/));
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === '').toBeFalsy();
  const message = getByTestId(/error-message/);
  expect(message).toBeTruthy();
  expect(message.innerHTML === '').toBeFalsy();
});
