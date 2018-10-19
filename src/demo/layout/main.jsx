import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { main, routesProcessor } from 'main';
import Docs from '../docs';
import Examples from '../examples'
import Library from '../lib';
import Intro from '../intro';

const routes = () => (
  <Switch>
    <Route exact path="/composer/" component={Intro} />
    <Route path="/composer/lib(.*)" component={Library} />
    <Route path="/composer/examples(.*)" component={Examples} />
    <Route path="/composer/docs(.*)" component={Docs} />
  </Switch>
);

const view = ({ className, Routes, topChildren, children }) => (
  <main className={`demo-main ${className}`}>
    {topChildren}
    {Routes}
    {children}
  </main>
);

export default main.compose({ view, extraHocs: [routesProcessor(routes)] });
