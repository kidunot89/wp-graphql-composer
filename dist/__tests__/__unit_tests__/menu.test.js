import _objectSpread from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectSpread";
import _objectWithoutProperties from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import _regeneratorRuntime from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/regenerator";
import _asyncToGenerator from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import React from 'react';
import _ from 'lodash';
import { render, cleanup, waitForElement } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';
import { MemoryRouter as Router } from 'react-router-dom';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from 'fragmentTypes.json';
import { MENU_QUERY, MENU_WHERE_QUERY, MENU_ITEM_QUERY, Menu, menu, menuItem, subMenu, Link } from 'menu';
afterEach(cleanup);
var fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: introspectionQueryResultData
});
var cache = new InMemoryCache({
  fragmentMatcher: fragmentMatcher
});
var menuData = {
  id: "TWVudTo2",
  slug: "primary",
  menuItems: {
    nodes: [{
      id: "TWVudUl0ZW06MTQw",
      menuItemId: 100,
      url: "https://facebook.com",
      label: "Facebook",
      cssClasses: [],
      description: null,
      __typename: 'MenuItem'
    }, {
      id: "TWVudUl0ZW06MTQx",
      menuItemId: 101,
      url: "https://twitter.com",
      label: "Twitter",
      cssClasses: [],
      description: null,
      __typename: 'MenuItem'
    }, {
      id: "TWVudUl0ZW06MTQy",
      menuItemId: 102,
      url: "https://github.com",
      label: "GitHub",
      cssClasses: [],
      description: null,
      __typename: 'MenuItem'
    }, {
      id: "TWVudUl0ZW06MTQz",
      menuItemId: 103,
      url: "https://linkedin.com",
      label: "LinkedIn",
      cssClasses: [],
      description: null,
      __typename: 'MenuItem'
    }, {
      id: "TWVudUl0ZW06MTQ0",
      menuItemId: 104,
      url: "https://wordpress.org",
      label: "WordPress",
      cssClasses: [],
      description: null,
      __typename: 'MenuItem'
    }],
    __typename: 'MenuItemsConnection'
  },
  __typename: 'Menu'
};
var generalSettingsData = {
  url: 'https://example.com',
  __typename: 'Settings'
};
var menuItemRequests = [{
  request: {
    query: MENU_ITEM_QUERY,
    variables: {
      id: "TWVudUl0ZW06MTQw"
    }
  },
  result: {
    data: {
      menuItem: {
        childItems: {
          nodes: [],
          __typename: 'MenuItemsConnection'
        },
        __typename: 'MenuItem'
      }
    }
  }
}, {
  request: {
    query: MENU_ITEM_QUERY,
    variables: {
      id: "TWVudUl0ZW06MTQx"
    }
  },
  result: {
    data: {
      menuItem: {
        childItems: {
          nodes: [],
          __typename: 'MenuItemsConnection'
        },
        __typename: 'MenuItem'
      }
    }
  }
}, {
  request: {
    query: MENU_ITEM_QUERY,
    variables: {
      id: "TWVudUl0ZW06MTQy"
    }
  },
  result: {
    data: {
      menuItem: {
        childItems: {
          nodes: [],
          __typename: 'MenuItemsConnection'
        },
        __typename: 'MenuItem'
      }
    }
  }
}, {
  request: {
    query: MENU_ITEM_QUERY,
    variables: {
      id: "TWVudUl0ZW06MTQz"
    }
  },
  result: {
    data: {
      menuItem: {
        childItems: {
          nodes: [{
            id: "TWVudUl0ZW06MTQs",
            menuItemId: 110,
            url: "https://google.com",
            label: "Google",
            cssClasses: [],
            description: null,
            __typename: 'MenuItem'
          }, {
            id: "TWVudUl0ZW06MTQj",
            menuItemId: 111,
            url: "https://yahoo.com",
            label: "Yahoo",
            cssClasses: [],
            description: null,
            __typename: 'MenuItem'
          }, {
            id: "TWVudUl0ZW06MTQp",
            menuItemId: 112,
            url: "https://bing.com",
            label: "Bing",
            cssClasses: [],
            description: null,
            __typename: 'MenuItem'
          }],
          __typename: 'MenuItemsConnection'
        },
        __typename: 'MenuItem'
      }
    }
  }
}, {
  request: {
    query: MENU_ITEM_QUERY,
    variables: {
      id: "TWVudUl0ZW06MTQ0"
    }
  },
  result: {
    data: {
      menuItem: {
        childItems: {
          nodes: [],
          __typename: 'MenuItemsConnection'
        },
        __typename: 'MenuItem'
      }
    }
  }
}, {
  request: {
    query: MENU_ITEM_QUERY,
    variables: {
      id: "TWVudUl0ZW06MTQs"
    }
  },
  result: {
    data: {
      menuItem: {
        childItems: {
          nodes: [],
          __typename: 'MenuItemsConnection'
        },
        __typename: 'MenuItem'
      }
    }
  }
}, {
  request: {
    query: MENU_ITEM_QUERY,
    variables: {
      id: "TWVudUl0ZW06MTQj"
    }
  },
  result: {
    data: {
      menuItem: {
        childItems: {
          nodes: [],
          __typename: 'MenuItemsConnection'
        },
        __typename: 'MenuItem'
      }
    }
  }
}, {
  request: {
    query: MENU_ITEM_QUERY,
    variables: {
      id: "TWVudUl0ZW06MTQp"
    }
  },
  result: {
    data: {
      menuItem: {
        childItems: {
          nodes: [],
          __typename: 'MenuItemsConnection'
        },
        __typename: 'MenuItem'
      }
    }
  }
}];
var mocks = [{
  request: {
    query: MENU_QUERY,
    variables: {
      id: "TWVudTo2"
    }
  },
  result: {
    data: {
      menu: menuData,
      generalSettings: generalSettingsData
    }
  }
}, {
  request: {
    query: MENU_WHERE_QUERY,
    variables: {
      menuId: null,
      location: "PRIMARY",
      slug: null
    }
  },
  result: {
    data: {
      menus: {
        nodes: [menuData],
        __typename: 'MenusConnection'
      },
      generalSettings: generalSettingsData
    }
  }
}].concat(menuItemRequests);
it("renders a menu by id",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee() {
  var _render, getByTestId, getByText, testMenu, facebook, twitter, github, linkedIn, wordpress, sub, google, yahoo, bing;

  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _render = render(React.createElement(MockedProvider, {
            mocks: mocks,
            cache: cache,
            addTypename: true
          }, React.createElement(Router, {
            initialEntries: ['/']
          }, React.createElement(Menu, {
            id: "TWVudTo2",
            className: "test-menu",
            "data-testid": "test-menu"
          })))), getByTestId = _render.getByTestId, getByText = _render.getByText;
          _context.next = 3;
          return waitForElement(function () {
            return getByTestId('test-menu');
          });

        case 3:
          testMenu = _context.sent;
          expect(testMenu).toBeTruthy();
          expect(testMenu.getAttribute('id')).toEqual('menu-primary');
          _context.next = 8;
          return waitForElement(function () {
            return getByText(/Facebook/);
          });

        case 8:
          facebook = _context.sent;
          expect(facebook).toBeTruthy();
          expect(facebook.getAttribute('href')).toEqual('https://facebook.com');
          twitter = getByText(/Twitter/);
          expect(twitter).toBeTruthy();
          expect(twitter.getAttribute('href')).toEqual('https://twitter.com');
          github = getByText(/GitHub/);
          expect(github).toBeTruthy();
          expect(github.getAttribute('href')).toEqual('https://github.com');
          linkedIn = getByText(/LinkedIn/);
          expect(linkedIn).toBeTruthy();
          expect(linkedIn.getAttribute('href')).toEqual('https://linkedin.com');
          wordpress = getByText(/WordPress/);
          expect(wordpress).toBeTruthy();
          expect(wordpress.getAttribute('href')).toEqual('https://wordpress.org');
          sub = testMenu.querySelector('.sub-menu');
          expect(sub).toBeTruthy();
          _context.next = 27;
          return waitForElement(function () {
            return getByText(/Google/);
          });

        case 27:
          google = _context.sent;
          expect(google).toBeTruthy();
          expect(google.getAttribute('href')).toEqual('https://google.com');
          yahoo = getByText(/Yahoo/);
          expect(yahoo).toBeTruthy();
          expect(yahoo.getAttribute('href')).toEqual('https://yahoo.com');
          bing = getByText(/Bing/);
          expect(bing).toBeTruthy();
          expect(bing.getAttribute('href')).toEqual('https://bing.com');

        case 36:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));
