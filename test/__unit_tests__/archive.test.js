import React from 'react';
import { map } from 'lodash';
import { render, cleanup, waitForElement } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { MemoryRouter } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

import { Archive, archive, ARCHIVE_QUERY } from '../../src';
import introspectionQueryResultData from '../fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const cache = new InMemoryCache({ fragmentMatcher });

const contentOne = '';
const contentTwo = '';
const contentThree = '';
const contentFour = '';
const contentFive = '';

const year = new Date().getFullYear();
const lastYear = year - 1;

const firstThree = [
  {
    id: "cG9zdDoxNjA=",
    postId: 160,
    content: contentOne,
    excerpt: contentOne,
    permalink: `/${year}/04/20/weed-day`,
    date: `${year}-04-20 08:54:25`,
    modified: `${year}-04-22 08:54:25`,
    title: "Happy Weed Day!",
    featuredImage: null,
    tags: {
      nodes: [
        {
          id: "Y2F0ZWdcdnk6HP==",
          name: "Javascript",
          slug: 'javascript',
          __typename: 'Tag',
        }, {
          id: "Y2F0ZWdcdnk6BR==",
          name: "NodeJS",
          slug: 'nodejs',
          __typename: 'Tag',
        }, {
          id: "Y2F0ZWdcdnk6BT==",
          name: "Webpack",
          slug: 'webpack',
          __typename: 'Tag',
        }, {
          id: "Y2F0ZWdcdnk6BA==",
          name: "React",
          slug: 'react',
          __typename: 'Tag',
        }, {
          id: "Y2F0ZWdcdnk6BG==",
          name: "ES6",
          slug: 'es6',
          __typename: 'Tag',
        }
      ],
      __typename: 'PostTagsConnection',
    },
    categories: {
      nodes: [
        {
          id: "Y2F0ZWdvcnk6MQ==",
          name: "Announcements",
          slug: 'announcements',
          __typename: 'Category',
        },
        {
          id: "Y2F0ZWdvcnk6MD==",
          name: "Web Development",
          slug: 'web-dev',
          __typename: 'Category'
        }
      ],
      __typename: 'PostCategoriesConnection'
    },
    author: {
      id: "dXNlcjox",
      userId: 1,
      nicename: "Geminaw Raddy",
      avatar: {
        url: "http://2.gravatar.com/avatar/8cbbea0504f915ea88622f97badd1bed?s=96&d=mm&r=g",
        foundAvatar: true,
        __typename: 'Avatar',
      },
      __typename: 'User',
    },
    __typename: 'Post'
  },
  {
    id: "cG9zdDoxNjD=",
    postId: 157,
    content: contentTwo,
    excerpt: contentTwo,
    permalink: `/${year}/04/16/dank-coming-soon`,
    date: `${year}-04-16 08:54:25`,
    modified: `${year}-04-23 08:54:25`,
    title: "Four days from the day of dank!",
    featuredImage: null,
    tags: {
      nodes: [],
      __typename: 'PostTagsConnection',
    },
    categories: {
      nodes: [
        {
          id: "Y2F0ZWdvcnk6MQ==",
          name: "Announcements",
          slug: 'announcements',
          __typename: 'Category'
        },
        {
          id: "Y2F0ZWdvcnk6MD==",
          name: "Web Development",
          slug: 'web-dev',
          __typename: 'Category'
        }
      ],
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
    __typename: 'Post',
  },
  {
    id: "cG9zdDoxNjG=",
    postId: 156,
    content: contentThree,
    excerpt: contentThree,
    permalink: `/${lastYear}/04/12/new-project`,
    date: `${lastYear}-04-12 08:54:25`,
    modified: `${lastYear}-04-12 08:54:25`,
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
      __typename: 'PostTagsConnection',
    },
    categories: {
      nodes: [
        {
          id: "Y2F0ZWdvcnk6MD==",
          name: "Web Development",
          slug: 'web-dev',
          __typename: 'Category'
        }
      ],
      __typename: 'PostCategoriesConnection'
    },
    author: {
      id: "dXNlcjog",
      userId: 2,
      nicename: "MaxKnob",
      avatar: {
        url: "http://2.gravatar.com/avatar/8cbbea0504f915ea88622f97badd1bed?s=96&d=mm&r=g",
        foundAvatar: true,
        __typename: 'Avatar',
      },
      __typename: 'User',
    },
    __typename: 'Post',
  },
]

