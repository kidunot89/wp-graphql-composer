/**
 * Menu Queries
 */
import { gql } from 'apollo-boost';

export const MENU_QUERY = gql`
  query MenuQuery($id: ID!){
    menu(id: $id) {
      id
      slug
      menuItems{
				nodes {
          id
          menuItemId
          url
          label
          cssClasses
          description
        }
      }
    }
    generalSettings {
      url
    }
  }
`;

export const MENU_WHERE_QUERY = gql`
  query MenuWhereQuery(
    $menuId: Int
    $location: MenuLocationEnum
    $slug: String
  ){
    menus(where: { id: $menuId, location: $location, slug: $slug }) {
      nodes{
        id
        slug
        menuItems{
          nodes {
            id
            menuItemId
            url
            label
            cssClasses
            description
          }
        }
      }
    }
    generalSettings {
      url
    }
  }
`;

export const MENU_ITEM_QUERY = gql`
  query MenuItemQuery($id: ID!) {
    menuItem(id: $id) {
      childItems{
        nodes{
          id
          menuItemId
          url
          label
          cssClasses
          description
        }
      }
    }
  }
`;