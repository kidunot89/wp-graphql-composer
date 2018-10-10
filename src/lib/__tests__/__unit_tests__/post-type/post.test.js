import React from 'react';
import _ from 'lodash';
import { Parser as ReactParser } from 'html-to-react';
import { render, cleanup, waitForElement } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';

import { POST_QUERY, POST_BY_QUERY, Post, post } from 'post-type';

afterEach(cleanup);

it(`renders a post`, async () => {
  const mocks = [{
    request: {
      query: POST_QUERY,
      variables: { id: "P0TSH0t" },
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
            nodes: [
              {
                id: "Y2F0ZWdvcnk6MTM=",
                name: "testOne"
              },
              {
                id: "Y2F0ZWdvcnk6MTQ=",
                name: "testtwo"
              },
              {
                id: "Y2F0ZWdvcnk6MQ==",
                name: "Uncategorized"
              }
            ]
          },
          tags: {
            nodes: [
              {
                id: "cG9zdF90YWc6OQ==",
                name: "Forsha"
              },
              {
                id: "cG9zdF90YWc6MTA=",
                name: "GetIt"
              },
              {
                id: "cG9zdF90YWc6MTI=",
                name: "Jane"
              },
              {
                id: "cG9zdF90YWc6MTE=",
                name: "Plain"
              },
              {
                id: "cG9zdF90YWc6OA==",
                name: "Yep"
              }
            ]
          },
          featuredImage: null
        }
      }
    }
  }];

  const { getByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Post id="P0TSH0t" data-testid="test-post" />
    </MockedProvider>
  );
  
  const body = await waitForElement(() => getByTestId(/test-post/));
  expect(body).toBeTruthy();
});


it(`renders a post by slug`, async () => {
  const mocks = [{
    request: {
      query: POST_BY_QUERY,
      variables: { 
        postId: null,
        slug: "test-post",
        uri: null,
      },
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
            nodes: [
              {
                id: "Y2F0ZWdvcnk6MTM=",
                name: "testOne"
              },
              {
                id: "Y2F0ZWdvcnk6MTQ=",
                name: "testtwo"
              },
              {
                id: "Y2F0ZWdvcnk6MQ==",
                name: "Uncategorized"
              }
            ]
          },
          "tags": {
            "nodes": [
              {
                id: "cG9zdF90YWc6OQ==",
                name: "Forsha"
              },
              {
                id: "cG9zdF90YWc6MTA=",
                name: "GetIt"
              },
              {
                id: "cG9zdF90YWc6MTI=",
                name: "Jane"
              },
              {
                id: "cG9zdF90YWc6MTE=",
                name: "Plain"
              },
              {
                id: "cG9zdF90YWc6OA==",
                name: "Yep"
              }
            ]
          },
          featuredImage: null
        }
      }
    }
  }];

  const { getByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Post slug="test-post" data-testid="test-post" />
    </MockedProvider>
  );
  
  const body = await waitForElement(() => getByTestId(/test-post/));
  expect(body).toBeTruthy();
});


