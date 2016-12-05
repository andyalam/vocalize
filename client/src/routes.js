import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import PostListing from './components/post_listing';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={PostListing}/>
  </Route>
);
