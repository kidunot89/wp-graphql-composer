import React from 'react';
import { get, omit } from 'lodash';
import { setDisplayName, wrapDisplayName } from 'recompose';
import { MenuContext, menuInitialState } from './context';

export const menuStateManager = (BaseComponent) => {
  const BaseFactory = React.createFactory(BaseComponent);

  class MenuStateManager extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = menuInitialState;
    }

    render() {
      const { menu, homeUrl, ...rest } = this.props;

      const newProps = {
        items: get(menu, 'menuItems.nodes'),
        ...omit(menu, 'id', 'menuItems'),
        ...omit(rest, 'id'),
      };

      return (
        <MenuContext.Provider value={{ homeUrl }}>
          <BaseFactory {...newProps} />
        </MenuContext.Provider>
      );
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'menuStateManager'))(MenuStateManager)
  }

  return MenuStateManager;

}