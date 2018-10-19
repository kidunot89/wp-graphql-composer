import React from 'react';
import { header } from 'header';
import { AppContext } from '../app-context';

class view extends React.Component {
  constructor(props) {
    super(props);
    this.toggleNav = this.toggleNav.bind(this);
    this.state = { collapsed: false };
  }

  toggleNav() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    const { Attachment, logo, children, className } = this.props;

    return (
      <AppContext.Consumer>
        {({ smallerThan }) => {
          const collapsedNav = 
            (this.state.collapsed && smallerThan('LARGE')) ?
            'collapse is-collapsed' :
            'collapse';

          return (
            <header className={`demo-header ${className}`}>
              <div className="branding">
                <Attachment
                  mediaItemId={logo}
                  className="custom-logo"
                  alt="WP-GraphQL Composer"
                  fallback
                  style={{ maxWidth: '256px', padding: '2em 0 2em 0' }}
                />
                <h1 className="title">WP-GraphQL Composer</h1>
                <h1 className="description"><small>The WordPress Component Composer...</small></h1>
              </div>
              <div className={`nav-toggler ${collapsedNav}`}>
                <button onClick={this.toggleNav}>
                  <span className="open icon-block-menu"></span>
                  <span className="close icon-button-close"></span>
                </button>
              </div>
              <div className={`demo-header-div ${collapsedNav}`}>
                {children}
              </div>
            </header>
          );
        }}
      </AppContext.Consumer>
    )
    
  }
}

export default header.compose({ view });