import React from 'react';
import _ from 'lodash';
import { render, cleanup, waitForElement } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';
import { MemoryRouter as Router } from 'react-router-dom';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';

import introspectionQueryResultData from 'fragmentTypes.json';
import {
  MENU_QUERY, MENU_WHERE_QUERY, MENU_ITEM_QUERY, Menu,
  menu, menuItem, subMenu, Link,
} from 'menu';

afterEach(cleanup);

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const cache = new InMemoryCache({ fragmentMatcher });

const menuData = {
  id: "TWVudTo2",
  slug: "primary",
  menuItems: {
    nodes: [
      {
        id: "TWVudUl0ZW06MTQw",
        menuItemId: 100,
        url: "https://facebook.com",
        label: "Facebook",
        cssClasses: [],
        description: null,
        __typename: 'MenuItem',
      },
      {
        id: "TWVudUl0ZW06MTQx",
        menuItemId: 101,
        url: "https://twitter.com",
        label: "Twitter",
        cssClasses: [],
        description: null,
        __typename: 'MenuItem',
      },
      {
        id: "TWVudUl0ZW06MTQy",
        menuItemId: 102,
        url: "https://github.com",
        label: "GitHub",
        cssClasses: [],
        description: null,
        __typename: 'MenuItem',
      },
      {
        id: "TWVudUl0ZW06MTQz",
        menuItemId: 103,
        url: "https://linkedin.com",
        label: "LinkedIn",
        cssClasses: [],
        description: null,
        __typename: 'MenuItem',
      },
      {
        id: "TWVudUl0ZW06MTQ0",
        menuItemId: 104,
        url: "https://wordpress.org",
        label: "WordPress",
        cssClasses: [],
        description: null,
        __typename: 'MenuItem',
      }
    ],
    __typename: 'MenuItemsConnection'
  },
  __typename: 'Menu'
};

const menuItemRequests = [
  {
    request: {
      query: MENU_ITEM_QUERY,
      variables: { id: "TWVudUl0ZW06MTQw" }
    },
    result: {
      data: {
        menuItem: {
          childItems: {
            nodes: [],
            __typename: 'MenuItemsConnection',
          },
          __typename: 'MenuItem',
        }
      }
    }
  }, {
    request: {
      query: MENU_ITEM_QUERY,
      variables: { id: "TWVudUl0ZW06MTQx" }
    },
    result: {
      data: {
        menuItem: {
          childItems: {
            nodes: [],
            __typename: 'MenuItemsConnection',
          },
          __typename: 'MenuItem',
        }
      }
    }
  }, {
    request: {
      query: MENU_ITEM_QUERY,
      variables: { id: "TWVudUl0ZW06MTQy" }
    },
    result: {
      data: {
        menuItem: {
          childItems: {
            nodes: [],
            __typename: 'MenuItemsConnection',
          },
          __typename: 'MenuItem',
        }
      }
    }
  }, {
    request: {
      query: MENU_ITEM_QUERY,
      variables: { id: "TWVudUl0ZW06MTQz" }
    },
    result: {
      data: {
        menuItem: {
          childItems: {
            nodes: [
              {
                id: "TWVudUl0ZW06MTQs",
                menuItemId: 110,
                url: "https://google.com",
                label: "Google",
                cssClasses: [],
                description: null,
                __typename: 'MenuItem',
              },
              {
                id: "TWVudUl0ZW06MTQj",
                menuItemId: 111,
                url: "https://yahoo.com",
                label: "Yahoo",
                cssClasses: [],
                description: null,
                __typename: 'MenuItem',
              },
              {
                id: "TWVudUl0ZW06MTQp",
                menuItemId: 112,
                url: "https://bing.com",
                label: "Bing",
                cssClasses: [],
                description: null,
                __typename: 'MenuItem',
              },
            ],
            __typename: 'MenuItemsConnection',
          },
          __typename: 'MenuItem',
        }
      }
    }
  }, {
    request: {
      query: MENU_ITEM_QUERY,
      variables: { id: "TWVudUl0ZW06MTQ0" }
    },
    result: {
      data: {
        menuItem: {
          childItems: {
            nodes: [],
            __typename: 'MenuItemsConnection',
          },
          __typename: 'MenuItem',
        }
      }
    }
  }, {
    request: {
      query: MENU_ITEM_QUERY,
      variables: { id: "TWVudUl0ZW06MTQs" }
    },
    result: {
      data: {
        menuItem: {
          childItems: {
            nodes: [],
            __typename: 'MenuItemsConnection',
          },
          __typename: 'MenuItem',
        }
      }
    }
  }, {
    request: {
      query: MENU_ITEM_QUERY,
      variables: { id: "TWVudUl0ZW06MTQj" }
    },
    result: {
      data: {
        menuItem: {
          childItems: {
            nodes: [],
            __typename: 'MenuItemsConnection',
          },
          __typename: 'MenuItem',
        }
      }
    }
  }, {
    request: {
      query: MENU_ITEM_QUERY,
      variables: { id: "TWVudUl0ZW06MTQp" }
    },
    result: {
      data: {
        menuItem: {
          childItems: {
            nodes: [],
            __typename: 'MenuItemsConnection',
          },
          __typename: 'MenuItem',
        }
      }
    }
  }
];

