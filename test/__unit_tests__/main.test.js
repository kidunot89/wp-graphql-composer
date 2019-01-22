import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { MemoryRouter } from 'react-router-dom';

import introspectionQueryResultData from '../fragmentTypes.json';
import {
  ARCHIVE_QUERY,
  Main,
  main,
  LOOP_QUERY,
  PAGE_QUERY,
  PAGE_BY_QUERY,
  POST_BY_QUERY,
} from '../../src';

afterEach(cleanup);

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const loopQueryResults = {
  request: { query: LOOP_QUERY },
  result: {
    data: {
      allSettings: {
        pageForPosts: 'blog',
        pageOnFront: "W0T5R0x",
        permalinkStructure: '/%monthnum%/%year%/%day%/%postname%/',
        readingSettingsPostsPerPage: 5,
        __typename: 'Settings',
      },
    }
  },
}

const archiveResults = [{
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
      __typename: 'Avatar',
    },
    __typename: 'User',
  },
  categories: {
    nodes: [
      {
        id: "Y2F0ZWdvcnk6MTM=",
        name: "Test One",
        slug: "test-one",
        __typename: 'Category',
      },
      {
        id: "Y2F0ZWdvcnk6MTQ=",
        name: "Test Two",
        slug: "test-two",
        __typename: 'Category',
      },
      {
        id: "Y2F0ZWdvcnk6MQ==",
        name: "Uncategorized",
        slug: "uncategorized",
        __typename: 'Category',
      },
      {
        id: "Y2F0ZWfvxwk6MQ==",
        name: "Web Development",
        slug: "web-dev",
        __typename: 'Category',
      }
    ],
    __typename: 'PostCategoriesConnection'
  },
  tags: {
    nodes: [
      {
        id: "cG9zdF90YWc6OQ==",
        name: "Forsha",
        slug: "forsha",
        __typename: 'Tag',
      },
      {
        id: "cG9zdF90YWc6MTA=",
        name: "GetIt",
        slug: 'get-it',
        __typename: 'Tag',
      },
      {
        id: "cG9zdF90YWc6MTI=",
        name: "Jane",
        slug: "jane",
        __typename: 'Tag',
      },
      {
        id: "cG9zdF90YWc6MTE=",
        name: "Plain",
        slug: "plain",
        __typename: 'Tag',
      },
      {
        id: "cG9zdF90YWc6OA==",
        name: "Yep",
        slug: "yep",
        __typename: 'Tag',
      },
      {
        id: "cG9zdF90YWc6OS==",
        name: "Javascript",
        slug: "javascript",
        __typename: 'Tag',
      }
    ],
    __typename: 'PostTagsConnection',
  },
  featuredImage: null,
  __typename: 'Post',
}];