it(`renders a post by uri with a custom view component`, async () => {
  const parser = new ReactParser();
  const customDetails = ({ date, modified, author: { userId, nicename }, tags, categories }) => {
    const created = new Date(date);
    const updated = (modified) ? new Date(modified) : false;
    const format = { month: 'long', day: 'numeric', year: 'numeric' };
    return (
      <React.Fragment>
        <div data-testid="post-meta">
          <span>Posted on <time>{created.toLocaleDateString("en-US", format)}</time>
            {updated && (<time>{updated.toLocaleDateString("en-US", format)}</time>)}
          </span>
          <span className="byline"> by <a href={`/author/${userId}`}>{nicename}</a></span>
        </div>
        <span data-testid="post-tags">
          <strong>Tagged</strong>
          {_.map(tags, ({ name, id }) => (<a href={`/tag/${name}`} key={id}>{name}</a>))}
        </span>
        <span data-testid="post-categories">
          <strong>Posted in</strong>
          {_.map(categories, ({ name, id }) => (<a href={`/category/${name}`} key={id}>{name}</a>))}
        </span>
      </React.Fragment>
    );
  };

  const CustomPost = post.compose({
    view: ({ featured, postId, title, content, details, Attachment, DetailsComponent, ...rest }) => (
      <article id={`post-${postId}`} {...rest}>
        <Attachment mediaItemId={featured} fallback />
        <div data-testid="post-content">
          {parser.parse(content)}
        </div>
        <footer>
          <DetailsComponent {...details} />
        </footer>
      </article>
    ),
    DetailsComponent: customDetails,
  })

  const mocks = [{
    request: {
      query: POST_BY_QUERY,
      variables: { 
        postId: null,
        slug: null,
        uri: "parent-post/child-post",
      },
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
            nodes: [
              {
                id: "Y2F0ZWdvcnk6MTM=",
                name: "testOne"
              },
              {
                id: "Y2F0ZWdvcnk6MTQ=",
                name: "testtwo"
              },
              {
                id: "Y2F0ZWdvcnk6MQ==",
                name: "Uncategorized"
              }
            ]
          },
          "tags": {
            "nodes": [
              {
                id: "cG9zdF90YWc6OQ==",
                name: "Forsha"
              },
              {
                id: "cG9zdF90YWc6MTA=",
                name: "GetIt"
              },
              {
                id: "cG9zdF90YWc6MTI=",
                name: "Jane"
              },
              {
                id: "cG9zdF90YWc6MTE=",
                name: "Plain"
              },
              {
                id: "cG9zdF90YWc6OA==",
                name: "Yep"
              }
            ]
          },
          featuredImage: null
        }
      }
    }
  }];

  const { getByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <CustomPost uri="parent-post/child-post" data-testid="post-body" />
    </MockedProvider>
  );

  const body = await waitForElement(() => getByTestId(/post-body/));
  expect(body).toBeTruthy();

  const content = getByTestId(/post-content/);
  expect(content.innerHTML).toMatch(/<h1>Hello World<\/h1>/);

  const meta = getByTestId(/post-meta/);
  expect(meta).toBeTruthy();

  const tags = getByTestId(/post-tags/);
  expect(tags).toBeTruthy();
  
  const categories = getByTestId(/post-categories/);
  expect(categories).toBeTruthy();
});


it(`renders page not found`, async () => {
  const mocks = [{
    request: {
      query: POST_BY_QUERY,
      variables: {
        postId: null,
        slug: "fosho",
        uri: null,
      },
    },
    result: {
      "errors": [
        {
          message: "The \"slug\" is invalid",
          category: "user",
          locations: [
            {
              line: 2,
              column: 3
            }
          ],
          path: [
            "postBy"
          ]
        }
      ],
      data: {
        post: null
      }
    }
  }];
  const { getByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Post slug="fosho" data-testid="test-page" />
    </MockedProvider>
  );
  
  const icon = await waitForElement(() => getByTestId(/error-icon/));
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === '').toBeFalsy();
  const message = getByTestId(/error-message/);
  expect(message).toBeTruthy()
  expect(message.innerHTML).toMatch(
    /^Sorry, we can't locate the post you're looking for. Please, try again later.$|^GraphQL error: The \"slug\" is invalid$/
  );
});


it(`renders a loading state`, () => {
  const { getByText, getByTestId } = render(
    <MockedProvider mocks={[]} addTypename={false}>
      <Post slug="sample-post" />
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
      query: POST_BY_QUERY,
      variables: { uri: "sample-page" },
    },
    error: new Error('its broke'),
  }];

  const { getByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Post uri="sample-post" />
    </MockedProvider>,
  );

  const icon = await waitForElement(() => getByTestId(/error-icon/));
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === '').toBeFalsy();
  const message = getByTestId(/error-message/);
  expect(message).toBeTruthy()
  expect(message.innerHTML === '').toBeFalsy();
});