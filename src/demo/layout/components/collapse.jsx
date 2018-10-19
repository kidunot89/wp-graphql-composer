import React from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../../app-context';

export class collapse extends React.Component {
  constructor(props) {
    super(props);
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.state = { collapsed: true };
  }

  toggleCollapse() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    const {
      as: Container,
      children,
      className,
      toggleClassName,
      toggleAfter,
      button,
      onClick,
      smallerThan,
      biggerThan
    } = this.props;

    return (
      <AppContext.Consumer>
        {({ smallerThan: sT, biggerThan: bT }) => {
          const collapsible = sT(smallerThan) && bT(biggerThan);

          const collapseClassName =
          (this.state.collapsed && collapsible) ?
          'collapse is-collapsed' :
          'collapse';

          return (
            <React.Fragment>
              {(!toggleAfter && collapsible) && (
                <div className={`${toggleClassName} ${collapseClassName}`}>
                  <button onClick={() => {
                    this.toggleCollapse();
                    onClick();
                  }}>
                    {button}
                  </button>
                </div>
              )}
              <Container className={`${className} collapser ${collapseClassName}`}>
                {children}
              </Container>
              {(toggleAfter && collapsible) && (
                <div className={`${toggleClassName} ${collapseClassName}`}>
                  <button onClick={() => {
                    this.toggleCollapse();
                    onClick();
                  }}>
                    {button}
                  </button>
                </div>
              )}
            </React.Fragment>
          );
        }}
      </AppContext.Consumer>
    );
    
  }
}

collapse.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  className: PropTypes.string,
  toggleClassName: PropTypes.string,
  toggleAfter: PropTypes.bool,
  button: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  onClick: PropTypes.func,
  smallerThan: PropTypes.string,
  biggerThan: PropTypes.string,
};

collapse.defaultProps = {
  as: 'div',
  className: "",
  toggleClassName: "",
  toggleAfter: false,
  button: "",
  onClick: () => null,
  smallerThan: 'X-LARGE',
  biggerThan: 'X-SMALL',
};

export default collapse