const mocks = [
  loopQueryResults,
  {
    request: {
      query: POST_BY_QUERY,
      variables: {
        uri: null,
        postId: null,
        slug: 'test-post' 
      },
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
              __typename: 'Avatar',
            },
            __typename: 'User',
          },
          categories: {
            nodes: [
              {
                id: "Y2F0ZWdvcnk6MTM=",
                name: "testOne",
                __typename: 'Category',
              },
              {
                id: "Y2F0ZWdvcnk6MTQ=",
                name: "testtwo",
                __typename: 'Category',
              },
              {
                id: "Y2F0ZWdvcnk6MQ==",
                name: "Uncategorized",
                __typename: 'Category',
              }
            ],
            __typename: 'PostCategoriesConnection'
          },
          tags: {
            nodes: [
              {
                id: "cG9zdF90YWc6OQ==",
                name: "Forsha",
                __typename: 'Tag',
              },
              {
                id: "cG9zdF90YWc6MTA=",
                name: "GetIt",
                __typename: 'Tag',
              },
              {
                id: "cG9zdF90YWc6MTI=",
                name: "Jane",
                __typename: 'Tag',
              },
              {
                id: "cG9zdF90YWc6MTE=",
                name: "Plain",
                __typename: 'Tag',
              },
              {
                id: "cG9zdF90YWc6OA==",
                name: "Yep",
                __typename: 'Tag',
              }
            ],
            __typename: 'PostTagsConnection',
          },
          featuredImage: null,
          __typename: 'Post',
        }
      }
    }
  },
  {
    request: {
      query: PAGE_BY_QUERY,
      variables: { 
        pageId: null,
        uri: 'sample-page',
      },
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
          __typename: 'Page',
        }
      }
    }
  },
  {
    request: {
      query: PAGE_QUERY,
      variables: { 
        id: "W0T5R0x",
      },
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
          __typename: 'Page',
        }
      }
    }
  },
  {
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
        search: null,
      },
    },
    result: {
      data: {
        posts: {
          nodes: archiveResults,
          __typename: 'RootPostsConnection'
        }
      }
    }
  },
  {
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
        search: null,
      },
    },
    result: {
      data: {
        posts: {
          nodes: archiveResults,
          __typename: 'RootPostsConnection'
        }
      }
    }
  },
  {
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
        search: null,
      },
    },
    result: {
      data: {
        posts: {
          nodes: archiveResults,
          __typename: 'RootPostsConnection'
        }
      }
    }
  },
  {
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
        search: null,
      },
    },
    result: {
      data: {
        posts: {
          nodes: archiveResults,
          __typename: 'RootPostsConnection'
        }
      }
    }
  },
  {
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
        search: null,
      },
    },
    result: {
      data: {
        posts: {
          nodes: archiveResults,
          __typename: 'RootPostsConnection'
        }
      }
    }
  },
  {
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
        search: null,
      },
    },
    result: {
      data: {
        posts: {
          nodes: archiveResults,
          __typename: 'RootPostsConnection'
        }
      }
    }
  },
  {
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
        search: null,
      },
    },
    result: {
      data: {
        posts: {
          nodes: archiveResults,
          __typename: 'RootPostsConnection'
        }
      }
    }
  },
  {
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
        search: 'lorem ipsum',
      },
    },
    result: {
      data: {
        posts: {
          nodes: archiveResults,
          __typename: 'RootPostsConnection'
        }
      }
    }
  },
  {
    request: {
      query: PAGE_BY_QUERY,
      variables: { 
        pageId: null,
        uri: 'nothing',
      },
    },
    result: {
      errors: [
        {
          message: "The \"uri\" is invalid",
          category: "user",
          locations: [
            {
              line: 2,
              column: 3
            }
          ],
          path: [
            "page"
          ]
        }
      ],
      data: {
        pageBy: null,
      }
    }
  },
];

const cache = new InMemoryCache({ fragmentMatcher });

it(`navigates to a post`, async () => {
  const { getByTestId, getByText } = render(
    <MockedProvider mocks={mocks} cache={cache} addTypename>
      <MemoryRouter initialEntries={[ '/09/2018/12/test-post' ]}>
        <Main data-testid="test-main" />
      </MemoryRouter>
    </MockedProvider>
  );

  // Confirms Main
  const mainElement = await waitForElement(() => getByTestId(/test-main/));
  expect(mainElement).toBeTruthy();

  // Confirms Content
  const content = await waitForElement(() => getByText(/Hello World/));
  expect(content).toBeTruthy();
});

it(`navigates to a page`, async () => {
  const { getByTestId, getByText } = render(
    <MockedProvider mocks={mocks} cache={cache} addTypename>
      <MemoryRouter initialEntries={[ '/sample-page' ]}>
        <Main data-testid="test-main" />
      </MemoryRouter>
    </MockedProvider>
  );

  // Confirms Main
  const mainElement = await waitForElement(() => getByTestId(/test-main/));
  expect(mainElement).toBeTruthy();

  // Confirms Content
  const content = await waitForElement(() => getByText(/Hello World/));
  expect(content).toBeTruthy();
});

