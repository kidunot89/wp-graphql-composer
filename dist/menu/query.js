import _taggedTemplateLiteral from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral";

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  query MenuItemQuery($id: ID!) {\n    menuItem(id: $id) {\n      childItems{\n        nodes{\n          id\n          menuItemId\n          url\n          label\n          cssClasses\n          description\n        }\n      }\n    }\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  query MenuWhereQuery(\n    $menuId: Int\n    $location: MenuLocationEnum\n    $slug: String\n  ){\n    menus(where: { id: $menuId, location: $location, slug: $slug }) {\n      nodes{\n        id\n        slug\n        menuItems{\n          nodes {\n            id\n            menuItemId\n            url\n            label\n            cssClasses\n            description\n          }\n        }\n      }\n    }\n    generalSettings {\n      url\n    }\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  query MenuQuery($id: ID!){\n    menu(id: $id) {\n      id\n      slug\n      menuItems{\n\t\t\t\tnodes {\n          id\n          menuItemId\n          url\n          label\n          cssClasses\n          description\n        }\n      }\n    }\n    generalSettings {\n      url\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

/**
 * Menu Queries
 */
import { gql } from 'apollo-boost';
export var MENU_QUERY = gql(_templateObject());
export var MENU_WHERE_QUERY = gql(_templateObject2());
export var MENU_ITEM_QUERY = gql(_templateObject3());