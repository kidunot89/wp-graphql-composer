var _templateObject = _taggedTemplateLiteral(['\n  query MenuQuery($id: ID!){\n    menu(id: $id) {\n      id\n      slug\n      menuItems{\n\t\t\t\tnodes {\n          id\n          menuItemId\n          url\n          label\n          cssClasses\n          description\n        }\n      }\n    }\n  }\n'], ['\n  query MenuQuery($id: ID!){\n    menu(id: $id) {\n      id\n      slug\n      menuItems{\n\t\t\t\tnodes {\n          id\n          menuItemId\n          url\n          label\n          cssClasses\n          description\n        }\n      }\n    }\n  }\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  query MenuWhereQuery(\n    $menuId: Int\n    $location: MenuLocation\n    $slug: String\n  ){\n    menus(where: { id: $menuId, location: $location, slug: $slug }) {\n      nodes{\n        id\n        slug\n        menuItems{\n          nodes {\n            id\n            menuItemId\n            url\n            label\n            cssClasses\n            description\n          }\n        }\n      }\n    }\n  }\n'], ['\n  query MenuWhereQuery(\n    $menuId: Int\n    $location: MenuLocation\n    $slug: String\n  ){\n    menus(where: { id: $menuId, location: $location, slug: $slug }) {\n      nodes{\n        id\n        slug\n        menuItems{\n          nodes {\n            id\n            menuItemId\n            url\n            label\n            cssClasses\n            description\n          }\n        }\n      }\n    }\n  }\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  query MenuItemQuery($id: ID!) {\n    menuItem(id: $id) {\n      childItems{\n        nodes{\n          id\n          menuItemId\n          url\n          label\n          cssClasses\n          description\n        }\n      }\n    }\n  }\n'], ['\n  query MenuItemQuery($id: ID!) {\n    menuItem(id: $id) {\n      childItems{\n        nodes{\n          id\n          menuItemId\n          url\n          label\n          cssClasses\n          description\n        }\n      }\n    }\n  }\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/**
 * Menu Queries
 */
import { gql } from 'apollo-boost';

export var MENU_QUERY = gql(_templateObject);

export var MENU_WHERE_QUERY = gql(_templateObject2);

export var MENU_ITEM_QUERY = gql(_templateObject3);