it(`navigates to homepage`, async () => {
  const { getByTestId, getByText } = render(
    <MockedProvider mocks={mocks} cache={cache} addTypename>
      <MemoryRouter initialEntries={[ '/' ]}>
        <Main data-testid="test-main" />
      </MemoryRouter>
    </MockedProvider>
  );

  // Confirms Main
  const mainElement = await waitForElement(() => getByTestId(/test-main/));
  expect(mainElement).toBeTruthy();

  // Confirms Content
  const content = await waitForElement(() => getByText(/Hello World/));
  expect(content).toBeTruthy();
});

it(`navigates to an posts archive of the most recent posts
  with custom view layer component`, async () => {
  const customMain = ({ Archive, Page, Post, Routes, ...rest }) => (
    <main {...rest}>
      <Routes {...{ Archive, Page, Post }} />
    </main>
  );

  const CustomMain = main.compose({ view: customMain });

  const { getByTestId, getByText } = render(
    <MockedProvider mocks={mocks} cache={cache} addTypename>
      <MemoryRouter initialEntries={[ '/' ]}>
        <CustomMain data-testid="test-main" />
      </MemoryRouter>
    </MockedProvider>
  );

  // Confirms Main
  const mainElement = await waitForElement(() => getByTestId(/test-main/));
  expect(mainElement).toBeTruthy();

  // Confirms Content
  const content = await waitForElement(() => getByText(/Hello World/));
  expect(content).toBeTruthy();
});

it(`navigates to an posts archive by month`, async () => {
  const { getByTestId, getByText } = render(
    <MockedProvider mocks={mocks} cache={cache} addTypename>
      <MemoryRouter initialEntries={[ '/2018/09/01' ]}>
        <Main data-testid="test-main" />
      </MemoryRouter>
    </MockedProvider>
  );

  // Confirms Main
  const mainElement = await waitForElement(() => getByTestId(/test-main/));
  expect(mainElement).toBeTruthy();

  // Confirms Content
  const content = await waitForElement(() => getByText(/Posts made September 1, 2018/));
  expect(content).toBeTruthy();
});

it(`navigates to an posts archive by month`, async () => {
  const { getByTestId, getByText } = render(
    <MockedProvider mocks={mocks} cache={cache} addTypename>
      <MemoryRouter initialEntries={[ '/2018/09' ]}>
        <Main data-testid="test-main" />
      </MemoryRouter>
    </MockedProvider>
  );

  // Confirms Main
  const mainElement = await waitForElement(() => getByTestId(/test-main/));
  expect(mainElement).toBeTruthy();

  // Confirms Content
  const content = await waitForElement(() => getByText(/Posts made September 2018/));
  expect(content).toBeTruthy();
});

it(`navigates to an posts archive by year`, async () => {
  const { getByTestId, getByText } = render(
    <MockedProvider mocks={mocks} cache={cache} addTypename>
      <MemoryRouter initialEntries={[ '/2018' ]}>
        <Main data-testid="test-main" />
      </MemoryRouter>
    </MockedProvider>
  );

  // Confirms Main
  const mainElement = await waitForElement(() => getByTestId(/test-main/));
  expect(mainElement).toBeTruthy();

  // Confirms Content
  const content = await waitForElement(() => getByText(/Posts made this year|Posts made last year|Posts made in 2018/));
  expect(content).toBeTruthy();
});

it(`navigates to an posts archive by author`, async () => {
  const { getByTestId, getByText } = render(
    <MockedProvider mocks={mocks} cache={cache} addTypename>
      <MemoryRouter initialEntries={[ '/author/punch45' ]}>
        <Main data-testid="test-main" />
      </MemoryRouter>
    </MockedProvider>
  );

  // Confirms Main
  const mainElement = await waitForElement(() => getByTestId(/test-main/));
  expect(mainElement).toBeTruthy();

  // Confirms Content
  const content = await waitForElement(() => getByText(/Posts made by punch45/));
  expect(content).toBeTruthy();
});

