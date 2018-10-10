import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live';

import { Menu, menu, menuItem, subMenu, Link as MenuLink } from 'menu';

const scope = {
  _, Menu, menu, menuItem,
  subMenu, Link: MenuLink,
};

const code = `
  const subMenuView = ({ MenuItem, SubMenu, items, ...rest }) => (
    <ol data-testid="custom-submenu" {...rest}>
      {_.map(items, ({ id, menuItemId, cssClasses, ...r}) => (
        <li key={id}>
          <MenuItem
            className={\`menuItem \${cssClasses.join(' ')}\`}
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
    <div id={\`menu-\${slug}\`} className={className} {...rest}>
      {_.map(items, ({ id, menuItemId, cssClasses, ...r}) => (
        <div key={id} className="menu-item">
          <MenuItem
            className={\`menuItem \${cssClasses.join(' ')}\`}
            id={id}
            {...{ ...r, MenuItem, SubMenu }}
          />
        </div>
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

  const App = () => (
    <div className="app">
      <strong>Default Menu</strong>
      <Menu location="SOCIAL" />

      <strong>Custom Menu</strong>
      <CustomMenu location="SOCIAL" />
    </div>
  );

  render(
    <WPProvider>
      <App />
    </WPProvider>
  );
`;

const modComponents = ({ provider: WPProvider, ...rest }) => {
  return (
    <section {...rest}>
      <h3>Modifying Pre-Composed Components</h3>
      <ul>
        <li>To create a new template for say the <code>Menu</code> component, import <code>menu</code>, 
        <code>menuItem</code>, and <code>subItem</code> view components from <code>wp-graphql-composer</code>.
          <pre><code>{`import { menu, menuItem, subItem } from 'wp-graphql-composer';`}</code></pre>
        </li>
        <li>Next create new components to be the new view layers for the menu, menu item, and sub menu components. 
          You don't have to change all three for but I am just to show how its done. I'm also using the <code>map</code>
          and <code>isEmpty</code> functions from the <code>lodash</code> package to help map the items.
          <pre>
            <code>
              {`
  const subMenuView = ({ MenuItem, SubMenu, items, ...rest }) => (
    <ol data-testid="custom-submenu" {...rest}>
      {_.map(items, ({ id, menuItemId, cssClasses, ...r}) => (
        <li key={id}>
          <MenuItem
            className={\`menuItem \${cssClasses.join(' ')}\`}
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
    <div id={\`menu-\${slug}\`} className={className} {...rest}>
      {_.map(items, ({ id, menuItemId, cssClasses, ...r}) => (
        <div key={id} className="menu-item">
          <MenuItem
            className={\`menuItem \${cssClasses.join(' ')}\`}
            id={id}
            {...{ ...r, MenuItem, SubMenu }}
          />
        </div>
      ))}
    </div>
  );
              `}
            </code>
          </pre>
        </li>
        <li>Last lastly use the <code>compose</code> function on each of the imported components to
          compose a new <code>CustomMenu</code> Component.
          <LiveProvider scope={{ ...scope, WPProvider }} code={code} noInline={true}>
            <LiveEditor />
            <LiveError />
            <LivePreview />
          </LiveProvider>
        </li>
      </ul>
      <p>You can learn more about the <Link to="/lib#menu">Menu</Link> component and the rest of the 
      library in the <Link to="/lib">Components</Link> and <Link to="/docs">Documentation</Link> sections. </p>
    </section>
  )
}

export default modComponents;