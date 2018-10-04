import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';
import _ from 'lodash';

import {
  MENU_QUERY, MENU_WHERE_QUERY, MENU_ITEM_QUERY, Menu,
  menu, menuItem, subMenu,
} from 'lib';

afterEach(cleanup);

it(`renders a menu by id`, async () => {
  const mocks = [{
    request: {
      query: MENU_QUERY,
      variables: { id: "TWVudTo2" },
    },
    result: {
      data: {
        menu: {
          id: "TWVudTo2",
          slug: "primary",
          menuItems: {
            nodes: [
              {
                id: "TWVudUl0ZW06MTQw",
                url: "https://facebook.com",
                label: "Facebook"
              },
              {
                id: "TWVudUl0ZW06MTQx",
                url: "https://twitter.com",
                label: "Twitter"
              },
              {
                id: "TWVudUl0ZW06MTQy",
                url: "https://github.com",
                label: "GitHub"
              },
              {
                id: "TWVudUl0ZW06MTQz",
                url: "https://linkedin.com",
                label: "LinkedIn"
              },
              {
                id: "TWVudUl0ZW06MTQ0",
                url: "https://wordpress.org",
                label: "WordPress"
              }
            ]
          }
        }
      }
    }
  }, {
    request: {
      query: MENU_ITEM_QUERY,
      variables: { id: "TWVudUl0ZW06MTQw" }
    },
    result: {
      data: {
        menuItem: {
          childItems: {
            nodes: [],
          }
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
          }
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
          }
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
                url: "https://google.com",
                label: "Google"
              },
              {
                id: "TWVudUl0ZW06MTQj",
                url: "https://yahoo.com",
                label: "Yahoo"
              },
              {
                id: "TWVudUl0ZW06MTQp",
                url: "https://bing.com",
                label: "Bing"
              },
            ],
          }
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
          }
        }
      }
    }
  }];

  const { getByTestId, getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Menu id="TWVudTo2" className="test-menu" data-testid="test-menu" />
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

  const google = getByText(/Google/);
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
  const mocks = [{
    request: {
      query: MENU_WHERE_QUERY,
      variables: { menuId: null, location: "PRIMARY", slug: null },
    },
    result: {
      data: {
        menus: {
          nodes: [
            {
              id: "TWVudTo2",
              slug: "primary",
              menuItems: {
                nodes: [
                  {
                    id: "TWVudUl0ZW06MTQw",
                    url: "https://facebook.com",
                    label: "Facebook"
                  },
                  {
                    id: "TWVudUl0ZW06MTQx",
                    url: "https://twitter.com",
                    label: "Twitter"
                  },
                  {
                    id: "TWVudUl0ZW06MTQy",
                    url: "https://github.com",
                    label: "GitHub"
                  },
                  {
                    id: "TWVudUl0ZW06MTQz",
                    url: "https://linkedin.com",
                    label: "LinkedIn"
                  },
                  {
                    id: "TWVudUl0ZW06MTQ0",
                    url: "https://wordpress.org",
                    label: "WordPress"
                  }
                ]
              }
            }
          ]
        }
      }
    }
  }, {
    request: {
      query: MENU_ITEM_QUERY,
      variables: { id: "TWVudUl0ZW06MTQw" }
    },
    result: {
      data: {
        menuItem: {
          childItems: {
            nodes: [],
          }
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
            nodes: [
              {
                id: "TWVudUl0ZW06MTQs",
                url: "https://google.com",
                label: "Google"
              },
              {
                id: "TWVudUl0ZW06MTQj",
                url: "https://yahoo.com",
                label: "Yahoo"
              },
              {
                id: "TWVudUl0ZW06MTQp",
                url: "https://bing.com",
                label: "Bing"
              },
            ],
          }
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
          }
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
            nodes: [],
          }
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
          }
        }
      }
    }
  }];

  const { getByTestId, getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Menu location="PRIMARY" className="test-menu" data-testid="test-menu" />
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

  const google = getByText(/Google/);
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
  const CustomSubMenu = subMenu.compose({
    view: ({
      itemView,
      Item,
      items,
      ...rest
    }) => (
      <ol data-testid="custom-submenu" {...rest}>
        {_.map(items, ({ id, ...rest }) => (<li key={id}><Item id={id} {...rest} /></li>))}
      </ol>
    ),
    Item: ({ url, label, ...rest }) => (
      <a href={url} {...rest}>{label}</a>
    ),
  });

  const CustomMenuItem = menuItem.compose({
    view: ({
      url,
      label,
      items,
      SubMenu,
      subMenuView,
      ...rest
    }) => (
      <React.Fragment>
        <a data-testid="custom-menu-item" href={url} {...rest}>{label}</a>
        {!_.isEmpty(items) && (<SubMenu className="sub-menu" items={items} />)}
      </React.Fragment>
    ),
    SubMenu: CustomSubMenu,
  });

  const CustomMenu = menu.compose({
    view: ({
      slug,
      className,
      'data-testid': dataTestId,
      items,
      MenuItem,
      itemView
    }) => (
      <div id={`menu-${slug}`} className={className} data-testid={dataTestId}>
        {_.map(items, ({ id, ...r}) => (<MenuItem key={id} id={id} {...r} />))}
      </div>
    ),
    MenuItem: CustomMenuItem
  });


  const mocks = [{
    request: {
      query: MENU_WHERE_QUERY,
      variables: { menuId: null, location: "TEST", slug: null },
    },
    result: {
      data: {
        menus: {
          nodes: [
            {
              id: "TWVudTo2",
              slug: "test",
              menuItems: {
                nodes: [
                  {
                    id: "TWVudUl0ZW06MTQw",
                    url: "https://facebook.com",
                    label: "Facebook"
                  },
                  {
                    id: "TWVudUl0ZW06MTQx",
                    url: "https://twitter.com",
                    label: "Twitter"
                  },
                  {
                    id: "TWVudUl0ZW06MTQy",
                    url: "https://github.com",
                    label: "GitHub"
                  },
                  {
                    id: "TWVudUl0ZW06MTQz",
                    url: "https://linkedin.com",
                    label: "LinkedIn"
                  },
                  {
                    id: "TWVudUl0ZW06MTQ0",
                    url: "https://wordpress.org",
                    label: "WordPress"
                  }
                ]
              }
            }
          ]
        }
      }
    }
  }, {
    request: {
      query: MENU_ITEM_QUERY,
      variables: { id: "TWVudUl0ZW06MTQw" }
    },
    result: {
      data: {
        menuItem: {
          childItems: {
            nodes: [
              {
                id: "TWVudUl0ZW06MTQs",
                url: "https://google.com",
                label: "Google"
              },
              {
                id: "TWVudUl0ZW06MTQj",
                url: "https://yahoo.com",
                label: "Yahoo"
              },
              {
                id: "TWVudUl0ZW06MTQp",
                url: "https://bing.com",
                label: "Bing"
              },
            ],
          }
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
          }
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
          }
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
            nodes: [],
          }
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
          }
        }
      }
    }
  }];

  const { getByTestId, getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <CustomMenu location="TEST" className="test-menu" data-testid="test-menu" />
    </MockedProvider>
  );

  const testMenu = await waitForElement(() => getByTestId('test-menu'));
  expect(testMenu).toBeTruthy();
  expect(testMenu.getAttribute('id')).toEqual('menu-test');

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

  const customMenuItems = getByTestId('custom-menu-item');
  expect(customMenuItems).toBeTruthy();
  const customSubMenus = getByTestId('custom-submenu');
  expect(customSubMenus).toBeTruthy();

  const google = getByText(/Google/);
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
  const mocks = [{
    request: {
      query: MENU_QUERY,
      variables: { id: 1 },
    },
    error: new Error('its broke'),
  }];

  const { getByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
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