it("renders a menu by location",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee2() {
  var _render2, getByTestId, getByText, testMenu, facebook, twitter, github, linkedIn, wordpress, sub, google, yahoo, bing;

  return _regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _render2 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            cache: cache,
            addTypename: true
          }, React.createElement(Router, {
            initialEntries: ['/']
          }, React.createElement(Menu, {
            location: "PRIMARY",
            className: "test-menu",
            "data-testid": "test-menu"
          })))), getByTestId = _render2.getByTestId, getByText = _render2.getByText;
          _context2.next = 3;
          return waitForElement(function () {
            return getByTestId('test-menu');
          });

        case 3:
          testMenu = _context2.sent;
          expect(testMenu).toBeTruthy();
          expect(testMenu.getAttribute('id')).toEqual('menu-primary');
          facebook = getByText(/Facebook/);
          expect(facebook).toBeTruthy();
          expect(facebook.getAttribute('href')).toEqual('https://facebook.com');
          twitter = getByText(/Twitter/);
          expect(twitter).toBeTruthy();
          expect(twitter.getAttribute('href')).toEqual('https://twitter.com');
          github = getByText(/GitHub/);
          expect(github).toBeTruthy();
          expect(github.getAttribute('href')).toEqual('https://github.com');
          linkedIn = getByText(/LinkedIn/);
          expect(linkedIn).toBeTruthy();
          expect(linkedIn.getAttribute('href')).toEqual('https://linkedin.com');
          wordpress = getByText(/WordPress/);
          expect(wordpress).toBeTruthy();
          expect(wordpress.getAttribute('href')).toEqual('https://wordpress.org');
          sub = testMenu.querySelector('.sub-menu');
          expect(sub).toBeTruthy();
          _context2.next = 25;
          return waitForElement(function () {
            return getByText(/Google/);
          });

        case 25:
          google = _context2.sent;
          expect(google).toBeTruthy();
          expect(google.getAttribute('href')).toEqual('https://google.com');
          yahoo = getByText(/Yahoo/);
          expect(yahoo).toBeTruthy();
          expect(yahoo.getAttribute('href')).toEqual('https://yahoo.com');
          bing = getByText(/Bing/);
          expect(bing).toBeTruthy();
          expect(bing.getAttribute('href')).toEqual('https://bing.com');

        case 34:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, this);
})));
it("renders a menu with a custom template",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee3() {
  var subMenuView, menuItemView, customMenuView, SubMenu, MenuItem, CustomMenu, _render3, getByTestId, getByText, testMenu, facebook, twitter, github, linkedIn, wordpress, sub, google, yahoo, bing;

  return _regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          subMenuView = function subMenuView(_ref4) {
            var MenuItem = _ref4.MenuItem,
                SubMenu = _ref4.SubMenu,
                items = _ref4.items,
                rest = _objectWithoutProperties(_ref4, ["MenuItem", "SubMenu", "items"]);

            return React.createElement("ol", Object.assign({
              "data-testid": "custom-submenu"
            }, rest), _.map(items, function (_ref5) {
              var id = _ref5.id,
                  menuItemId = _ref5.menuItemId,
                  cssClasses = _ref5.cssClasses,
                  r = _objectWithoutProperties(_ref5, ["id", "menuItemId", "cssClasses"]);

              return React.createElement("li", {
                key: id
              }, React.createElement(MenuItem, Object.assign({
                className: "menuItem ".concat(cssClasses.join(' ')),
                id: id
              }, _objectSpread({}, r, {
                MenuItem: MenuItem,
                SubMenu: SubMenu
              }))));
            }));
          };

          menuItemView = function menuItemView(_ref6) {
            var url = _ref6.url,
                label = _ref6.label,
                items = _ref6.items,
                SubMenu = _ref6.SubMenu,
                MenuItem = _ref6.MenuItem,
                description = _ref6.description,
                rest = _objectWithoutProperties(_ref6, ["url", "label", "items", "SubMenu", "MenuItem", "description"]);

            return React.createElement(React.Fragment, null, React.createElement(Link, _objectSpread({}, rest, {
              url: url
            }), label), !_.isEmpty(items) && React.createElement(SubMenu, Object.assign({
              className: "sub-menu"
            }, {
              items: items,
              SubMenu: SubMenu,
              MenuItem: MenuItem
            })));
          };

          customMenuView = function customMenuView(_ref7) {
            var slug = _ref7.slug,
                className = _ref7.className,
                items = _ref7.items,
                MenuItem = _ref7.MenuItem,
                SubMenu = _ref7.SubMenu,
                rest = _objectWithoutProperties(_ref7, ["slug", "className", "items", "MenuItem", "SubMenu"]);

            return React.createElement("div", Object.assign({
              id: "menu-".concat(slug),
              className: className
            }, rest), _.map(items, function (_ref8) {
              var id = _ref8.id,
                  menuItemId = _ref8.menuItemId,
                  cssClasses = _ref8.cssClasses,
                  r = _objectWithoutProperties(_ref8, ["id", "menuItemId", "cssClasses"]);

              return React.createElement(MenuItem, Object.assign({
                className: "menuItem ".concat(cssClasses.join(' ')),
                key: id,
                id: id
              }, _objectSpread({}, r, {
                MenuItem: MenuItem,
                SubMenu: SubMenu
              })));
            }));
          };

          SubMenu = subMenu.compose({
            view: subMenuView
          });
          MenuItem = menuItem.compose({
            view: menuItemView
          });
          CustomMenu = menu.compose({
            view: customMenuView,
            MenuItem: MenuItem,
            SubMenu: SubMenu
          });
          _render3 = render(React.createElement(MockedProvider, {
            mocks: mocks,
            cache: cache,
            addTypename: true
          }, React.createElement(CustomMenu, {
            location: "PRIMARY",
            "data-testid": "test-menu"
          }))), getByTestId = _render3.getByTestId, getByText = _render3.getByText;
          _context3.next = 9;
          return waitForElement(function () {
            return getByTestId('test-menu');
          });

        case 9:
          testMenu = _context3.sent;
          expect(testMenu).toBeTruthy();
          expect(testMenu.getAttribute('id')).toEqual('menu-primary');
          _context3.next = 14;
          return waitForElement(function () {
            return getByText(/Facebook/);
          });

        case 14:
          facebook = _context3.sent;
          expect(facebook).toBeTruthy();
          expect(facebook.getAttribute('href')).toEqual('https://facebook.com');
          twitter = getByText(/Twitter/);
          expect(twitter).toBeTruthy();
          expect(twitter.getAttribute('href')).toEqual('https://twitter.com');
          github = getByText(/GitHub/);
          expect(github).toBeTruthy();
          expect(github.getAttribute('href')).toEqual('https://github.com');
          linkedIn = getByText(/LinkedIn/);
          expect(linkedIn).toBeTruthy();
          expect(linkedIn.getAttribute('href')).toEqual('https://linkedin.com');
          wordpress = getByText(/WordPress/);
          expect(wordpress).toBeTruthy();
          expect(wordpress.getAttribute('href')).toEqual('https://wordpress.org');
          sub = testMenu.querySelector('.sub-menu');
          expect(sub).toBeTruthy();
          _context3.next = 33;
          return waitForElement(function () {
            return getByText(/Google/);
          });

        case 33:
          google = _context3.sent;
          expect(google).toBeTruthy();
          expect(google.getAttribute('href')).toEqual('https://google.com');
          yahoo = getByText(/Yahoo/);
          expect(yahoo).toBeTruthy();
          expect(yahoo.getAttribute('href')).toEqual('https://yahoo.com');
          bing = getByText(/Bing/);
          expect(bing).toBeTruthy();
          expect(bing.getAttribute('href')).toEqual('https://bing.com');

        case 42:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3, this);
})));
it("renders loading state initially", function () {
  var _render4 = render(React.createElement(MockedProvider, {
    mocks: [],
    addTypename: false
  }, React.createElement(Menu, {
    id: 1
  }))),
      getByText = _render4.getByText,
      getByTestId = _render4.getByTestId;

  var icon = getByTestId(/loading-icon/);
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === '').toBeFalsy();
  expect(getByText(/Loading\.\.\./)).toBeTruthy();
});
it("renders error state",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee4() {
  var errorMocks, _render5, getByTestId, icon, message;

  return _regeneratorRuntime.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          errorMocks = [{
            request: {
              query: MENU_QUERY,
              variables: {
                id: 1
              }
            },
            error: new Error('its broke')
          }];
          _render5 = render(React.createElement(MockedProvider, {
            mocks: errorMocks,
            cache: cache,
            addTypename: true
          }, React.createElement(Menu, {
            id: 1
          }))), getByTestId = _render5.getByTestId;
          _context4.next = 4;
          return waitForElement(function () {
            return getByTestId(/error-icon/);
          });

        case 4:
          icon = _context4.sent;
          expect(icon).toBeTruthy();
          expect(icon.innerHTML === '').toBeFalsy();
          message = getByTestId(/error-message/);
          expect(message).toBeTruthy();
          expect(message.innerHTML === '').toBeFalsy();

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee4, this);
})));