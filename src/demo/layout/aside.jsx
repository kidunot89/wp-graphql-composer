import React from 'react';

import PageNav from './page-nav';
import Collapse from './components/collapse';

const aside = () => (
  <aside className="demo-aside">
    <Collapse
      className="demo-aside-div"
      toggleClassName="page-nav-icon-toggler"
      button={(<span className="icon-arrow-down"/>)}
      toggleAfter
      smallerThan="MEDIUM"
    >
      <PageNav />
    </Collapse>
  </aside>
);

export default aside;
