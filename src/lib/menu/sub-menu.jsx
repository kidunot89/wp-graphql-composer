import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';

class subMenu extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { isCollapsed: true };
  }

  toggle() {
    this.setState({ isCollapsed: !this.state.isCollapsed })
  }

  render() {
    const { isCollapsed } = this.state;
    const collapse = (isCollapsed) ? '' : ' toggle-on';
    const { MenuItem, SubMenu, items, ...rest } = this.props;

    return (
      <React.Fragment>
        <button
          className={`dropdown-toggle${collapse}`}
          aria-expanded={isCollapsed}
          onClick={this.toggle}
        >
          <span className="icon-arrow-up" />
        </button>
        <ul className={`sub-menu${collapse}`} {...rest}>
          {map(items, ({ id, menuItemId, ...r }) => (
            <li
              id={`menu-item-${menuItemId}`}
              className={`menu-item menu-item-${menuItemId} ${r.cssClasses.join(' ')}`}
              key={id}
            >
              <MenuItem id={id} {...{ ...r, MenuItem, SubMenu }} />
            </li>
          ))}
        </ul>
      </React.Fragment>
    )
  }
}

subMenu.propTypes = {
  SubMenu: PropTypes.func.isRequired,
  MenuItem: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})),
};

subMenu.defaultProps = {
  items: [],
};

export default subMenu;