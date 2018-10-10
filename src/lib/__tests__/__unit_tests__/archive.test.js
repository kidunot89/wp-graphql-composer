import React from 'react';
import { map } from 'lodash';
import {
  render, cleanup, waitForElement, wait,
} from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';

import { Archive, archive, ARCHIVE_QUERY } from 'lib';
import introspectionQueryResultData from 'lib/fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const cache = new InMemoryCache({ fragmentMatcher });

const contentOne = '';
const contentTwo = '';
const contentThree = '';
const contentFour = '';
const contentFive = '';

const mocks = [
  {
    request: {
      query: ARCHIVE_QUERY,
      variables: {
        first: 5,
        category: null,
        tag: null,
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
            {
              id: "cG9zdDoxNjA=",
              postId: 160,
              excerpt: contentOne,
              date: "2018-04-20 08:54:25",
              modified: "2018-04-22 08:54:25",
              title: "Happy Weed Day!",
              featuredImage: null,
              tags: {
                nodes: [],
                __typename: 'PostTagsConnection',
              },
              categories: {
                nodes: [
                  {
                    id: "Y2F0ZWdvcnk6MQ==",
                    name: "Announcement",
                    __typename: 'Category',
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
              excerpt: contentTwo,
              date: "2018-04-16 08:54:25",
              modified: "2018-04-23 08:54:25",
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
                    name: "Announcement",
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
              excerpt: contentThree,
              date: "2018-04-12 08:54:25",
              modified: "2018-04-12 08:54:25",
              title: "New project!",
              featuredImage: null,
              tags: {
                nodes: [{
                  id: "Y2F0ZWdcdnk6HP==",
                  name: "javascript",
                  __typename: 'Tag'
                }, {
                  id: "Y2F0ZWdcdnk6HC==",
                  name: "html",
                  __typename: 'Tag'
                }, {
                  id: "Y2F0ZWdcdnk6HJ==",
                  name: "css",
                  __typename: 'Tag'
                }],
                __typename: 'PostTagsConnection',
              },
              categories: {
                nodes: [
                  {
                    id: "Y2F0ZWdvcnk6MQ==",
                    name: "Web Development",
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
            {
              id: "cG9zdDoxNjY=",
              postId: 152,
              excerpt: contentFour,
              date: "2018-03-29 08:54:25",
              modified: null,
              title: "Why you should try meditating",
              featuredImage: null,
              tags: {
                nodes: [
                  { 
                    id: "Y2F0ZWdcdnk6HS==",
                    name: 'tips',
                    __typename: 'Tag',
                  }
                ],
                __typename: 'PostTagsConnection',
              },
              categories: {
                nodes: [
                  {
                    id: "Y2F0ZWdvcnk6MQ==",
                    name: "Relaxation",
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
              excerpt: contentFive,
              date: "2018-03-10 08:54:25",
              modified: "2018-03-12 08:54:25",
              title: "Learn React!",
              featuredImage: null,
              tags: {
                nodes: [{
                  id: "Y2F0ZWdcdnk6HP==",
                  name: "javascript",
                  __typename: 'Tag',
                }, {
                  id: "Y2F0ZWdcdnk6BR==",
                  name: "node.js",
                  __typename: 'Tag',
                }, {
                  id: "Y2F0ZWdcdnk6BT==",
                  name: "webpack",
                  __typename: 'Tag',
                }, {
                  id: "Y2F0ZWdcdnk6BA==",
                  name: "react",
                  __typename: 'Tag',
                }, {
                  id: "Y2F0ZWdcdnk6BG==",
                  name: "Es6",
                  __typename: 'Tag',
                }],
                __typename: 'PostTagsConnection',
              },
              categories: {
                nodes: [
                  {
                    id: "Y2F0ZWdvcnk6MQ==",
                    name: "Web Development",
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
        category: 'Web Development',
        tag: null,
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
            {
              id: "cG9zdDoxNjG=",
              postId: 156,
              excerpt: contentThree,
              date: "2018-04-12 08:54:25",
              modified: "2018-04-12 08:54:25",
              title: "New project!",
              featuredImage: null,
              tags: {
                nodes: [{
                  id: "Y2F0ZWdcdnk6HP==",
                  name: "javascript",
                  __typename: 'Tag'
                }, {
                  id: "Y2F0ZWdcdnk6HC==",
                  name: "html",
                  __typename: 'Tag'
                }, {
                  id: "Y2F0ZWdcdnk6HJ==",
                  name: "css",
                  __typename: 'Tag'
                }],
                __typename: 'PostTagsConnection',
              },
              categories: {
                nodes: [
                  {
                    id: "Y2F0ZWdvcnk6MQ==",
                    name: "Web Development",
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
            {
              id: "cG9zdDoxNjK=",
              postId: 149,
              excerpt: contentFive,
              date: "2018-03-10 08:54:25",
              modified: "2018-03-12 08:54:25",
              title: "Learn React!",
              featuredImage: null,
              tags: {
                nodes: [{
                  id: "Y2F0ZWdcdnk6HP==",
                  name: "javascript",
                  __typename: 'Tag',
                }, {
                  id: "Y2F0ZWdcdnk6BR==",
                  name: "node.js",
                  __typename: 'Tag',
                }, {
                  id: "Y2F0ZWdcdnk6BT==",
                  name: "webpack",
                  __typename: 'Tag',
                }, {
                  id: "Y2F0ZWdcdnk6BA==",
                  name: "react",
                  __typename: 'Tag',
                }, {
                  id: "Y2F0ZWdcdnk6BG==",
                  name: "Es6",
                  __typename: 'Tag',
                }],
                __typename: 'PostTagsConnection',
              },
              categories: {
                nodes: [
                  {
                    id: "Y2F0ZWdvcnk6MQ==",
                    name: "Web Development",
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
            {
              id: "cG9zdDoxNjR=",
              postId: 120,
              excerpt: contentTwo,
              date: "2017-10-17 08:54:25",
              modified: "2017-10-17 08:54:25",
              title: "Hall-o-ween App coming soon",
              featuredImage: null,
              tags: {
                nodes: [{
                  id: "Y2F0ZWdcdnk6HP==",
                  name: "javascript",
                  __typename: 'Tag'
                }, {
                  id: "Y2F0ZWdcdnk6HC==",
                  name: "html",
                  __typename: 'Tag'
                }, {
                  id: "Y2F0ZWdcdnk6HJ==",
                  name: "css",
                  __typename: 'Tag'
                }],
                __typename: 'PostTagsConnection',
              },
              categories: {
                nodes: [
                  {
                    id: "Y2F0ZWdvcnk6MQ==",
                    name: "Web Development",
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
            {
              id: "cG9zdDoxNjG=",
              postId: 156,
              excerpt: contentThree,
              date: "2018-04-12 08:54:25",
              modified: "2018-04-12 08:54:25",
              title: "New project!",
              featuredImage: null,
              tags: {
                nodes: [{
                  id: "Y2F0ZWdcdnk6HP==",
                  name: "javascript",
                  __typename: 'Tag'
                }, {
                  id: "Y2F0ZWdcdnk6HC==",
                  name: "html",
                  __typename: 'Tag'
                }, {
                  id: "Y2F0ZWdcdnk6HJ==",
                  name: "css",
                  __typename: 'Tag'
                }],
                __typename: 'PostTagsConnection',
              },
              categories: {
                nodes: [
                  {
                    id: "Y2F0ZWdvcnk6MQ==",
                    name: "Web Development",
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
            {
              id: "cG9zdDoxNjK=",
              postId: 149,
              excerpt: contentFive,
              date: "2018-03-10 08:54:25",
              modified: "2018-03-12 08:54:25",
              title: "Learn React!",
              featuredImage: null,
              tags: {
                nodes: [{
                  id: "Y2F0ZWdcdnk6HP==",
                  name: "javascript",
                  __typename: 'Tag',
                }, {
                  id: "Y2F0ZWdcdnk6BR==",
                  name: "node.js",
                  __typename: 'Tag',
                }, {
                  id: "Y2F0ZWdcdnk6BT==",
                  name: "webpack",
                  __typename: 'Tag',
                }, {
                  id: "Y2F0ZWdcdnk6BA==",
                  name: "react",
                  __typename: 'Tag',
                }, {
                  id: "Y2F0ZWdcdnk6BG==",
                  name: "Es6",
                  __typename: 'Tag',
                }],
                __typename: 'PostTagsConnection',
              },
              categories: {
                nodes: [
                  {
                    id: "Y2F0ZWdvcnk6MQ==",
                    name: "Web Development",
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
            {
              id: "cG9zdDoxNjR=",
              postId: 120,
              excerpt: contentTwo,
              date: "2017-10-17 08:54:25",
              modified: "2017-10-17 08:54:25",
              title: "Hall-o-ween App coming soon",
              featuredImage: null,
              tags: {
                nodes: [{
                  id: "Y2F0ZWdcdnk6HP==",
                  name: "javascript",
                  __typename: 'Tag'
                }, {
                  id: "Y2F0ZWdcdnk6HC==",
                  name: "html",
                  __typename: 'Tag'
                }, {
                  id: "Y2F0ZWdcdnk6HJ==",
                  name: "css",
                  __typename: 'Tag'
                }],
                __typename: 'PostTagsConnection',
              },
              categories: {
                nodes: [
                  {
                    id: "Y2F0ZWdvcnk6MQ==",
                    name: "Web Development",
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
        month: 4,
        year: 2018,
        author: null,
        search: null,
      }
    },
    result: {
      data: {
        posts: {
          nodes: [
            {
              id: "cG9zdDoxNjA=",
              postId: 160,
              excerpt: contentOne,
              date: "2018-04-20 08:54:25",
              modified: "2018-04-22 08:54:25",
              title: "Happy Weed Day!",
              featuredImage: null,
              tags: {
                nodes: [],
                __typename: 'PostTagsConnection',
              },
              categories: {
                nodes: [
                  {
                    id: "Y2F0ZWdvcnk6MQ==",
                    name: "Announcement",
                    __typename: 'Category',
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
              excerpt: contentTwo,
              date: "2018-04-16 08:54:25",
              modified: "2018-04-23 08:54:25",
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
                    name: "Announcement",
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
              excerpt: contentThree,
              date: "2018-04-12 08:54:25",
              modified: "2018-04-12 08:54:25",
              title: "New project!",
              featuredImage: null,
              tags: {
                nodes: [{
                  id: "Y2F0ZWdcdnk6HP==",
                  name: "javascript",
                  __typename: 'Tag'
                }, {
                  id: "Y2F0ZWdcdnk6HC==",
                  name: "html",
                  __typename: 'Tag'
                }, {
                  id: "Y2F0ZWdcdnk6HJ==",
                  name: "css",
                  __typename: 'Tag'
                }],
                __typename: 'PostTagsConnection',
              },
              categories: {
                nodes: [
                  {
                    id: "Y2F0ZWdvcnk6MQ==",
                    name: "Web Development",
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
        month: null,
        year: 2017,
        author: null,
        search: null,
      }
    },
    result: {
      data: {
        posts: {
          nodes: [
            {
              id: "cG9zdDoxNjR=",
              postId: 120,
              excerpt: contentTwo,
              date: "2017-10-17 08:54:25",
              modified: "2017-10-17 08:54:25",
              title: "Hall-o-ween App coming soon",
              featuredImage: null,
              tags: {
                nodes: [{
                  id: "Y2F0ZWdcdnk6HP==",
                  name: "javascript",
                  __typename: 'Tag'
                }, {
                  id: "Y2F0ZWdcdnk6HC==",
                  name: "html",
                  __typename: 'Tag'
                }, {
                  id: "Y2F0ZWdcdnk6HJ==",
                  name: "css",
                  __typename: 'Tag'
                }],
                __typename: 'PostTagsConnection',
              },
              categories: {
                nodes: [
                  {
                    id: "Y2F0ZWdvcnk6MQ==",
                    name: "Web Development",
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
        month: null,
        year: null,
        author: 2,
        search: null,
      }
    },
    result: {
      data: {
        posts: {
          nodes: [
            {
              id: "cG9zdDoxNjG=",
              postId: 156,
              excerpt: contentThree,
              date: "2018-04-12 08:54:25",
              modified: "2018-04-12 08:54:25",
              title: "New project!",
              featuredImage: null,
              tags: {
                nodes: [{
                  id: "Y2F0ZWdcdnk6HP==",
                  name: "javascript",
                  __typename: 'Tag'
                }, {
                  id: "Y2F0ZWdcdnk6HC==",
                  name: "html",
                  __typename: 'Tag'
                }, {
                  id: "Y2F0ZWdcdnk6HJ==",
                  name: "css",
                  __typename: 'Tag'
                }],
                __typename: 'PostTagsConnection',
              },
              categories: {
                nodes: [
                  {
                    id: "Y2F0ZWdvcnk6MQ==",
                    name: "Web Development",
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
            {
              id: "cG9zdDoxNjK=",
              postId: 149,
              excerpt: contentFive,
              date: "2018-03-10 08:54:25",
              modified: "2018-03-12 08:54:25",
              title: "Learn React!",
              featuredImage: null,
              tags: {
                nodes: [{
                  id: "Y2F0ZWdcdnk6HP==",
                  name: "javascript",
                  __typename: 'Tag',
                }, {
                  id: "Y2F0ZWdcdnk6BR==",
                  name: "node.js",
                  __typename: 'Tag',
                }, {
                  id: "Y2F0ZWdcdnk6BT==",
                  name: "webpack",
                  __typename: 'Tag',
                }, {
                  id: "Y2F0ZWdcdnk6BA==",
                  name: "react",
                  __typename: 'Tag',
                }, {
                  id: "Y2F0ZWdcdnk6BG==",
                  name: "Es6",
                  __typename: 'Tag',
                }],
                __typename: 'PostTagsConnection',
              },
              categories: {
                nodes: [
                  {
                    id: "Y2F0ZWdvcnk6MQ==",
                    name: "Web Development",
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
            {
              id: "cG9zdDoxNjR=",
              postId: 120,
              excerpt: contentTwo,
              date: "2017-10-17 08:54:25",
              modified: "2017-10-17 08:54:25",
              title: "Hall-o-ween App coming soon",
              featuredImage: null,
              tags: {
                nodes: [{
                  id: "Y2F0ZWdcdnk6HP==",
                  name: "javascript",
                  __typename: 'Tag'
                }, {
                  id: "Y2F0ZWdcdnk6HC==",
                  name: "html",
                  __typename: 'Tag'
                }, {
                  id: "Y2F0ZWdcdnk6HJ==",
                  name: "css",
                  __typename: 'Tag'
                }],
                __typename: 'PostTagsConnection',
              },
              categories: {
                nodes: [
                  {
                    id: "Y2F0ZWdvcnk6MQ==",
                    name: "Web Development",
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
            {
              id: "cG9zdDoxNjG=",
              postId: 156,
              excerpt: contentThree,
              date: "2018-04-12 08:54:25",
              modified: "2018-04-12 08:54:25",
              title: "New project!",
              featuredImage: null,
              tags: {
                nodes: [{
                  id: "Y2F0ZWdcdnk6HP==",
                  name: "javascript",
                  __typename: 'Tag'
                }, {
                  id: "Y2F0ZWdcdnk6HC==",
                  name: "html",
                  __typename: 'Tag'
                }, {
                  id: "Y2F0ZWdcdnk6HJ==",
                  name: "css",
                  __typename: 'Tag'
                }],
                __typename: 'PostTagsConnection',
              },
              categories: {
                nodes: [
                  {
                    id: "Y2F0ZWdvcnk6MQ==",
                    name: "Web Development",
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
            {
              id: "cG9zdDoxNjK=",
              postId: 149,
              excerpt: contentFive,
              date: "2018-03-10 08:54:25",
              modified: "2018-03-12 08:54:25",
              title: "Learn React!",
              featuredImage: null,
              tags: {
                nodes: [{
                  id: "Y2F0ZWdcdnk6HP==",
                  name: "javascript",
                  __typename: 'Tag',
                }, {
                  id: "Y2F0ZWdcdnk6BR==",
                  name: "node.js",
                  __typename: 'Tag',
                }, {
                  id: "Y2F0ZWdcdnk6BT==",
                  name: "webpack",
                  __typename: 'Tag',
                }, {
                  id: "Y2F0ZWdcdnk6BA==",
                  name: "react",
                  __typename: 'Tag',
                }, {
                  id: "Y2F0ZWdcdnk6BG==",
                  name: "Es6",
                  __typename: 'Tag',
                }],
                __typename: 'PostTagsConnection',
              },
              categories: {
                nodes: [
                  {
                    id: "Y2F0ZWdvcnk6MQ==",
                    name: "Web Development",
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
            {
              id: "cG9zdDoxNjR=",
              postId: 120,
              excerpt: contentTwo,
              date: "2017-10-17 08:54:25",
              modified: "2017-10-17 08:54:25",
              title: "Hall-o-ween App coming soon",
              featuredImage: null,
              tags: {
                nodes: [{
                  id: "Y2F0ZWdcdnk6HP==",
                  name: "javascript",
                  __typename: 'Tag'
                }, {
                  id: "Y2F0ZWdcdnk6HC==",
                  name: "html",
                  __typename: 'Tag'
                }, {
                  id: "Y2F0ZWdcdnk6HJ==",
                  name: "css",
                  __typename: 'Tag'
                }],
                __typename: 'PostTagsConnection',
              },
              categories: {
                nodes: [
                  {
                    id: "Y2F0ZWdvcnk6MQ==",
                    name: "Web Development",
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
          ],
          __typename: 'RootPostsConnection',
        }
      }
    }
  },
];

afterEach(cleanup);

it(`renders archive of first five most recent posts`, async () => {
  const { getByTestId } = render(
    <MockedProvider mocks={mocks} cache={cache} addTypename>
      <Archive first={5} data-testid="test-archive" />
    </MockedProvider>
  );

  // Confirms results container
  const results = await waitForElement(() => getByTestId(/test-archive/));
  expect(results).toBeTruthy();

  // Confirms header
  const header = results.querySelector('.archive-header');
  expect(header.innerHTML).toEqual('Recent Posts');

  // Confirms result count
  const count = results.querySelectorAll('.result').length;
  expect(count).toBe(5);
});


it(`renders archive of first five posts by month with a custom view layer component`, async () => {
  const customPost  = ({
    id, postId, excerpt, title,
    date, modified, featuredImage, author,
    categories, tags, ...rest
  }) => (
    <div className="result" {...rest}>
      
    </div>
  );

  const customArchive = ({
    className,
    resultsData = [],
    header,
    postResultView: PostResult,
    pageResultView: PageResult,
    ...rest
  }) => (
    <div {...rest}>
      <h2 className="archive-header">{header}</h2>
      { map(resultsData, ({id, ...r}) => (<PostResult {...r} id={id} key={id} />)) }
    </div>
  );

  const CustomArchive = archive.compose({
    view: customArchive,
    postResultView: customPost,
  });


  const { getByTestId } = render(
    <MockedProvider mocks={mocks} cache={cache} addTypename>
      <CustomArchive first={5} where={{ month: 4, year: 2018 }} data-testid="test-archive" />
    </MockedProvider>
  );

  // Confirms results container
  const results = await waitForElement(() => getByTestId(/test-archive/));
  expect(results).toBeTruthy();

  // Confirms keywords
  const header = results.querySelector('.archive-header');
  expect(header.innerHTML).toEqual('Posts made April 2018');

  // Confirms result count
  const count = results.querySelectorAll('.result').length;
  expect(count).toBe(3);
});


it(`renders archive of first five posts by year`, async () => {
  const { getByTestId } = render(
    <MockedProvider mocks={mocks} cache={cache} addTypename>
      <Archive first={5} where={{ year: 2017 }} data-testid="test-archive" />
    </MockedProvider>
  );

  // Confirms results container
  const results = await waitForElement(() => getByTestId(/test-archive/));
  expect(results).toBeTruthy();

  // Confirms header
  const header = results.querySelector('.archive-header');
  expect(header.innerHTML).toEqual('Posts made last year');

  // Confirms result count
  const count = results.querySelectorAll('.result').length;
  expect(count).toBe(1);
});


it(`renders archive of first five posts by author`, async () => {
  const { getByTestId } = render(
    <MockedProvider mocks={mocks} cache={cache} addTypename>
      <Archive first={5} where={{ author: 2 }} data-testid="test-archive" />
    </MockedProvider>
  );

  // Confirms results container
  const results = await waitForElement(() => getByTestId(/test-archive/));
  expect(results).toBeTruthy();

  // Confirms keywords
  const header = results.querySelector('.archive-header');
  expect(header.innerHTML).toEqual('Posts made by MaxKnob');

  // Confirms result count
  const count = results.querySelectorAll('.result').length;
  expect(count).toBe(3);
});


it(`renders archive of first five posts by category`, async () => {
  const { getByTestId } = render(
    <MockedProvider mocks={mocks} cache={cache} addTypename>
      <Archive first={5} where={{ category: 'Web Development' }} data-testid="test-archive" />
    </MockedProvider>
  );

  // Confirms results container
  const results = await waitForElement(() => getByTestId(/test-archive/));
  expect(results).toBeTruthy();

  // Confirms keywords
  const header = results.querySelector('.archive-header');
  expect(header.innerHTML).toEqual('Posts categorized in Web Development');

  // Confirms result count
  const count = results.querySelectorAll('.result').length;
  expect(count).toBe(3);
});


it(`renders archive of first five posts by tag`, async () => {
  const { getByTestId } = render(
    <MockedProvider mocks={mocks} cache={cache} addTypename>
      <Archive first={5} where={{ tag: 'javascript' }} data-testid="test-archive" />
    </MockedProvider>
  );

  // Confirms results container
  const results = await waitForElement(() => getByTestId(/test-archive/));
  expect(results).toBeTruthy();

  // Confirms keywords
  const header = results.querySelector('.archive-header');
  expect(header.innerHTML).toEqual('Posts tagged in Javascript');

  // Confirms result count
  const count = results.querySelectorAll('.result').length;
  expect(count).toBe(3);
});


it(`renders archive of first five posts by search`, async () => {
  const { getByTestId } = render(
    <MockedProvider mocks={mocks} cache={cache} addTypename>
      <Archive first={5} where={{ search: 'lorem ipsum' }} data-testid="test-archive" />
    </MockedProvider>
  );

  // Confirms results container
  const results = await waitForElement(() => getByTestId(/test-archive/));
  expect(results).toBeTruthy();

  // Confirms keywords
  const header = results.querySelector('.archive-header');
  expect(header.innerHTML).toEqual('Searching lorem ipsum');

  // Confirms result count
  const count = results.querySelectorAll('.result').length;
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
  
  const { getByTestId } = render(
    <MockedProvider mocks={emptyMocks} addTypename>
      <Archive first={5} data-testid="test-archive" />
    </MockedProvider>
  );

  // Confirms results container
  const results = await waitForElement(() => getByTestId(/test-archive/));
  expect(results).toBeTruthy();

  // Confirms header
  const header = results.querySelector('.archive-header');
  expect(header.innerHTML).toEqual('No posts found');

  // Confirms result count
  const count = results.querySelectorAll('.result').length;
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