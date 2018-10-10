import React from 'react';
import _ from 'lodash';
import {
  render, cleanup, waitForElement, wait,
  fireEvent,
} from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { MemoryRouter } from 'react-router-dom';

import { 
  POST_COMMENTS_QUERY, DELETE_COMMENT_MUTATION,
  NEW_COMMENT_MUTATION, UPDATE_COMMENT_MUTATION,
  PostComments, postComments,
} from 'post-type';
import introspectionQueryResultData from 'fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const cache = new InMemoryCache({ fragmentMatcher });

afterEach(cleanup);

const message = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor, autem?';

const messageTwo = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Age sane, inquam. Quid igitur, inquit, eos responsuros putas?'

const now = new Date();

const mocks = [
  {
    request: {
      query: POST_COMMENTS_QUERY,
      variables: { id: "xTWinK3L" }
    },
    result: {
      data: {
        post: {
          id: "xTWinK3L",
          postId: 1,
          title: 'This @%#* just got real',
          commentStatus: "open",
          comments: {
            nodes: [
              {
                id: "Y29tbWVudDox",
                commentId: 1,
                type: "",
                content: "<p>Welcome to the Danger Zone</p>\n",
                date: "2018-09-12 23:02:46",
                modified: "2018-09-12 23:02:46",
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
                modified: "2018-09-16 23:06:53",
                author: {
                  id: "DxjoniDx",
                  userId: 3,
                  nicename: "JebusDaMan",
                  avatar: null,
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
        author: 'Jim Bean',
        authorEmail: 'beanie-w-da-zeenie@somebadplace.org',
        authorUrl: "",
        type: null,
        userId: null,
        parent: null,
        postId: 1,
        content: message,
        date: `${now.getMonth()}/${now.getDate()}/${now.getFullYear()}`,
        clientId: '9d2a150f-e278-3a4a-81ab-45e62269c08c',
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
            date: `${now.getMonth()}/${now.getDate()}/${now.getFullYear()}`,
            modified: `${now.getMonth()}/${now.getDate()}/${now.getFullYear()}`,
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
        date: `${now.getMonth()}/${now.getDate()}/${now.getFullYear()}`,
        clientId: 'd9ef8077-d37c-3d31-8a50-ee097a3d33f3',
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
            modified: `${now.getMonth()}/${now.getDate()}/${now.getFullYear()}`,
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
        clientId: 'f6c8eba6-1d9c-30ef-8c15-973571bfc7fe',
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
            modified: `${now.getMonth()}/${now.getDate()}/${now.getFullYear()}`,
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
  }
];


it(`renders post comments`, async () => {
  const { getByTestId } = render(
    <MockedProvider mocks={mocks} cache={cache} addTypename>
      <MemoryRouter>
        <PostComments id="xTWinK3L" data-testid="test-comments" />
      </MemoryRouter>
    </MockedProvider>
  );

  const comments = await waitForElement(() => getByTestId(/test-comments/));
  expect(comments).toBeTruthy();

  const count = comments.querySelectorAll('ol>li.comment').length;
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

  const { getByTestId } = render(
    <MockedProvider mocks={mocks} addTypename cache={cache}>
      <MemoryRouter>
        <CustomPostComments id="xTWinK3L" data-testid="test-comments" />
      </MemoryRouter>
    </MockedProvider>
  );

  const comments = await waitForElement(() => getByTestId(/test-comments/));
  expect(comments).toBeTruthy();

  const list = comments.querySelectorAll('.comment');
  expect(list.length).toBe(2)
});


it(`create a new post comment`, async () => {  
  const { getByPlaceholderText, getByTestId, getByText } = render(
    <MockedProvider mocks={mocks} addTypename cache={cache}>
      <MemoryRouter>
        <PostComments id="xTWinK3L" data-testid="test-comments" />
      </MemoryRouter>
    </MockedProvider>
  );

  const comments = await waitForElement(() => getByTestId(/test-comments/));
  expect(comments).toBeTruthy();

  let list = comments.querySelectorAll('ol>li.comment');
  expect(list.length).toBe(2);

  // Fire add event
  fireEvent.click(getByText(/Add Comment/));

  const authorInput = await waitForElement(() => getByPlaceholderText(/Name/));
  expect(authorInput).toBeTruthy();

  const emailInput = getByPlaceholderText(/Email/);
  expect(emailInput).toBeTruthy();

  const messageBox = getByPlaceholderText(/Message/);
  expect(messageBox).toBeTruthy();

  // Input login info
  fireEvent.change(authorInput, { target: { value: 'Jim Bean' } });
  fireEvent.change(emailInput, { target: { value: 'beanie-w-da-zeenie@somebadplace.org' } });
  fireEvent.change(messageBox, { target: { value: message } });

  // Fire save event
  fireEvent.click(getByText(/Leave Comment/));
  
  await waitForElement(() => comments.querySelector('#comment-3'));

  const newComment = await waitForElement(() => getByText(message));
  expect(newComment).toBeTruthy();
});


it(`updates an existing post comment`, async () => {
  const { getByTestId, getByText } = render(
    <MockedProvider mocks={mocks} addTypename cache={cache}>
      <MemoryRouter>
        <PostComments  id="xTWinK3L" userId={3} data-testid="test-comments" />
      </MemoryRouter>
    </MockedProvider>
  );

  const comments = await waitForElement(() => getByTestId(/test-comments/));
  expect(comments).toBeTruthy();

  const list = comments.querySelectorAll('.comment');
  expect(list.length).toBe(3);

  // Fire edit event
  fireEvent.click(getByText(/Edit/));

  const messageBox = await waitForElement(() => comments.querySelector('#comment-2 textarea'));
  expect(messageBox).toBeTruthy();

  // Input login info
  fireEvent.change(messageBox, { target: { value: messageTwo } });

  // Fire update event
  fireEvent.click(getByText(/Save Changes/));

  const updatedComment = await waitForElement(() => comments.querySelector('#comment-2 .comment-content'));
  expect(updatedComment.innerHTML).toEqual(messageTwo);
});


it(`deletes an existing post comment`, async () => {
  const { getByText, getByTestId } = render(
    <MockedProvider mocks={mocks} addTypename cache={cache}>
      <MemoryRouter>
        <PostComments id="xTWinK3L" userId={3} data-testid="test-comments" />
      </MemoryRouter>
    </MockedProvider>
  );

  const comments = await waitForElement(() => getByTestId(/test-comments/));
  expect(comments).toBeTruthy();

  expect(comments.querySelectorAll('.comment').length).toBe(3);

  const target = comments.querySelectorAll('#comment-2');
  expect(target).toBeTruthy();

  // Fire delete event
  fireEvent.click(getByText(/Delete/));

  await wait(() => expect(comments.innerHTML).not.toContain(target.outerHTML));
  expect(comments.querySelectorAll('.comment').length).toBe(2);
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