const mocks = [
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
          nodes: [
            ...firstThree,
            {
              id: "cG9zdDoxNjY=",
              postId: 152,
              content: contentFour,
              excerpt: contentFour,
              permalink: `/${year}/03/29/meditate`,
              date: `${year}-03-29 08:54:25`,
              modified: null,
              title: "Why you should try meditating",
              featuredImage: null,
              tags: {
                nodes: [
                  { 
                    id: "Y2F0ZWdcdnk6HS==",
                    name: 'Tips',
                    slug: 'tips',
                    __typename: 'Tag',
                  }
                ],
                __typename: 'PostTagsConnection',
              },
              categories: {
                nodes: [
                  {
                    id: "Y2F0ZWdvcnk6MW==",
                    name: "Relaxation",
                    slug: 'relaxation',
                    __typename: 'Category'
                  }
                ],
                __typename: 'PostCategoriesConnection'
              },
              author: {
                id: "dXNlcjox",
                userId: 1,
                nicename: "GeminawRaddy",
                avatar: {
                  url: "http://2.gravatar.com/avatar/8cbbea0504f915ea88622f97badd1bed?s=96&d=mm&r=g",
                  foundAvatar: true,
                  __typename: 'Avatar',
                },
                __typename: 'User',
              },
              __typename: 'Post'
            },
            {
              id: "cG9zdDoxNjK=",
              postId: 149,
              content: contentFive,
              excerpt: contentFive,
              permalink: `/${year}/03/10/learn-react`,
              date: `${year}-03-10 08:54:25`,
              modified: `${year}-03-12 08:54:25`,
              title: "Learn React!",
              featuredImage: null,
              tags: {
                nodes: [{
                  id: "Y2F0ZWdcdnk6HP==",
                  name: "Javascript",
                  slug: 'javascript',
                  __typename: 'Tag',
                }, {
                  id: "Y2F0ZWdcdnk6BR==",
                  name: "NodeJS",
                  slug: 'nodejs',
                  __typename: 'Tag',
                }, {
                  id: "Y2F0ZWdcdnk6BT==",
                  name: "Webpack",
                  slug: 'webpack',
                  __typename: 'Tag',
                }, {
                  id: "Y2F0ZWdcdnk6BA==",
                  name: "React",
                  slug: 'react',
                  __typename: 'Tag',
                }, {
                  id: "Y2F0ZWdcdnk6BG==",
                  name: "ES6",
                  slug: 'es6',
                  __typename: 'Tag',
                }],
                __typename: 'PostTagsConnection',
              },
              categories: {
                nodes: [
                  {
                    id: "Y2F0ZWdvcnk6MD==",
                    name: "Web Development",
                    slug: 'web-dev',
                    __typename: 'Category',
                  }
                ],
                __typename: 'PostCategoriesConnection',
              },
              author: {
                id: "dXNlcjog",
                userId: 2,
                nicename: "MaxKnob",
                avatar: {
                  url: "http://2.gravatar.com/avatar/8cbbea0504f915ea88622f97badd1bed?s=96&d=mm&r=g",
                  foundAvatar: true,
                  __typename: 'Avatar',
                },
                __typename: 'User',
              },
              __typename: 'Post'
            },
          ],
          __typename: 'RootPostsConnection',
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
      }
    },
    result: {
      data: {
        posts: {
          nodes: [
            ...firstThree,
          ],
          __typename: 'RootPostsConnection',
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
      }
    },
    result: {
      data: {
        posts: {
          nodes: [
            ...firstThree,
          ],
          __typename: 'RootPostsConnection',
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
        day: 5,
        month: 4,
        year,
        author: null,
        search: null,
      }
    },
    result: {
      data: {
        posts: {
          nodes: [
            ...firstThree,
          ],
          __typename: 'RootPostsConnection',
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
        month: 4,
        year,
        author: null,
        search: null,
      }
    },
    result: {
      data: {
        posts: {
          nodes: [
            ...firstThree,
          ],
          __typename: 'RootPostsConnection',
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
        year: lastYear,
        author: null,
        search: null,
      }
    },
    result: {
      data: {
        posts: {
          nodes: [
            ...firstThree,
          ],
          __typename: 'RootPostsConnection',
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
        author: "MaxKnob",
        search: null,
      }
    },
    result: {
      data: {
        posts: {
          nodes: [
            ...firstThree,
          ],
          __typename: 'RootPostsConnection',
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
      }
    },
    result: {
      data: {
        posts: {
          nodes: [
            ...firstThree,
          ],
          __typename: 'RootPostsConnection',
        }
      }
    }
  },
];

const containerProps = {
  container: true,
  containerProps: {
    'data-testid': 'test-archive',
  }
}

afterEach(cleanup);

it(`renders archive of first five most recent posts`, async () => {
  const { getByTestId, getByText } = render(
    <MockedProvider mocks={mocks} cache={cache} addTypename>
      <MemoryRouter>
        <Archive first={5} {...containerProps} />
      </MemoryRouter>
    </MockedProvider>
  );

  // Confirms results container
  const results = await waitForElement(() => getByTestId(/test-archive/));
  expect(results).toBeTruthy();

  // Confirms header
  const header = getByText('Recent Posts');
  expect(header).toBeTruthy();

  // Confirms result count
  const count = results.querySelectorAll('.post').length;
  expect(count).toBe(5);
});


it(`renders archive of first five posts by day`, async () => {
  const { getByTestId, getByText } = render(
    <MockedProvider mocks={mocks} cache={cache} addTypename>
      <MemoryRouter>
        <Archive first={5} where={{ month: 4, year, day: 5 }} {...containerProps} />
      </MemoryRouter>
    </MockedProvider>
  );

  // Confirms results container
  const results = await waitForElement(() => getByTestId(/test-archive/));
  expect(results).toBeTruthy();

  // Confirms keywords
  const header = getByText(`Posts made April 5, ${year}`);
  expect(header).toBeTruthy();

  // Confirms result count
  const count = results.querySelectorAll('.post').length;
  expect(count).toBe(3);
});


it(`renders archive of first five posts by month with a custom view layer component`, async () => {
  const resultView = ({
    id,
    postId,
    excerpt,
    title,
    featuredImage,
    meta,
    ...rest
  }) => (
    <article
      id={`post-${postId}`}
      className={`post-${postId} post-type-post`}
      {...rest}
    >
      <div className="entry-content">
        {ReactHtmlParser(excerpt)}
      </div>
    </article>
  );

  const customArchive = ({
    Attachment,
    resultView: Result,
    header,
    resultsData = [],
    ...rest
  }) => (
    <main {...rest}>
      <h2 className="archive-header">{header}</h2>
      {map(resultsData, ({ id, ...r}) => (
        <Result {...r} id={id} key={id} />
      ))}
    </main>
  );

  const CustomArchive = archive.compose({
    view: customArchive,
    resultView,
  });


  const { getByTestId, getByText } = render(
    <MockedProvider mocks={mocks} cache={cache} addTypename>
      <MemoryRouter>
        <CustomArchive first={5} where={{ month: 4, year }} data-testid="test-archive" />
      </MemoryRouter>
    </MockedProvider>
  );

  // Confirms results container
  const results = await waitForElement(() => getByTestId(/test-archive/));
  expect(results).toBeTruthy();

  // Confirms keywords
  const header = getByText(`Posts made April ${year}`);
  expect(header).toBeTruthy();

  // Confirms result count
  const count = results.querySelectorAll('.post-type-post').length;
  expect(count).toBe(3);
});


it(`renders archive of first five posts by year`, async () => {
  const { getByTestId, getByText } = render(
    <MockedProvider mocks={mocks} cache={cache} addTypename>
      <MemoryRouter>
        <Archive first={5} where={{ year: lastYear }} {...containerProps} />
      </MemoryRouter>
    </MockedProvider>
  );

  // Confirms results container
  const results = await waitForElement(() => getByTestId(/test-archive/));
  expect(results).toBeTruthy();

  // Confirms header
  const header = getByText(/Posts made last year/);
  expect(header).toBeTruthy();

  // Confirms result count
  let count = results.querySelectorAll('.post').length;
  expect(count).toBe(3);
});


it(`renders archive of first five posts by author`, async () => {
  const { getByTestId, getByText } = render(
    <MockedProvider mocks={mocks} cache={cache} addTypename>
      <MemoryRouter>
        <Archive first={5} where={{ author: 'MaxKnob' }} {...containerProps} />
      </MemoryRouter>
    </MockedProvider>
  );

  // Confirms results container
  const results = await waitForElement(() => getByTestId(/test-archive/));
  expect(results).toBeTruthy();

  // Confirms keywords
  const header = getByText(/Posts made by MaxKnob/);
  expect(header).toBeTruthy();

  // Confirms result count
  let count = results.querySelectorAll('.post').length;
  expect(count).toBe(3);
});


it(`renders archive of first five posts by category`, async () => {
  const { getByTestId, getByText } = render(
    <MockedProvider mocks={mocks} cache={cache} addTypename>
      <MemoryRouter>
        <Archive first={5} where={{ category: 'web-dev' }} {...containerProps} />
      </MemoryRouter>
    </MockedProvider>
  );

  // Confirms results container
  const results = await waitForElement(() => getByTestId(/test-archive/));
  expect(results).toBeTruthy();

  // Confirms header
  const header = getByText(/Posts categorized in Web Development/);
  expect(header).toBeTruthy();

  // Confirms result count
  let count = results.querySelectorAll('.post').length;
  expect(count).toBe(3);
});


it(`renders archive of first five posts by tag`, async () => {
  const { getByTestId, getByText } = render(
    <MockedProvider mocks={mocks} cache={cache} addTypename>
      <MemoryRouter>
        <Archive first={5} where={{ tag: 'javascript' }} {...containerProps} />
      </MemoryRouter>
    </MockedProvider>
  );

  // Confirms results container
  const results = await waitForElement(() => getByTestId(/test-archive/));
  expect(results).toBeTruthy();

  // Confirms header
  const header = getByText(/Posts tagged in Javascript/);
  expect(header).toBeTruthy();

  // Confirms result count
  let count = results.querySelectorAll('.post').length;
  expect(count).toBe(3);
});


it(`renders archive of first five posts by search`, async () => {
  const { getByTestId, getByText } = render(
    <MockedProvider mocks={mocks} cache={cache} addTypename>
      <MemoryRouter>
        <Archive first={5} where={{ search: 'lorem ipsum' }} {...containerProps} />
      </MemoryRouter>
    </MockedProvider>
  );

  // Confirms results container
  const results = await waitForElement(() => getByTestId(/test-archive/));
  expect(results).toBeTruthy();

  // Confirms header
  const header = getByText(/Searching "lorem ipsum"/);
  expect(header).toBeTruthy();

  // Confirms result count
  let count = results.querySelectorAll('.post').length;
  expect(count).toBe(3);
});


it(`renders archive of with no results`, async () => {
  const emptyMocks = [
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
        }
      },
      result: {
        data: {
          posts: {
            nodes:[

            ],
            __typename: 'RootPostsConnection'
          }
        }
      }
    }
  ]
  
  const { getByTestId, getByText } = render(
    <MockedProvider mocks={emptyMocks} addTypename>
      <MemoryRouter>
        <Archive first={5} {...containerProps} />
      </MemoryRouter>
    </MockedProvider>
  );

  // Confirms results container
  const results = await waitForElement(() => getByTestId(/test-archive/));
  expect(results).toBeTruthy();

  // Confirms header
  const header = getByText(/No posts found/);
  expect(header).toBeTruthy();

  // Confirms result count
  const count = results.querySelectorAll('.post-type-post').length;
  expect(count).toBe(0);
});

it(`renders a loading state`, () => {
  const { getByText, getByTestId } = render(
    <MockedProvider mocks={[]} addTypename={false}>
      <Archive first={5} />
    </MockedProvider>,
  );

  const icon = getByTestId(/loading-icon/);
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === '').toBeFalsy();
  expect(getByText(/Loading\.\.\./)).toBeTruthy();
});


it(`renders error state`, async () => {
  const errorMocks = [{
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
    error: new Error('its broke'),
  }];

  const { getByTestId } = render(
    <MockedProvider mocks={errorMocks} addTypename={false}>
      <Archive first={5} />
    </MockedProvider>,
  );

  const icon = await waitForElement(() => getByTestId(/error-icon/));
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === '').toBeFalsy();
  const message = getByTestId(/error-message/);
  expect(message).toBeTruthy();
  expect(message.innerHTML === '').toBeFalsy();
});