it(`navigates to an posts archive by category`, async () => {
  const { getByTestId, getByText } = render(
    <MockedProvider mocks={mocks} cache={cache} addTypename>
      <MemoryRouter initialEntries={[ '/category/web-dev' ]}>
        <Main data-testid="test-main" />
      </MemoryRouter>
    </MockedProvider>
  );

  // Confirms Main
  const mainElement = await waitForElement(() => getByTestId(/test-main/));
  expect(mainElement).toBeTruthy();

  // Confirms Content
  const content = await waitForElement(() => getByText(/Posts categorized in Web Development/));
  expect(content).toBeTruthy();
});

it(`navigates to an posts archive by tag`, async () => {
  const { getByTestId, getByText } = render(
    <MockedProvider mocks={mocks} cache={cache} addTypename>
      <MemoryRouter initialEntries={[ '/tag/javascript' ]}>
        <Main data-testid="test-main" />
      </MemoryRouter>
    </MockedProvider>
  );

  // Confirms Main
  const mainElement = await waitForElement(() => getByTestId(/test-main/));
  expect(mainElement).toBeTruthy();

  // Confirms Content
  const content = await waitForElement(() => getByText(/Posts tagged in Javascript/));
  expect(content).toBeTruthy();
});

it(`navigates to an posts archive by search`, async () => {
  const { getByTestId, getByText } = render(
    <MockedProvider mocks={mocks} cache={cache} addTypename>
      <MemoryRouter initialEntries={[ '/search/lorem ipsum' ]}>
        <Main data-testid="test-main" />
      </MemoryRouter>
    </MockedProvider>
  );

  // Confirms Main
  const mainElement = await waitForElement(() => getByTestId(/test-main/));
  expect(mainElement).toBeTruthy();

  // Confirms Content
  const content = await waitForElement(() => getByText(/Searching "lorem ipsum"/));
  expect(content).toBeTruthy();
});

it(`navigates to an 404 error`, async () => {
  const { getByTestId, getByText } = render(
    <MockedProvider mocks={mocks} cache={cache} addTypename>
      <MemoryRouter initialEntries={[ '/nothing' ]}>
        <Main data-testid="test-main" />
      </MemoryRouter>
    </MockedProvider>
  );

  // Confirms Main
  const mainElement = await waitForElement(() => getByTestId(/test-main/));
  expect(mainElement).toBeTruthy();

  // Confirms Content
  const content = await waitForElement(() => 
    getByText(/^Sorry, we can't locate the page you're looking for. Please, try again later.$|^GraphQL error: The "uri" is invalid$/));
  expect(content).toBeTruthy();
});

it(`renders loading state`, () => {
  const { getByText, getByTestId } = render(
    <MockedProvider mocks={[]} addTypename={false}>
      <MemoryRouter initialEntries={[ '/' ]}>
        <Main />
      </MemoryRouter>
    </MockedProvider>,
  );

  const icon = getByTestId(/loading-icon/);
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === '').toBeFalsy();
  expect(getByText(/Loading\.\.\./)).toBeTruthy();
})

it(`renders error state`, async () => {
  const errorMocks = [{
    request: {
      query: LOOP_QUERY,
    },
    error: new Error('its broke'),
  }];

  const { getByTestId } = render(
    <MockedProvider mocks={errorMocks} addTypename={false}>
      <MemoryRouter initialEntries={[ '/' ]}>
        <Main />
      </MemoryRouter>
    </MockedProvider>,
  );

  const icon = await waitForElement(() => getByTestId(/error-icon/));
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === '').toBeFalsy();
  const message = getByTestId(/error-message/);
  expect(message).toBeTruthy();
  expect(message.innerHTML === '').toBeFalsy();
});