const mocks = [
  {
    request: {
      query: MENU_QUERY,
      variables: { id: "TWVudTo2" },
    },
    result: {
      data: {
        menu: menuData
      }
    }
  },
  {
    request: {
      query: MENU_WHERE_QUERY,
      variables: { menuId: null, location: "PRIMARY", slug: null },
    },
    result: {
      data: {
        menus: {
          nodes: [menuData],
          __typename: 'MenusConnection',
        }
      }
    }
  },
  ...menuItemRequests
];

it(`renders a menu by id`, async () => {
  const { getByTestId, getByText } = render(
    <MockedProvider mocks={mocks} cache={cache} addTypename>
      <Router initialEntries={['/']}>
        <Menu id="TWVudTo2" className="test-menu" data-testid="test-menu" />
      </Router>
    </MockedProvider>
  );

  const testMenu = await waitForElement(() => getByTestId('test-menu'));
  expect(testMenu).toBeTruthy();
  expect(testMenu.getAttribute('id')).toEqual('menu-primary');

  const facebook = await waitForElement(() => getByText(/Facebook/));
  expect(facebook).toBeTruthy();
  expect(facebook.getAttribute('href')).toEqual('https://facebook.com');

  const twitter = getByText(/Twitter/);
  expect(twitter).toBeTruthy();
  expect(twitter.getAttribute('href')).toEqual('https://twitter.com');

  const github = getByText(/GitHub/);
  expect(github).toBeTruthy();
  expect(github.getAttribute('href')).toEqual('https://github.com');

  const linkedIn = getByText(/LinkedIn/);
  expect(linkedIn).toBeTruthy();
  expect(linkedIn.getAttribute('href')).toEqual('https://linkedin.com');

  const wordpress = getByText(/WordPress/);
  expect(wordpress).toBeTruthy();
  expect(wordpress.getAttribute('href')).toEqual('https://wordpress.org');

  const sub = testMenu.querySelector('.sub-menu');
  expect(sub).toBeTruthy();

  const google = await waitForElement(() => getByText(/Google/));
  expect(google).toBeTruthy();
  expect(google.getAttribute('href')).toEqual('https://google.com');

  const yahoo = getByText(/Yahoo/);
  expect(yahoo).toBeTruthy();
  expect(yahoo.getAttribute('href')).toEqual('https://yahoo.com');

  const bing = getByText(/Bing/);
  expect(bing).toBeTruthy();
  expect(bing.getAttribute('href')).toEqual('https://bing.com');
});

it(`renders a menu by location`, async () => {
  const { getByTestId, getByText } = render(
    <MockedProvider mocks={mocks}  cache={cache} addTypename>
      <Router initialEntries={['/']}>
        <Menu location="PRIMARY" className="test-menu" data-testid="test-menu" />
      </Router>
    </MockedProvider>
  );

  const testMenu = await waitForElement(() => getByTestId('test-menu'));
  expect(testMenu).toBeTruthy();
  expect(testMenu.getAttribute('id')).toEqual('menu-primary'); 

  const facebook = getByText(/Facebook/);
  expect(facebook).toBeTruthy();
  expect(facebook.getAttribute('href')).toEqual('https://facebook.com');

  const twitter = getByText(/Twitter/);
  expect(twitter).toBeTruthy();
  expect(twitter.getAttribute('href')).toEqual('https://twitter.com');

  const github = getByText(/GitHub/);
  expect(github).toBeTruthy();
  expect(github.getAttribute('href')).toEqual('https://github.com');

  const linkedIn = getByText(/LinkedIn/);
  expect(linkedIn).toBeTruthy();
  expect(linkedIn.getAttribute('href')).toEqual('https://linkedin.com');

  const wordpress = getByText(/WordPress/);
  expect(wordpress).toBeTruthy();
  expect(wordpress.getAttribute('href')).toEqual('https://wordpress.org');

  const sub = testMenu.querySelector('.sub-menu');
  expect(sub).toBeTruthy();

  const google = await waitForElement(() => getByText(/Google/));
  expect(google).toBeTruthy();
  expect(google.getAttribute('href')).toEqual('https://google.com');

  const yahoo = getByText(/Yahoo/);
  expect(yahoo).toBeTruthy();
  expect(yahoo.getAttribute('href')).toEqual('https://yahoo.com');

  const bing = getByText(/Bing/);
  expect(bing).toBeTruthy();
  expect(bing.getAttribute('href')).toEqual('https://bing.com');
});

