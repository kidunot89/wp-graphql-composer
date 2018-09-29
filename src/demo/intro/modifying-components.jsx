import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live';

import { Menu, menu, menuItem, subMenu } from 'lib';

const code = `
  const customSubMenu = ({ Item, items, ...rest }) => (
    <ol {...rest}>
      {_.map(items, ({ id, ...rest }) => (<li key={id}><Item id={id} {...rest} /></li>))}
    </ol>
  );

  const customMenuItem = ({ url, label, items, SubMenu, ...rest }) => (
    <React.Fragment>
      <a href={url} {...rest} style={{ padding: "1.4em 2em", color: "#595959" }}>{label}</a>
      {!_.isEmpty(items) && (<SubMenu className="sub-menu" items={items} />)}
    </React.Fragment>
  );

  const customMenu = ({ slug, items, MenuItem, ...rest }) => (
    <div className="custom-menu" {...rest}>
      {_.map(items, ({ id, ...r}) => (<MenuItem key={id} id={id} {...r} />))}
    </div>
  );

  const CustomSubMenu = subMenu.compose(customMenu);
  const CustomMenuItem = menuItem.compose(customMenuItem, CustomMenu);
  const CustomMenu = menu.compose(customMenu, CustomMenuItem);

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
      <ol>
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
  const customSubMenu = ({ Item, items, ...rest }) => (
    <ol {...rest}>
      {_.map(items, ({ id, ...rest }) => (<li key={id}><Item id={id} {...rest} /></li>))}
    </ol>
  ),
  ({ url, label, ...rest }) => (
    <a href={url} {...rest}>{label}</a>
  );

  const customMenuItem = ({ url, label, items, SubMenu, ...rest }) => (
    <React.Fragment>
      <a href={url} {...rest}>{label}</a>
      {!_.isEmpty(items) && (<SubMenu className="sub-menu" items={items} />)}
    </React.Fragment>
  );

  const customMenu = ({ slug, className, 'data-testid': dataTestId, items, MenuItem }) => (
    <div id={\`menu-\${slug}\`} className={className} data-testid={dataTestId}>
      {_.map(items, ({ id, ...r}) => (<MenuItem key={id} id={id} {...r} />))}
    </div>
  );
              `}
            </code>
          </pre>
        </li>
        <li>Last lastly use the <code>compose</code> function on each of the imported components to
          compose a new <code>CustomMenu</code> Component.
          <LiveProvider scope={{ _, Menu, menu, menuItem, subMenu, WPProvider }} code={code} noInline={true}>
            <LiveEditor />
            <LiveError />
            <LivePreview />
          </LiveProvider>
        </li>
      </ol>
      <p>You can learn more about the <Link to="/components#menu">Menu</Link> component and the rest of the 
      library in the <Link to="/components">Components</Link> and <Link to="/docs">Documentation</Link> sections. </p>
    </section>
  )
}

export default modComponents;