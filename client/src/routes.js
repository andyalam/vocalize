import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import PostListing from './components/post_listing';
import UploadPage from './components/upload_page';
import TestComponent from './components/test_component';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={PostListing}/>
    <Route path="/upload" component={UploadPage} />
    <Route path='/testarea' component={TestComponent} />
  </Route>
);
