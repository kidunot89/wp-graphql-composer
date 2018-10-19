import React from 'react';
import { Menu } from 'menu';

import { AppContext } from '../app-context';
import Aside from './aside';
import Header from './header';
import Main from './main'

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.toggleHeader = this.toggleHeader.bind(this);
    this.state = { toggleHeader: false };
  }

  toggleHeader() {
    this.setState({ isCollapsed3: !this.state.isCollapsed3})
  }

  render() {

    return (
      <AppContext.Consumer>
        {({ biggerThan, smallerThan }) => {
          const collapsedHeader =
            (this.state.isCollapsed3 && biggerThan('LARGE')) ?
            'collapse is-collapsed' :
            'collapse';

          return (
            <div className="demo-body">
              
              <Header className={collapsedHeader}>
                <Menu location="PRIMARY" className="demo-navigation" />
              </Header>
              <Main
                className={collapsedHeader}
                topChildren={(
                  <React.Fragment>
                    <div className={`header-toggler ${collapsedHeader}`}>
                      <button onClick={this.toggleHeader}>
                        <span className="open icon-arrow-up-big"></span>
                        <span className="close icon-button-close"></span>
                      </button>
                    </div>
                    <Aside />
                  </React.Fragment>
                )}
              >
                {/* <footer className="demo-footer"></footer> */}
              </Main>
            </div>
          );
        }}
      </AppContext.Consumer>
    );
  }
}

export default Demo;