it(`renders a menu with a custom template`, async () => {
  const subMenuView = ({ MenuItem, SubMenu, items, ...rest }) => (
    <ol data-testid="custom-submenu" {...rest}>
      {_.map(items, ({ id, menuItemId, cssClasses, ...r}) => (
        <li key={id}>
          <MenuItem
            className={`menuItem ${cssClasses.join(' ')}`}
            id={id}
            {...{ ...r, MenuItem, SubMenu }}
          />
        </li>
      ))}
    </ol>
  )

  const menuItemView = ({ url, label, items, SubMenu, MenuItem, description, ...rest }) => (
    <React.Fragment>
      <Link {...{ ...rest, url }}>{label}</Link>
      {!_.isEmpty(items) && (
        <SubMenu
          className="sub-menu"
          {...{ items, SubMenu, MenuItem}}
        />
      )}
    </React.Fragment>
  )

  const customMenuView = ({ slug, className, items, MenuItem, SubMenu, ...rest }) => (
    <div id={`menu-${slug}`} className={className} {...rest}>
      {_.map(items, ({ id, menuItemId, cssClasses, ...r}) => (
        <MenuItem
          className={`menuItem ${cssClasses.join(' ')}`}
          key={id}
          id={id}
          {...{ ...r, MenuItem, SubMenu }}
        />
      ))}
    </div>
  );

  const SubMenu = subMenu.compose({ view: subMenuView });
  const MenuItem = menuItem.compose({ view: menuItemView });
  const CustomMenu = menu.compose({
    view: customMenuView,
    MenuItem,
    SubMenu
  });

  const { getByTestId, getByText } = render(
    <MockedProvider mocks={mocks}  cache={cache} addTypename>
      <CustomMenu location="PRIMARY" data-testid="test-menu" />
    </MockedProvider>
  );

  const testMenu = await waitForElement(() => getByTestId('test-menu'));
  expect(testMenu).toBeTruthy();
  expect(testMenu.getAttribute('id')).toEqual('menu-primary');

  const facebook = await waitForElement(() => getByText(/Facebook/));
  expect(facebook).toBeTruthy();
  expect(facebook.getAttribute('href')).toEqual('https://facebook.com');

  const twitter = getByText(/Twitter/);
  expect(twitter).toBeTruthy();
  expect(twitter.getAttribute('href')).toEqual('https://twitter.com');

  const github = getByText(/GitHub/);
  expect(github).toBeTruthy();
  expect(github.getAttribute('href')).toEqual('https://github.com');

  const linkedIn = getByText(/LinkedIn/);
  expect(linkedIn).toBeTruthy();
  expect(linkedIn.getAttribute('href')).toEqual('https://linkedin.com');

  const wordpress = getByText(/WordPress/);
  expect(wordpress).toBeTruthy();
  expect(wordpress.getAttribute('href')).toEqual('https://wordpress.org');

  const sub = testMenu.querySelector('.sub-menu');
  expect(sub).toBeTruthy();

  const google = await waitForElement(() => getByText(/Google/));
  expect(google).toBeTruthy();
  expect(google.getAttribute('href')).toEqual('https://google.com');

  const yahoo = getByText(/Yahoo/);
  expect(yahoo).toBeTruthy();
  expect(yahoo.getAttribute('href')).toEqual('https://yahoo.com');

  const bing = getByText(/Bing/);
  expect(bing).toBeTruthy();
  expect(bing.getAttribute('href')).toEqual('https://bing.com');
});

it(`renders loading state initially`, () => {
  const { getByText, getByTestId } = render(
    <MockedProvider mocks={[]} addTypename={false}>
      <Menu id={1} />
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
      query: MENU_QUERY,
      variables: { id: 1 },
    },
    error: new Error('its broke'),
  }];

  const { getByTestId } = render(
    <MockedProvider mocks={errorMocks} cache={cache} addTypename>
      <Menu id={1} />
    </MockedProvider>,
  );

  const icon = await waitForElement(() => getByTestId(/error-icon/));
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === '').toBeFalsy();
  const message = getByTestId(/error-message/);
  expect(message).toBeTruthy()
  expect(message.innerHTML === '').toBeFalsy();
});